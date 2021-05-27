import styled from 'styled-components';

export const StyledIndex = styled.div`
  background: #fff;
  min-height: 100%;
  overflow: hidden;
  padding: 0 0.16rem 0.3rem;
  .title {
    font-family: PingFangSC-Medium;
    font-size: 0.22rem;
    line-height: 0.17rem;
    margin: 0.2rem 0;
  }
  .tokens {
    .item {
      display: flex;
      height: 0.4rem;
      box-shadow: inset 0 0 0 0 rgba(52, 57, 81, 0.16);
      align-items: center;
      color: #343951;
      padding: 0 0.15rem;
      font-size: 0.18rem;
      position: relative;
      &.active {
        background: #51C3B0;
        border-radius: 0.08rem;
        color: #fff;
      }
      .icon-tpl {
        text-align: center;
      }
      .icon {
        margin: 0 0.15rem 0 0;
        width: 0.32rem;
        height: 0.32rem;
        border-radius: 50%;
      }
      .name {
        font-family: PingFangSC-Regular;
        letter-spacing: 0;
      }
      &:after {
        width: calc(100% - 0.16rem);
        left: 0.16rem;
      }
    }
    }
  }
  .address-tpl {
    display: flex;
    align-items: center;
    justify-content: center;
    .am-list {
      flex: 1;
    }
    .icon-scan {
      margin-left: 0.1rem;
    }
  }
  .ant-btn {
    margin-top: 30px
  }
`;
