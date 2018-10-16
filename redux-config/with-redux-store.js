import React from 'react';
import { get, cloneDeep } from 'lodash';
import { initializeStore } from './store';

const isServer = typeof window === 'undefined';
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__';

let GLOBAL_LANG = null;

function getOrCreateStore(initialState, lang) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    const state = cloneDeep(initialState);
    if (lang) GLOBAL_LANG = lang;
    if (GLOBAL_LANG && initialState) {
      console.log(GLOBAL_LANG);
      state.localization.lang = GLOBAL_LANG;
    }
    return initializeStore(state);
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initializeStore(initialState);
  }
  return window[__NEXT_REDUX_STORE__];
}

export default App => {
  return class AppWithRedux extends React.Component {
    static async getInitialProps(appContext) {
      const cookie = get(appContext, 'ctx.req.headers.cookie');
      const findValue = 'lang=';
      let index;
      if (cookie) index = cookie.indexOf(findValue);
      let lang;
      if (index > -1) lang = cookie.substr(index + findValue.length, 2);
      // Get or Create the store with `undefined` as initialState
      // This allows you to set a custom default initialState
      const reduxStore = getOrCreateStore(undefined, lang);

      // Provide the store to getInitialProps of pages
      appContext.ctx.reduxStore = reduxStore;

      let appProps = {};
      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps.call(App, appContext);
      }

      return {
        ...appProps,
        initialReduxState: reduxStore.getState(),
      };
    }

    constructor(props) {
      super(props);
      this.reduxStore = getOrCreateStore(props.initialReduxState);
    }

    render() {
      return <App {...this.props} reduxStore={this.reduxStore} />;
    }
  };
};
