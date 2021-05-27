import styled from 'styled-components';

export const StyledIndex = styled.div`
  background: #fff;
  min-height: 100%;
  overflow: hidden;
  padding: 0 0.16rem 0.3rem;
  display: flex;
  flex-direction: column;
  .top {
    font-size: 0.24rem;
    color: #1890ff;
    line-height: 0.17rem;
    margin: 0.2rem 0;
  }
  .title {
    font-size: 0.2rem;
    font-weight: bold;
    line-height: 0.17rem;
    margin: 0.2rem 0;
  }
  .address-tpl {
    font-size: 0.2rem;
    .icon-scan {
      margin-left: 0.1rem;
    }
  }
  .ant-btn {
    margin-top: 0.2rem;
  }
  .balances {
    font-size: 16px;
  }
`;
