import '@babel/polyfill';
import React from 'react';
import { render } from 'react-dom';
import runtime from 'offline-plugin/runtime';
import Intl from './locals';
import Root from './root';
import EosProvider from './providers/useEos';
import '../style/main.less';

render(
  <Intl>
    <EosProvider>
      <Root />
    </EosProvider>
  </Intl>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}

if (process.env.NODE_ENV === 'production') {
  runtime.install({
    // eslint-disable-line global-require
    onUpdating: () => {
      console.log('SW Event:', 'onUpdating');
    },
    onUpdateReady: () => {
      console.log('SW Event:', 'onUpdateReady');
      // Tells to new SW to take control immediately
      runtime.applyUpdate();
    },
    onUpdated: () => {
      console.log('SW Event:', 'onUpdated');
      // Reload the webpage to load into the new version
      // window.location.reload();
    },

    onUpdateFailed: () => {
      console.log('SW Event:', 'onUpdateFailed');
    },
  });
}
