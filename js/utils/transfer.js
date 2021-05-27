import { addDecimal0 } from 'js/utils/numberUtils';
import { getChainAccount, MYK } from 'js/utils/myk';

export const transfer = ({
  chain,
  code,
  symbol,
  decimals,
  address,
  quantity,
  memo,
  assetType, // for tron
}) => {
  if (chain === 'TRON' && !assetType) {
    return Promise.reject(new Error('miss tron asset_type'));
  }
  if (decimals === undefined) {
    return Promise.reject(new Error('miss decimals'));
  }
  let _quantity = quantity;
  let _decimals = decimals;
  if (chain === 'EOS') {
    _quantity = addDecimal0(quantity, decimals);
  }

  if (chain === 'BTC') {
    _decimals = decimals;
    _quantity = addDecimal0(quantity, _decimals);
  }

  return getChainAccount(chain).then(({ account }) => {
    return MYK.Browser.sendTransaction({
      chain,
      actions: [
        {
          account: code,
          name: 'transfer',
          assetType,
          data: {
            from: account,
            to: address,
            quantity: `${_quantity} ${symbol}`,
            memo,
            decimal: _decimals,
          },
        },
      ],
    })
      .then((resp) => {
        const { errorCode } = resp;
        if (errorCode === 0 && resp.data) {
          return {
            transaction_id: resp.data.transactionId,
          };
        }
        const message = resp.message || resp || '币友太热情，请稍后重试';
        return Promise.reject(message);
      })
      .catch((err) => {
        return Promise.reject(err?.errorMsg || err);
      });
  });
};
