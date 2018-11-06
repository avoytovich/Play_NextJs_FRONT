import React from 'react';
import NoSSR from 'react-no-ssr';

import Layout from '../components/MyLayout';
import Location from '../components/location/location';

import withModal from '../services/decorators/withModal/index';

import './style.scss';

@withModal(null, { withClose: true })
export default class App extends React.Component {
  render() {
    return (
      <div>
        <NoSSR>
          <div className="landing-wrapper">
            <Layout>
              <h1 onClick={this.props.open}>Test</h1>
              <Location />
            </Layout>
          </div>
        </NoSSR>
      </div>
    );
  }
}
