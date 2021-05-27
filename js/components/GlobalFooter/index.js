import React from 'react';
import styled from 'styled-components';
// import history from 'js/utils/history';
import Account from 'js/components/account';

export default function EOSNodes() {
  return (
    <StyledHeader isMobile={false}>
      <div className="container">
        <div className="logo">eidos</div>
        <Account />
      </div>
    </StyledHeader>
  );
}

const StyledHeader = styled.div`
  display: flex;
  height: 45px;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  background: #fff;
  padding: 0 16px;
  margin-bottom: 10px;
  .container {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .logo {
      font-size: 20px;
      font-weight: bold;
      cursor: pointer;
      margin-right: auto;
    }
  }
`;
