import React from 'react';
import styled from 'styled-components';
import { useIntl } from 'js/locals';

import { Button } from 'antd';
import { useEos } from 'js/providers/useEos';

export default function Invest() {
  const { account, login } = useEos();

  const intl = useIntl();

  const name = account?.name;

  return (
    <StyledAccount className="gl-account">
      {name ? (
        <>
          <div className="gl-account-address">{name}</div>
        </>
      ) : (
        <Button type="ghost" size="small" onClick={login}>
          {intl['common.Login']}
        </Button>
      )}
    </StyledAccount>
  );
}

const StyledAccount = styled.div`
  display: flex;
  align-items: center;
  .chainTag {
    margin-right: 10px;
  }
  .gl-account-address {
    text-align: center;
    padding: 10px 10px;
    outline: none;
    text-decoration: none;
    -webkit-box-pack: center;
    justify-content: center;
    position: relative;
    z-index: 1;
    font-size: 16px;
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    -webkit-box-align: center;
    align-items: center;
    border-radius: 10px;
    cursor: pointer;
    user-select: none;
    border: 1px solid rgb(237, 238, 242);
    color: rgb(0, 0, 0);
    font-weight: 500;
  }
  .ant-btn-primary {
    width: 100%;
    border-radius: 10px;
  }
`;
