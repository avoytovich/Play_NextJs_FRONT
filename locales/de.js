import objKeys2Strings from '../services/objKeys2Strings';

export default {
  messages: objKeys2Strings({
    objectTest: {
      testString: 'German text',
    },
    menu: {
      SignUp: 'DEUTCHE Sign Up',
      LogIn: 'DEUTCHE Log in',
      Profile: 'DEUTCHE Profile',
    },
  }),
  // formats: object,
  // messages: object,
  // textComponent: any,
  locale: 'de',
};
