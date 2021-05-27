import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import logoImg from 'img/logo.png';

export default function LoadingRoot(props) {
  const { flag } = props;
  return (
    <StyledLoadingRoot
      className={`loadingRootTpl ${flag ? '' : 'hide'}`}
      style={{
        top: 0,
        height: '100%',
      }}
    >
      <img src={logoImg} alt="progress" className="progress" />
      <div className="dots">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </StyledLoadingRoot>
  );
}
LoadingRoot.propTypes = {
  flag: PropTypes.bool,
};
const StyledLoadingRoot = styled.div`
  position: absolute;
  line-height: 1;
  z-index: 1;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: #ffffff;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  .progress {
    width: 72px;
    margin: 100px 0 0 0;
  }
  .text {
    margin: 170px 0 50px;
    font-family: PingFangSC-Semibold;
    font-size: 22px;
    color: #343951;
    -webkit-letter-spacing: 0;
    -moz-letter-spacing: 0;
    -ms-letter-spacing: 0;
    letter-spacing: 0;
    text-align: center;
  }
  .dots {
    margin: 10px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
  }
  .dots span {
    -webkit-animation: myfirst 1s linear 0s infinite alternate;
    animation: myfirst 1s linear 0s infinite alternate;
    display: block;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    margin: 0 3px;
    background: #51c3b0;
  }
  .dots span:nth-child(2) {
    -webkit-animation-delay: 0.3s;
    animation-delay: 0.3s;
  }
  .dots span:nth-child(3) {
    -webkit-animation-delay: 0.6s;
    animation-delay: 0.6s;
  }
  @-webkit-keyframes myfirst {
    0% {
      background: #0091e6;
    }
    100% {
      background: #51c3b0;
    }
  }
  @keyframes myfirst {
    0% {
      background: #0091e6;
    }
    100% {
      background: #51c3b0;
    }
  }
`;
