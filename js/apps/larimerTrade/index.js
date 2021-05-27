import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'js/locals';
import digit from 'js/utils/digit';
import Input from 'js/components/InputNumber';
import { Button, message, Select } from 'antd';
import { getBalance, getCurrencyStats } from 'js/utils/eosService';
import { larimer, usdt, usdpool } from 'js/constants';

import { useEos } from 'js/providers/useEos';
import {
  larimer_usdt,
  usdpool_usdt,
  usdpool_larimer,
  usdt_larimer,
  larimer_usdpool,
  usdt_usdpool,
} from './calc';

import { StyledIndex } from './style';
const Option = Select.Option;

const TRADE_ACCOUNT = 'tradelarimer';

export default function Transfer() {
  const intl = useIntl();
  const tokens = [larimer, usdt, usdpool];

  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [from, setFrom] = useState(tokens[0]);
  const [to, setTo] = useState(tokens[1]);
  const [num, setNum] = useState('100');
  const [pool, setPool] = useState({});
  const [balances, setBalances] = useState({});
  // const [eidosBalance, setEidosBalance] = useState('');
  // const [diyBalance, setDiyBalance] = useState('');
  // const [diySupply, setDiySupply] = useState('');
  const { account, sendTransaction } = useEos();

  const getData = () => {
    Promise.all([
      getBalance({
        code: larimer?.code,
        account: TRADE_ACCOUNT,
        symbol: larimer?.symbol,
      }),
      getBalance({
        code: usdt?.code,
        account: TRADE_ACCOUNT,
        symbol: usdt?.symbol,
      }),
      getCurrencyStats({
        code: usdpool?.code,
        symbol: usdpool?.symbol,
      }),
    ]).then(([b1, b2, b3]) => {
      setPool({
        [larimer?.symbol]: parseFloat(_.get(b1, '[0]') || 0),
        [usdt?.symbol]: parseFloat(_.get(b2, '[0]') || 0),
        [usdpool?.symbol]: parseFloat(_.get(b3, 'USDPOOL.supply') || 0),
      });
    });
    if (account?.name) {
      Promise.all([
        getBalance({
          code: larimer?.code,
          account: account?.name,
          symbol: larimer?.symbol,
        }),
        getBalance({
          code: usdt?.code,
          account: account?.name,
          symbol: usdt?.symbol,
        }),
        getBalance({
          code: usdpool?.code,
          account: account?.name,
          symbol: usdpool?.symbol,
        }),
      ]).then(([b1, b2, b3]) => {
        setBalances({
          [larimer?.symbol]: parseFloat(_.get(b1, '[0]') || 0),
          [usdt?.symbol]: parseFloat(_.get(b2, '[0]') || 0),
          [usdpool?.symbol]: parseFloat(_.get(b3, '[0]') || 0),
        });
      });
    }
  };
  // useEffect(() => {
  //   setTitle(intl['eidos.Stake Eidos']);
  // }, []);

  useEffect(() => {
    getData();
    const timer = setTimeout(() => {
      setIndex(index + 1);
    }, 10000);
    return () => {
      clearTimeout(timer);
    };
  }, [index, account?.name]);

  const submit = () => {
    if (!num) return;
    setLoading(true);
    sendTransaction({
      chain: from.chain,
      code: from.code,
      symbol: from.symbol,
      decimals: from.decimals,
      address: TRADE_ACCOUNT,
      quantity: num,
      memo: to?.symbol,
    })
      .then(() => {
        setLoading(false);
        message.success(intl['common.Send Success']);
        setTimeout(() => {
          getData();
        }, 3000);
      })
      .catch((err) => {
        setLoading(false);
        const msg = err.message || `${err}`;
        message.error(msg);
      });
  };

  const prices = {
    [`${larimer?.symbol}_${usdt?.symbol}`]: larimer_usdt,

    [`${usdt?.symbol}_${larimer?.symbol}`]: usdt_larimer,

    [`${usdpool?.symbol}_${usdt?.symbol}`]: usdpool_usdt,

    [`${usdt?.symbol}_${usdpool?.symbol}`]: usdt_usdpool,

    [`${usdpool?.symbol}_${larimer?.symbol}`]: usdpool_larimer,

    [`${larimer?.symbol}_${usdpool?.symbol}`]: larimer_usdpool,
  };

  const resultFn = prices[`${from?.symbol}_${to?.symbol}`];
  let result;
  if (resultFn) {
    result = digit.format(
      resultFn({
        larimer: pool[larimer?.symbol],
        usdt: pool[usdt?.symbol],
        usdpool: pool[usdpool?.symbol],
        received: num,
      }),
      '0.0000'
    );
  }

  // const lamberToUsd = pool[usdt?.symbol] / pool[larimer?.symbol];
  // const usdpoolToUsd = pool[usdpool?.symbol] / pool[usdt?.symbol];
  // const usdpoolToUsd = pool[usdpool?.symbol] / pool[usdt?.symbol];

  return (
    <StyledIndex>
      <div className="balances">
        <div className="title">{intl['eidos.AMM Balance']}</div>
        <div className="balances-item">
          Larimer: {digit.format(pool[larimer?.symbol], '0,0.0000') || '--'}
        </div>
        <div className="balances-item">
          USDPOOL: {digit.format(pool[usdpool?.symbol], '0,0.0000') || '--'}
        </div>
        <div className="balances-item">
          USDT: {digit.format(pool[usdt?.symbol], '0,0.0000') || '--'}
        </div>
      </div>
      <div className="balances">
        <div className="title">{intl['eidos.Account Balance']}</div>
        <div className="balances-item">
          Larimer: {digit.format(balances[larimer?.symbol], '0,0.0000') || '--'}
        </div>
        <div className="balances-item">
          USDPOOL: {digit.format(balances[usdpool?.symbol], '0,0.0000') || '--'}
        </div>
        <div className="balances-item">
          USDT: {digit.format(balances[usdt?.symbol], '0,0.0000') || '--'}
        </div>
      </div>

      {/* <div className="title">{intl['eidos.Account Balance']}</div>
      <div className="balances">
        <div>DIY: {digit.format(diyBalance, '0,0.0000') || '--'}</div>
        <div>EIDOS: {digit.format(eidosBalance, '0,0.0000') || '--'}</div>
      </div> */}
      <div className="title">{intl['eidos.From']}</div>
      <Select
        value={from?.symbol}
        onChange={(val) => {
          setFrom(_.find(tokens, { symbol: val }));
        }}
      >
        {tokens.map((token) => {
          return <Option value={token.symbol}>{token.symbol}</Option>;
        })}
      </Select>
      <div className="title">{intl['eidos.To']}</div>
      <Select
        value={to?.symbol}
        onChange={(val) => {
          setTo(_.find(tokens, { symbol: val }));
        }}
      >
        {tokens.map((token) => {
          return <Option value={token.symbol}>{token.symbol}</Option>;
        })}
      </Select>
      <div className="title">{intl['common.转账数量']}</div>
      <Input value={num} onChange={(e) => setNum(e.target.value)} />
      <Button
        type="primary"
        disabled={from?.symbol === to?.symbol}
        onClick={submit}
        loading={loading}
      >
        {intl['eidos.Get DIY XXX']
          .replace('DIY', to?.symbol)
          .replace('XXX', result)}
      </Button>
    </StyledIndex>
  );
}
