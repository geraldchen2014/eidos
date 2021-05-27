import styled from 'styled-components';

export const StyledIndex = styled.div`
  background: #fff;
  min-height: 100%;
  overflow: hidden;
  padding: 0.2rem 0.16rem 0.3rem;
  .title {
    font-family: PingFangSC-Medium;
    font-size: 0.22rem;
    line-height: 0.17rem;
    margin: 0.25rem 0;
  }
  .chains {
    display: flex;
    .chain {
      position: relative;
      display: inline-block;
      height: 32px;
      margin: 0;
      padding: 0 15px;
      color: rgba(0, 0, 0, 0.85);
      font-size: 14px;
      line-height: 30px;
      background: #fff;
      border-color: #d9d9d9;
      border-style: solid;
      border-width: 1.02px 1px 1px 0;
      &.active {
        color: #fff;
        background: #1890ff;
        border-color: #1890ff;
      }
      &:first-child {
        border-left: 1px solid #d9d9d9;
        border-radius: 2px 0 0 2px;
      }
    }
  }
  .am-button {
    margin-top: 0.2rem;
  }
  .result {
    word-break: break-all;
    display: flex;
    align-items: center;
    .copy-item {
      width: 0.16rem;
      margin-left: 0.1rem;
    }
  }
`;
