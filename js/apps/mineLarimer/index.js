import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'js/locals';
import digit, { isNumber } from 'js/utils/digit';
import Input from 'js/components/InputNumber';
import { Button, Checkbox, message, Select } from 'antd';
import { getBalance } from 'js/utils/eosService';
import { diy, larimer } from 'js/constants';
import { useEos } from 'js/providers/useEos';
import { StyledIndex } from './style';

const Option = Select.Option;

export default function Transfer() {
  const intl = useIntl();
  const [index, setIndex] = useState(0);
  const [minIndex, setMinIndex] = useState(0);
  const [num, setNum] = useState('10000');
  const [larimerPoolBalance, setLarimerPoolBalance] = useState('');
  const [diyBalance, setDiyBalance] = useState('');
  const [loopMine, setLoopMine] = useState(false);
  const [isMining, setIsMining] = useState(false);
  const [period, setPeriod] = useState('5');
  const [larimerBalance, setLarimerBalance] = useState('');
  const { account, sendTransaction } = useEos();

  // useEffect(() => {
  //   setTitle(intl['eidos.Mine Larimer']);
  // }, []);

  const getData = () => {
    if (account?.name) {
      getBalance({
        code: diy?.code,
        account: account?.name,
        symbol: diy?.symbol,
      }).then((resp) => {
        const totalKey = parseFloat(_.get(resp, '[0]') || 0);
        setDiyBalance(totalKey);
      });

      getBalance({
        code: larimer?.code,
        account: account?.name,
        symbol: larimer?.symbol,
      }).then((resp) => {
        const totalKey = parseFloat(_.get(resp, '[0]') || 0);
        setLarimerBalance(totalKey);
      });
    }
    getBalance({
      code: larimer?.code,
      account: 'minelarimers',
      symbol: larimer?.symbol,
    }).then((resp) => {
      const totalKey = parseFloat(_.get(resp, '[0]') || 0);
      setLarimerPoolBalance(totalKey);
    });
  };

  useEffect(() => {
    getData();
    const timer = setTimeout(() => {
      setIndex(index + 1);
    }, 10000);
    return () => {
      clearTimeout(timer);
    };
  }, [index, account?.name]);

  const mine = () => {
    if (!num) return;
    setIsMining(true);
    sendTransaction({
      chain: diy.chain,
      code: diy.code,
      symbol: diy.symbol,
      decimals: diy.decimals,
      address: 'minelarimers',
      quantity: num,
      memo: 'mined in stakemyeidos.top',
    })
      .then(() => {
        message.success(intl['common.Send Success']);
        setIsMining(false);
        setTimeout(() => {
          getData();
        }, 3000);
      })
      .catch((err) => {
        const msg = err.message || `${err}`;
        message.error(msg);
        setIsMining(false);
      });
  };

  useEffect(() => {
    if (!loopMine || !minIndex) return () => {};
    if (loopMine && isNumber(period) && minIndex > 0 && !isMining) {
      mine();
    }
    const timer = setTimeout(() => {
      setMinIndex(minIndex + 1);
    }, (period || 1) * 60 * 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [minIndex]);

  return (
    <StyledIndex>
      <div className="title">{intl['eidos.Larimer Pool']}</div>
      <div className="balances">
        <div>{digit.format(larimerPoolBalance, '0,0.0000') || '--'}</div>
      </div>
      <div className="title">{intl['eidos.Account Balance']}</div>
      <div className="balances">
        <div>DIY: {digit.format(diyBalance, '0,0.0000') || '--'}</div>
        <div>Larimer: {digit.format(larimerBalance, '0,0.0000') || '--'}</div>
      </div>
      <div className="title">{intl['common.转账目标地址']}</div>
      <div className="address-tpl">
        <Input defaultValue="minelarimers" disabled />
      </div>
      <div className="title">{intl['common.转账数量']}</div>
      <Input value={num} onChange={(e) => setNum(e.target.value)} />
      <div className="period">
        <Checkbox
          value={loopMine}
          onChange={(e) => {
            setLoopMine(e.target.checked);
          }}
        >
          {intl['eidos.Loop Period']}({intl['eidos.Minutes']})
        </Checkbox>
        <Select
          value={period}
          onChange={(val) => {
            setPeriod(val);
          }}
        >
          {/* <Option value="0.1">0.1</Option> */}
          <Option value="1">1</Option>
          <Option value="2">2</Option>
          <Option value="3">3</Option>
          <Option value="4">4</Option>
          <Option value="5">5</Option>
          <Option value="10">10</Option>
          <Option value="20">20</Option>
          <Option value="30">30</Option>
        </Select>
        {/* <Input
          suffix={intl['eidos.Minutes']}
          value={period}
          onChange={(e) => {
            setPeriod(e.target.value);
          }}
          onBlur={(e) => {
            if (!isNumber(period)) {
              setPeriod('');
              setLoopMine(false);
            }
          }}
        /> */}
      </div>
      <Button
        type="primary"
        onClick={() => {
          if (loopMine && isNumber(period) && num) {
            setMinIndex(1);
            return;
          }
          mine();
        }}
        loading={isMining || (loopMine && minIndex > 0)}
      >
        {intl['eidos.Mine XXX Larimer'].replace(
          'XXX',
          larimerPoolBalance > 0
            ? digit.format(larimerPoolBalance * 0.01, '0.0000')
            : ''
        )}
      </Button>
    </StyledIndex>
  );
}
