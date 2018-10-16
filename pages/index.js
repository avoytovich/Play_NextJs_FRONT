import React from 'react';
import NoSSR from 'react-no-ssr';

import Header from '../components/header/header';

import withModal from '../services/decorators/withModal/index';

import './style.scss';

@withModal(null, { withClose: true })
export default class App extends React.Component {
  render() {
    return (
      <div>
        <NoSSR>
          <div className="landing-wrapper">
            <Header />
            <h1 onClick={this.props.open}>Test</h1>
          </div>
        </NoSSR>
      </div>
    );
  }
}
