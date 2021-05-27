import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { login as eosLogin } from 'js/utils/eosService';
import { addDecimal0 } from 'js/utils/numberUtils';
import { transfer } from 'js/utils/transfer';
import ScatterJS from '@scatterjs/core';
import ScatterEOS from '@scatterjs/eosjs';
import Eos from 'eosjs';

const SetContext = React.createContext();
ScatterJS.plugins(new ScatterEOS());

const networks = [
  {
    chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
    host: 'eos.newdex.one',
    port: 443,
    protocol: 'https',
  },
  {
    chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
    host: 'eos.greymass.com',
    port: 443,
    protocol: 'https',
  },
  {
    chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
    host: 'eospush.tokenpocket.pro',
    port: 443,
    protocol: 'https',
  },
  {
    chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
    host: 'eos.blockeden.cn',
    port: 443,
    protocol: 'https',
  },
];

export default function EosProvider(props) {
  const { children } = props;
  const [account, setAccount] = useState({});
  const [networkOption, setNetworkOption] = useState(null);
  const [network, setNetwork] = useState(null);
  useEffect(() => {
    changeNetwork(networks[0]);
  }, []);

  const changeNetwork = (node) => {
    const networkItem = ScatterJS.Network.fromJson({
      blockchain: 'eos',
      port: 443,
      protocol: 'https',
      ...node,
      // // chainId:
      // //   '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191',
      // // host: 'api-kylin.eosasia.one',
      // chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
      // host: 'eos.newdex.one',
      // port: 443,
      // protocol: 'https',
    });
    setNetworkOption(node);
    setNetwork(networkItem);
    login();
  };

  useEffect(() => {
    if (network) login();
  }, [network]);

  const login = () => {
    eosLogin({ ScatterJS, network }).then((resp) => {
      setAccount(resp);
    });
  };

  const send = ({
    chain,
    code,
    symbol,
    decimals,
    address,
    quantity,
    memo,
    assetType,
  }) => {
    if (window.MyKey) {
      return transfer({
        chain,
        code,
        symbol,
        decimals,
        address,
        quantity,
        memo,
        assetType,
      });
    }
    if (chain === 'EOS') {
      const action = {
        account: code,
        name: 'transfer',
        authorization: [
          {
            actor: account.name,
            permission: account.authority,
          },
        ],
        data: {
          from: account.name,
          to: address,
          quantity: `${addDecimal0(quantity, decimals)} ${symbol}`,
          memo,
        },
      };
      return sendTransaction([action], { network });
    }
    return Promise.reject();
  };

  return (
    <SetContext.Provider
      value={{
        network,
        account,
        networkOption,
        changeNetwork,
        login,
        networks,
        sendTransaction: send,
      }}
    >
      {children}
    </SetContext.Provider>
  );
}

EosProvider.propTypes = {
  children: PropTypes.any,
};

export function useEos() {
  return useContext(SetContext);
}
let isTranasction = 0;

export const sendTransaction = (actions, { network }) => {
  const curTime = Date.now();
  if (isTranasction && curTime - isTranasction < 1000) {
    return new Promise('dobule click');
  }
  isTranasction = curTime;
  return new Promise((resolve, reject) => {
    const eos = ScatterJS.scatter.eos(network, Eos);
    eos
      .transaction({
        actions,
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
