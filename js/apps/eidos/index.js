import React from 'react';
import { useIntl } from 'js/locals';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import styled from 'styled-components';
import { Tabs, message } from 'antd';
import EosNodes from 'js/components/eosNodes';
import StakeEidos from '../stakeEidos';
import Larimer from '../mineLarimer';
import TradeLarimer from '../larimerTrade';

const { TabPane } = Tabs;

export default function Eidos() {
  const intl = useIntl();
  return (
    <StyledEidos>
      <div className="evo">
        <a
          onClick={() => {
            window.open('https://stakemyeidos.top/evo');
          }}
        >
          AP新币 EVO空投
        </a>
        <a
          onClick={() => {
            window.open('https://enumivo.org/blog/2021/5/25/evo-chain');
          }}
        >
          (详情)
        </a>
      </div>
      {/* <EosNodes /> */}
      <Tabs defaultActiveKey="tradeLarimer">
        <TabPane tab={intl['eidos.Stake Eidos']} key="stake">
          <StakeEidos />
        </TabPane>
        <TabPane tab={intl['eidos.Mine Larimer']} key="larimer">
          <Larimer />
        </TabPane>
        <TabPane tab={intl['eidos.Trade Larimer']} key="tradeLarimer">
          <TradeLarimer />
        </TabPane>
      </Tabs>
      <div className="donate">
        {intl['common.Donate']}
        <div className="donate-item">
          eos:
          <CopyToClipboard
            text="guangliang22"
            onCopy={() => message.success(intl['common.已复制'])}
          >
            <div className="address">guangliang22</div>
          </CopyToClipboard>
        </div>
        <div className="donate-item">
          eth:
          <CopyToClipboard
            text="0xE8F9dF0EB05B8973f1317d330c61a305511Fb2bD"
            onCopy={() => message.success(intl['common.已复制'])}
          >
            <div className="address">
              {'0xE8F9dF0EB05B8973f1317d330c61a305511Fb2bD'
                .split('')
                .map((t, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <span key={`${t}_${i}`}>{t}</span>
                ))}
            </div>
          </CopyToClipboard>
        </div>
      </div>
    </StyledEidos>
  );
}

export const StyledEidos = styled.div`
  .tips {
    margin 10px 0;
    font-size: 14px;
    color: #ff4d4f;
    padding: 0 16px;
  }
  .evo {
    margin: 10px;
    font-size: 20px;
    a {
      margin-right: 10px;
    }
  }
  width: 100%;
  margin: 0 auto;
  padding: 20px 0 30px;
  max-width: 500px;
  background: #fff;
  .ant-tabs-nav-wrap {
    padding: 0 16px;
  }
  .ant-tabs-tab {
    font-size: 18px;
  }
  .donate {
    padding: 0 16px 30px;
    .donate-item {
      margin-top: 10px;
      display: flex;
      align-items: center;
      .address {
        display: flex;
        flex-wrap: wrap;
        margin-left: 10px;
        padding: 0 16px;
        justify-content: flex-start;
        color: #499fff;
        cursor: pointer;
      }
    }
  }
`;
