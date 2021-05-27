import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'js/locals';
import digit from 'js/utils/digit';
import Input from 'js/components/InputNumber';
import { Button, message, Select } from 'antd';
import { getBalance, getCurrencyStats } from 'js/utils/eosService';
import { eidos, diy } from 'js/constants';
import { useEos } from 'js/providers/useEos';
import { StyledIndex } from './style';
const Option = Select.Option;

const times = {
  '1': 1,
  '3': 4,
  '6': 10,
  '12': 25,
  '24': 60,
};

export default function Transfer() {
  const intl = useIntl();
  const [period, setPeriod] = useState('24');
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [num, setNum] = useState('100');
  const [eidosBalance, setEidosBalance] = useState('');
  const [diyBalance, setDiyBalance] = useState('');
  const [diySupply, setDiySupply] = useState('');
  const { account, sendTransaction } = useEos();

  const getData = () => {};
  if (account?.name) {
    getBalance({
      code: eidos?.code,
      account: account?.name,
      symbol: eidos?.symbol,
    }).then((resp) => {
      const totalKey = parseFloat(_.get(resp, '[0]') || 0);
      setEidosBalance(totalKey);
    });

    getBalance({
      code: diy?.code,
      account: account?.name,
      symbol: diy?.symbol,
    }).then((resp) => {
      const totalKey = parseFloat(_.get(resp, '[0]') || 0);
      setDiyBalance(totalKey);
    });
  }
  getCurrencyStats({
    code: diy?.code,
    symbol: diy?.symbol,
  }).then((resp) => {
    const totalKey = parseFloat(_.get(resp, 'DIY.supply') || 0);
    setDiySupply(totalKey);
  });

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
  }, [index]);

  const submit = () => {
    if (!num) return;
    setLoading(true);
    sendTransaction({
      chain: eidos.chain,
      code: eidos.code,
      symbol: eidos.symbol,
      decimals: eidos.decimals,
      address: 'stakemyeidos',
      quantity: num,
      memo: period,
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

  return (
    <StyledIndex>
      <div className="title">{intl['eidos.DIY Supply']}</div>
      <div className="balances">
        <div>{digit.format(diySupply, '0,0.0000') || '--'}</div>
      </div>
      <div className="title">{intl['eidos.Account Balance']}</div>
      <div className="balances">
        <div>DIY: {digit.format(diyBalance, '0,0.0000') || '--'}</div>
        <div>EIDOS: {digit.format(eidosBalance, '0,0.0000') || '--'}</div>
      </div>
      <div className="title">{intl['common.转账目标地址']}</div>
      <div className="address-tpl">
        <Input defaultValue="stakemyeidos" disabled />
      </div>
      <div className="title">{intl['common.转账数量']}</div>
      <Input value={num} onChange={(e) => setNum(e.target.value)} />
      <div className="title">{intl['eidos.stake period(months)']}</div>
      <Select
        value={period}
        onChange={(val) => {
          setPeriod(val);
        }}
      >
        <Option value="1">1</Option>
        <Option value="3">3</Option>
        <Option value="6">6</Option>
        <Option value="12">12</Option>
        <Option value="24">24</Option>
      </Select>
      <Button type="primary" onClick={submit} loading={loading}>
        {intl['eidos.Get DIY XXX'].replace(
          'XXX',
          digit.format(num * times[period], '0.####')
        )}
      </Button>
    </StyledIndex>
  );
}
