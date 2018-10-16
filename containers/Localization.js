import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';
import { addLocaleData, IntlProvider } from 'react-intl';
import moment from 'moment';

import enLocal from 'react-intl/locale-data/en';
import deLocal from 'react-intl/locale-data/de';
import 'moment/locale/de';

import en from '../locales/en';
import de from '../locales/de';
import defaults from '../locales/defaults';
import isServer from '../services/serverService';

addLocaleData([...enLocal, ...deLocal]);

const mapStateToProps = ({ localization: { lang } }) => ({ lang });

@withRouter
@connect(mapStateToProps)
export default class Localization extends React.Component {
  render() {
    let appLocale = { ...defaults };
    const lang = this.props.lang;
    switch (lang) {
      case 'de':
        appLocale = { ...appLocale, ...de };
        moment.locale('de');
        break;
      default:
        appLocale = { ...appLocale, ...en };
        moment.locale('en');
    }
    return <IntlProvider {...appLocale}>{this.props.children}</IntlProvider>;
  }
}
