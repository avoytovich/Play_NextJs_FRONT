import { clone } from 'lodash';

import { CHANGE_LANGUAGE } from '../constants/actions';
import isServer from '../services/serverService';

let lang = !isServer() ? localStorage.getItem('lang') : undefined;

if (!lang) {
  // get lang from browser
  lang = !isServer()
    ? navigator.language || navigator.userLanguage || ''
    : undefined;
  if (lang && lang.toLowerCase().includes('de')) {
    lang = 'de';
  } else {
    lang = 'en';
  }
  !isServer() ? localStorage.setItem('lang', lang) : undefined;
}
const defState = { lang };

export default function localization(state = clone(defState), action) {
  if (action.type === CHANGE_LANGUAGE) {
    !isServer() ? localStorage.setItem('lang', lang) : undefined;
    return { lang: action.lang };
  }
  return state;
}
