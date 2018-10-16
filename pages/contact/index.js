import React, { Component } from 'react';
import { connect } from 'react-redux';
import Cookies from 'js-cookie';
import { withRouter } from 'next/router';
import Link from 'next/link';

import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';

import Layout from '../../components/MyLayout.js';
import TestForm from '../../forms/testForm';

import i18n from '../../services/decorators/i18n';

import './style.scss';

const mapStateToProps = ({ localization: { lang } }) => ({ lang });
@i18n()
@withRouter
@connect(mapStateToProps)
export default class About extends Component {
  handleChange = event => {
    this.props.dispatch({
      type: 'CHANGE_LANGUAGE',
      lang: event.target.value,
    });
    Cookies.set('lang', event.target.value);
    // window.location.reload();
  };

  render() {
    console.log('LANG', this.props.lang);
    return (
      <Layout>
        <p className="test-style">Contact US</p>
        <Button>{this.props.translate('testString', 'objectTest')}</Button>
        <Link href="/">
          <Button>Hello world</Button>
        </Link>
        <Select onChange={this.handleChange} value={this.props.lang}>
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="de">Dentmark</MenuItem>
        </Select>
        <TestForm />
      </Layout>
    );
  }
}
