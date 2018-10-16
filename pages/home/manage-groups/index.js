import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { Button, Grid } from '@material-ui/core';
import Layout from '../../../components/MyLayout.js'
//import './style.scss';
@withRouter
export default class About extends Component {
  render() {
    return (
        <Grid container spacing={0} justify="center">
          <Grid item xs={12} sm={12}>
            <Layout />
          </Grid>
          <Grid container spacing={0} justify="center" />
            <Grid item xs={12} sm={10} md={9} lg={8} xl={6} />
        </Grid>
    );
  }
}