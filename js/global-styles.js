import { createGlobalStyle } from 'styled-components';

export const fontFamily =
  'font-family: "PingFang SC Regular", "Helvetica Neue", "Monospace Number", "Chinese Quote", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Hiragino Sans GB", "Microsoft YaHei",  Helvetica, Arial, sans-serif;';

/** 配色 视觉规范 * */
export const color = {
  main: '#51C3B0', // 主色/链接色
  error: '#FF6E6E',
};

/* eslint no-unused-expressions: 0 */
export default createGlobalStyle`

  * {
    box-sizing: border-box;
  }
  

  div {
    -webkit-overflow-scrolling: touch;
  }

  .required-span {
    &:before {
      content: '*';
      color: ${color.error};
    }
  }

  html {
    font-size: 100px;
    letter-spacing: 0;
  }

  html, body {
    height: 100%;
    width: 100%;
    padding: 0;
    margin: 0;
  }

  html body {
    /** 字体 视觉规范 **/
    ${fontFamily}
    font-size: 14px;
    background-color: #f2fbff;
    color: #3b415b;
    #root {
      height: 100%;
      width: 100%;
    }
  
    .clearfix {
      zoom: 1;

      &::before, &::after {
        content: "";
        display: table;
      }
    }

    .clearfix::after {
      content: '';
      display: table;
      clear: both;
    }

    .ellipsis {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }


    .ant-btn-primary {
      width: 100%;
      border-radius: 8px;
      font-size: 18px;
      height: 40px;
    }
  }
`;
