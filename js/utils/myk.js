import _ from 'lodash';

export const MYK = window.MyKey || {};

export const getAccountInfo = () => {
  if (MYK.Browser && MYK.Browser.getAccountInfo) {
    return MYK.Browser.getAccountInfo(false).then((resp) => {
      console.log(`getAccountInfo: ${JSON.stringify(resp)}`);
      // {EOS: {account: 'xx', chain:'EOS'}, ETH:{account: 'xx', chain:'ETH'}}
      if (resp.errorCode === 0) {
        const chainInfoList = _.get(resp, 'data.chainInfoList');
        const data = _.keyBy(chainInfoList, 'chain');
        const props = {
          eosLogined: true,
          user: resp,
          userID: resp.data.id,
          backupStatus: resp.data.backupStatus,
          chainInfoList,
          account: { name: _.get(data, 'EOS.account', ''), authority: '' },
          eosAccount: _.get(data, 'EOS.account', ''),
          ethAccount: _.get(data, 'ETH.account', ''),
          btcAccount: _.get(data, 'BTC.account', ''),
          tronAccount: _.get(data, 'TRON.account', ''),
          polkadotAccount: _.get(data, 'POLKADOT.account', ''),
          filecoinAccount: _.get(data, 'FILECOIN.account', ''),
        };
        return props;
      }
      return Promise.reject(new Error(`getAccountInfo result err: ${resp}`));
    });
  }
  return Promise.reject(new Error('no mykey.getAccountInfo'));
};

export const getChainAccount = (chain) => {
  return getAccountInfo().then(
    (resp) => {
      let account = '';
      if (chain === 'EOS') {
        account = resp.eosAccount;
      } else if (chain === 'ETH') {
        account = resp.ethAccount;
      } else if (chain === 'BTC') {
        account = resp.btcAccount;
      } else if (chain === 'TRON') {
        account = resp.tronAccount;
      } else if (chain === 'POLKADOT') {
        account = resp.polkadotAccount;
      } else if (chain === 'FILECOIN') {
        account = resp.filecoinAccount;
      }
      return { account, resp };
    },
    () => {
      return '';
    }
  );
};

// 'CNY' 'USD'
export const getClientConfig = () => {
  return new Promise((resolve, reject) => {
    if (MYK.Browser) {
      MYK.Browser.getClientConfig().then(
        (resp) => {
          resolve({
            ...resp.data,
            currencyStr: getCurrencyStr((resp.data || {}).currency),
          });
          printLog(JSON.stringify(resp.data));
        },
        (err) => {
          reject(err.errorMsg);
        }
      );
    } else {
      resolve({
        currency: 'CNY',
        currencyStr: '¥',
      });
    }
  });
};

export const getCurrencyStr = (currency) => {
  if (currency === 'CNY') {
    return '¥';
  }
  if (currency === 'USD') {
    return '$';
  }
  if (currency === 'KRW') {
    return '₩';
  }
  if (currency === 'JPY') {
    return '¥';
  }
  return '';
};

export const sign = ({ msg, chain }) => {
  if (!_.get(MYK, 'Browser.sign')) {
    printLog(`no MYK.Browser.sign`);
    return Promise.reject(new Error(`no MYK.Browser.sign`));
  }
  return MYK.Browser.sign(msg, chain).then((resp) => {
    printLog(`scanAddress result: ${JSON.stringify(resp)}`);
    const { errorCode, data } = resp;
    if (errorCode === 0 && data.signature) {
      return data.signature;
    }
    return Promise.reject(resp);
  });
};

export const openFullScreen = (...args) => {
  if (MYK.Browser) {
    MYK.Browser.openFullScreen();
    return;
  }
  setTimeout(() => {
    openFullScreen(...args);
  }, 300);
};

export const closeFullScreen = (...args) => {
  if (MYK.Browser) {
    MYK.Browser.closeFullScreen();
    return;
  }
  setTimeout(() => {
    closeFullScreen(...args);
  }, 300);
};

export const closeWindow = (...args) => {
  if (MYK.Browser) {
    MYK.Browser.closeWindow();
    return;
  }
  setTimeout(() => {
    closeWindow(...args);
  }, 300);
};

// 版本低提示
export const checkAppVersion = () => {
  return new Promise((resolve, reject) => {
    if (!_.get(MYK, 'Browser.checkAppVersion')) {
      printLog(`no MYK.Browser.checkAppVersion`);
      return reject();
    }
    return MYK.Browser.checkAppVersion();
  });
};

// let testProgress = 0;
// tx进度
export const getTransactionProgress = ({ chain, transactionId, BlockNum }) => {
  return new Promise((resolve, reject) => {
    if (!_.get(MYK, 'Browser.getTransactionProgress')) {
      // if (location.hostname === 'localhost') {
      //   testProgress += Math.ceil(Math.random() * 10);
      //   return resolve({ percent: testProgress });
      // }
      return reject();
    }
    return MYK.Browser.getTransactionProgress({
      chain,
      transactionId,
      BlockNum,
    }).then((resp) => {
      printLog(
        `getTransactionProgress: ${chain}-${BlockNum}-${transactionId}: ${JSON.stringify(
          resp
        )}`
      );
      if (resp.errorCode === 0) {
        resolve(resp.data);
      } else {
        reject(resp);
      }
    });
  });
};

// 拍照
export const takePic = ({ ratio = '4:3', certificateName = '' }) => {
  if (!_.get(MYK, 'Browser.takePic')) {
    printLog('no MYK.Browser.takePic');
    return Promise.reject();
  }
  return MYK.Browser.takePic(JSON.stringify({ ratio, certificateName }));
};

// 拍照
export const iOSTakePic = ({ key, sourceType }) => {
  if (!_.get(MYK, 'Browser.iOSTakePic')) {
    printLog('no MYK.Browser.iOSTakePic');
    return Promise.reject();
  }
  return MYK.Browser.iOSTakePic(JSON.stringify({ key, sourceType }));
};

// 拍视频
export const takeAuthVideo = () => {
  if (!_.get(MYK, 'Browser.takeAuthVideo')) {
    printLog('no MYK.Browser.takeAuthVideo');
    return Promise.reject();
  }
  return MYK.Browser.takeAuthVideo();
};

// 拍视频
export const takeHoldIDAuthVideo = ({
  title,
  content,
  upload,
  countdown = 60,
}) => {
  if (!_.get(MYK, 'Browser.takeHoldIDAuthVideo')) {
    printLog('no MYK.Browser.takeHoldIDAuthVideo');
    checkAppVersion();
    return Promise.reject();
  }
  return MYK.Browser.takeHoldIDAuthVideo(
    JSON.stringify({
      title,
      content,
      countdown,
      upload,
    })
  )
    .then((res) => {
      printLog(`takeHoldIDAuthVideo result ${JSON.stringify(res)}`);
      if (res.data) {
        return res.data;
      }
      return Promise.reject(res.data);
    })
    .catch((err) => {
      printLog(`takeHoldIDAuthVideo err ${JSON.stringify(err)}`);
      return Promise.reject(err);
    });
};

export const scanAddress = () => {
  if (!_.get(MYK, 'Browser.scanAddress')) {
    printLog(`no MYK.Browser.scanAddress`);
    return Promise.reject();
  }
  return MYK.Browser.scanAddress().then((resp) => {
    printLog(`scanAddress result: ${JSON.stringify(resp)}`);
    const { errorCode, data } = resp;
    if (errorCode === 0) {
      return data;
    }
    return Promise.reject();
  });
};

export const scan = () => {
  if (!_.get(MYK, 'Browser.scan')) {
    printLog(`no MYK.Browser.scan`);
    return Promise.reject();
  }
  return MYK.Browser.scan().then((resp) => {
    printLog(`scan result: ${JSON.stringify(resp)}`);
    const { errorCode, data } = resp;
    if (errorCode === 0) {
      return data;
    }
    return Promise.reject();
  });
};

// 设置交易速度等级
export const setTransactionSpeedLevel = ({ level }) => {
  if (!_.get(MYK, 'Browser.setTransactionSpeedLevel')) {
    printLog(`no MYK.Browser.setTransactionSpeedLevel`);
    return Promise.reject();
  }
  if (!level) {
    return Promise.reject();
  }
  return MYK.Browser.setTransactionSpeedLevel({ level });
};

let setTitleFlag = 1;
let setTitleTimer;

export const setTitle = (title) => {
  if (!title) return;
  if (MYK.Browser && MYK.Browser.setTitle) {
    setTitleFlag = 1;
    MYK.Browser.setTitle(title);
    return;
  }
  if (setTitleFlag < 4) {
    if (setTitleTimer) {
      clearTimeout(setTitleTimer);
    }
    setTitleTimer = setTimeout(() => {
      setTitleFlag += 1;
      setTitle(title);
    }, 1000);
  }
  document.title = title;
};

export const printLog = (log) => {
  console.log(log);
};
