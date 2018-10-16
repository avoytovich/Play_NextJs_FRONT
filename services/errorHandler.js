import { get, invoke, isArray, chain } from 'lodash';

const DEFAULT_ERROR_MSG = 'Something went wrong';
const KNOWN_ERROR_CODES = [1451, 1062, 'invalidOptionsCount', 'BicNumber'];
const KNOWN_ERROR_TYPES = ['missed'];

export const getErrorMsg = (e, defaultErrorMsg = DEFAULT_ERROR_MSG) =>
  get(e, 'response.data.message') ||
  get(e, 'message') ||
  (typeof e === 'string' ? e : defaultErrorMsg);

export const msgError = (e, defaultErrorMsg) =>
  console.error(getErrorMsg(e, defaultErrorMsg));

export const localizeError = ({ error, translate }) => {
  const { type } = error;
  if (type && KNOWN_ERROR_TYPES.indexOf(type) !== -1) {
    return `${translate(type, 'error')} : ${error.name}`;
  }
  const data = get(error, 'response.data') || {};
  let { errorCode = error.errorCode } = data;
  if (!errorCode) {
    errorCode = invoke(data, 'errors.map', item => get(item, 'code'));
  }
  let translatedErrors;
  if (errorCode) {
    if (!isArray(errorCode)) errorCode = [errorCode];
    translatedErrors = chain(errorCode)
      .map(eCode => {
        if (eCode === 1062) {
          let { message: str } = error;
          if (data.message) {
            str = data.message;
          }
          const reason = str.substring(
            str.indexOf("entry '") + 7,
            str.indexOf("' for key"),
          );
          if (!reason) {
            return `${translate('1062+', 'error')} : ${reason}`;
          }
        }
        if (eCode && KNOWN_ERROR_CODES.indexOf(eCode) !== -1) {
          return translate(eCode, 'error');
        }
        return null;
      })
      .filter(e => !!e)
      .join(',')
      .value();
  }
  if (translatedErrors) return translatedErrors;
  if (data.message.indexOf('Data too long') !== -1)
    return translate('tooLong', 'error');
  return translate('all', 'error');
};

export const msgLocalError = args => console.error(localizeError(args));
