import _ from 'lodash';
import Eos from 'eosjs';

export const login = ({ ScatterJS, network }) => {
  return new Promise((resolve, reject) => {
    ScatterJS.connect('EIDOS-APP', { network })
      .then((connected) => {
        if (!connected) {
          return reject(new Error('需先开通EOS'));
        }
        return ScatterJS.login().then((resp) => {
          const account = _.get(resp, 'accounts[0]', {});
          resolve(account);
        });
      })
      .catch((err) => {
        const message = err.errorMsg || err.message || err;
        reject(new Error(message || '系统错误，请联系管理员'));
      });
  });
};

let isTranasction = false;

export const transaction = (actions, { ScatterJS, network }) => {
  const curTime = Date.now();
  if (isTranasction && curTime - isTranasction < 1000) {
    return new Promise(() => {});
  }
  isTranasction = curTime;
  return new Promise((resolve, reject) => {
    const eos = ScatterJS.scatter.eos(network, Eos);
    console.log(eos);
    eos
      .transaction({
        actions,
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const arbitrary = ({ ScatterJS, publicKey, msg }) => {
  return ScatterJS.getArbitrarySignature(
    publicKey,
    msg,
    'eidosSignature',
    false
  );
};

export const getBalance = ({ code, account, symbol }) => {
  const params = {
    code,
    symbol,
    account,
  };
  return fetch(`${_config.EOS_NODE}/v1/chain/get_currency_balance`, {
    method: 'POST',
    body: JSON.stringify(params),
  }).then((response) => response.json());
};

export const getCurrencyStats = ({ code, symbol }) => {
  const params = {
    code,
    symbol,
  };
  return fetch(`${_config.EOS_NODE}/v1/chain/get_currency_stats`, {
    method: 'POST',
    body: JSON.stringify(params),
  }).then((response) => response.json());
};

export const getTableRows = ({
  code,
  scope,
  table,
  lower_bound,
  json,
  limit,
}) => {
  const params = {
    code,
    scope,
    table,
    lower_bound,
    json,
    limit,
  };
  // "scope":"trust.game", "code":"mkstaketoken", "table":"lockaccounts","json":true, "lower_bound":"KEY", "limit":1
  return fetch(`${_config.EOS_NODE}/v1/chain/get_table_rows`, {
    method: 'POST',
    body: JSON.stringify(params),
  }).then((response) => response.json());
};
