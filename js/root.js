import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import App from 'js/containers';

import enUS from 'antd/lib/locale/en_US';
import zhCN from 'antd/lib/locale/zh_CN';

import Eidos from 'js/apps/eidos';
import Transfer from 'js/apps/transfer';
import StakeEidos from 'js/apps/stakeEidos';
import MineLarimer from 'js/apps/mineLarimer';
import Sign from 'js/apps/sign';
import Inch from 'js/apps/inch';
import history from 'js/utils/history';
import GlobalStyled from './global-styles';
import { useSetLocale } from './locals';

export default function root() {
  const { locale, setLocale } = useSetLocale();
  console.log(locale);
  return (
    <ConfigProvider
      // locale={locale === 'zh-CN' ? zhCN : enUS}
      autoInsertSpaceInButton={false}
    >
      <Router history={history}>
        <App key="container" style={{ height: '100%' }}>
          <Switch>
            <Route exact path="/" component={Eidos} />
            <Route exact path="/eidos" component={Eidos} />
            <Route exact path="/stakeEidos" component={StakeEidos} />
            <Route exact path="/mineLarimers" component={MineLarimer} />
            <Route exact path="/transfer" component={Transfer} />
            <Route exact path="/1inch" component={Inch} />
            <Route exact path="/sign" component={Sign} />
          </Switch>
        </App>
      </Router>
      <GlobalStyled />
    </ConfigProvider>
  );
}
