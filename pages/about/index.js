import React, { Component } from 'react';
import { withRouter } from 'next/router';
import Button from '@material-ui/core/Button';
import './style.scss';
@withRouter
export default class About extends Component {
  render() {
    return (
      <div>
        <p className="test-style">About page</p>
        <Button>Hello world</Button>
        <Button>Hello world</Button>
      </div>
  );
  }
}
