import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { useIntl } from 'js/locals';
import { setTitle } from 'js/utils/myk';
import { Button, Input } from 'antd';
import { useEos } from 'js/providers/useEos';

import Scan from 'js/components/scan';
import { StyledIndex } from './style';
import tokens from './tokens';

export default function Transfer() {
  const intl = useIntl();
  const [token, chooseToken] = useState(_.last(tokens));
  const [address, setAddress] = useState('llichengxiu5');
  const [num, setNum] = useState('1');
  const { account, sendTransaction } = useEos();

  useEffect(() => {
    setTitle(intl['common.测试转账']);
  }, []);

  return (
    <StyledIndex>
      <div className="title">{intl['common.选择代币']}</div>
      <div className="tokens">
        {tokens.map((t) => {
          return (
            <div
              className={`item ${token.code === t.code ? 'active' : ''}`}
              key={`${t.chain}_${t.code}`}
              onClick={() => {
                chooseToken(t);
              }}
            >
              <div className="icon-tpl">
                <img src={t.icon} alt="icon" className="icon" />
              </div>
              <div className="name">
                {t.symbol}({t.chain})
              </div>
            </div>
          );
        })}
      </div>
      <div className="title">{intl['common.转账目标地址']}</div>
      <div className="address-tpl">
        <Input value={address} onChange={(e) => setAddress(e.target.value)} />
        <Scan
          onScan={({ result }) => {
            setAddress(result);
          }}
        />
      </div>
      <div className="title">{intl['common.转账数量']}</div>
      <Input value={num} onChange={(e) => setNum(e.target.value)} />
      <Button
        type="primary"
        onClick={() => {
          sendTransaction({
            chain: token.chain,
            code: token.code,
            symbol: token.symbol,
            decimals: token.decimals,
            address,
            quantity: num,
            memo: '',
            assetType: token.asset_type,
          });
        }}
      >
        {intl['common.转账']}
      </Button>
    </StyledIndex>
  );
}
