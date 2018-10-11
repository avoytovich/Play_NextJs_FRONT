import React from 'react';
import App, { Container } from 'next/app';
import { Provider } from 'react-redux';

import withReduxStore from '../redux-config/with-redux-store';

@withReduxStore
export default class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
      </Container>
  );
  }
}
