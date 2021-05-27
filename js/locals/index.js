import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { STORAGE_LANG } from 'js/constants';

import _ from 'lodash';
import common from './lang/common';
import eidos from './lang/eidos';

const Map = {
  common,
  eidos,
};

const langs = _.reduce(
  Map,
  (re, data, key) => {
    const zh_CN = _.reduce(
      data,
      (r, v, k) => {
        return {
          ...r,
          [`${key}.${k}`]: v.zh || k,
        };
      },
      {}
    );
    const en_US = _.reduce(
      data,
      (r, v, k) => {
        return {
          ...r,
          [`${key}.${k}`]: v.en || k,
        };
      },
      {}
    );
    return {
      zh_CN: {
        ...re.zh_CN,
        ...zh_CN,
      },
      en_US: {
        ...re.en_US,
        ...en_US,
      },
    };
  },
  {}
);

const Context = React.createContext();
const SetContext = React.createContext();

export const IntlContext = Context;

export default function Intl(props) {
  const { children } = props;
  const [locale, setLocale] = useState('en-US');

  useEffect(() => {
    const storeLang = window.localStorage.getItem(STORAGE_LANG);
    let initLocale = storeLang || 'en-US';
    if (location.search.includes('en-US')) {
      initLocale = 'en-US';
    } else if (location.search.includes('zh-CN')) {
      initLocale = 'zh-CN';
    } else if (!storeLang) {
      const language = (navigator.language || navigator.browserLanguage).split(
        '-'
      )[0];
      if (['zh', 'en'].includes(language)) {
        initLocale = { zh: 'zh-CN', en: 'en-US' }[language];
      }
    }
    if (!['en-US', 'zh-CN'].includes(initLocale)) {
      initLocale = 'en-US';
    }
    setLocale(initLocale);
  }, []);

  const localeMessage = chooseLocale(locale);
  // if (typeof Proxy === 'function' && location.hostname === 'localhost') {
  //   localeMessage = new Proxy(localeMessage, {
  //     get(obj, prop) {
  //       return prop in obj ? obj[prop] : prop;
  //     },
  //   });
  // }
  localeMessage.language = locale.split('-')[0];
  window.intl = localeMessage;
  window.locale = locale;
  return (
    <Context.Provider value={localeMessage}>
      <SetContext.Provider
        value={{
          locale,
          setLocale: (val) => {
            setLocale(val);
            window.localStorage.setItem(STORAGE_LANG, val);
          },
        }}
      >
        {/* <IntlProvider key={locale} locale={locale} messages={localeMessage}> */}
        {children}
        {/* </IntlProvider> */}
      </SetContext.Provider>
    </Context.Provider>
  );
}

Intl.propTypes = {
  children: PropTypes.any,
};

function chooseLocale(val) {
  const _val = val;
  switch (_val) {
    case 'en-us':
      return langs.en_US;
    case 'zh-CN':
      return langs.zh_CN;
    default:
      return langs.en_US;
  }
}

export function useSetLocale() {
  return useContext(SetContext);
}

export function useIntl() {
  return useContext(Context);
}
