import _ from 'lodash';
import Digit, { isNumber } from 'js/utils/digit';

export function sliceNumber(value, num, { decimals, pad = false } = {}) {
  if (!isNumber(value)) return '0';
  let valueStr = `${value}`;
  const isNegative = Number(value) < 0 ? 1 : 0;
  if (valueStr.includes('e')) {
    valueStr = Number(value).toFixed10(num);
  }
  if (decimals) {
    const reg = new RegExp(`(\\.\\d{${decimals}}).*`);
    valueStr = valueStr.replace(reg, '$1');
  }
  let resultStr = valueStr.slice(0, num + isNegative);
  const hasPoint = valueStr.includes('.') ? 1 : 0;
  resultStr = valueStr.slice(0, num + hasPoint);
  if (pad) {
    return _.padEnd(
      `${resultStr}${hasPoint ? '' : '.'}`,
      num + isNegative + 1,
      '0'
    );
  }
  if (resultStr.includes('.')) {
    resultStr = resultStr.replace(/0*$/, '').replace(/\.$/, '');
  }
  return resultStr;
}

window.sliceNumber = sliceNumber;

// 123 4 => 0.0123
export function bigIntToNumberStr(value, decimals) {
  if (!isNumber(value)) return '0';
  let newValue = removeScientificNotation(value, decimals);
  const isNegative = `${newValue}`.includes('-');
  if (isNegative) {
    newValue = value.slice(1);
  }
  const arr = _.padStart(newValue, decimals + 1, '0')
    .split('')
    .reverse();
  arr.splice(decimals, 0, '.');
  let newStr = arr.reverse().join('');
  if (newStr.includes('.')) {
    newStr = newStr.replace(/0*$/, '').replace(/\.$/, '');
  }
  if (isNegative) {
    return `-${newStr}`;
  }
  return newStr;
}

// 0.123 4 => 0123
export const mulDecimal = (quantity, decimal) => {
  let quantityStr = removeScientificNotation(quantity, decimal);
  const length = quantityStr.length;
  const pointIndex = quantityStr.indexOf('.');
  const decimalNumber = pointIndex > -1 ? length - 1 - pointIndex : 0;
  let decimalStr = '';
  if (decimal < decimalNumber) {
    quantityStr = quantityStr.slice(
      0,
      pointIndex > -1 ? decimal + 1 + pointIndex : decimal
    );
  } else {
    decimalStr = `${new Array(decimal - decimalNumber).fill('0').join('')}`;
  }
  return quantityStr.replace('.', '') + decimalStr;
};

// 去除科学计数法
export const removeScientificNotation = (val, decimal) => {
  if (`${val}`.includes('e+')) {
    const sp = `${val}`.split('e+');
    return mulDecimal(sp[0], sp[1]).replace(/^0+/, '');
  }
  if (`${val}`.includes('e-')) {
    return Number(val).toFixed10(decimal);
  }
  return val.toString();
};

// 1.12 4 => 1.1200
export const addDecimal0 = (quantity, decimal) => {
  let quantityStr = removeScientificNotation(quantity, decimal);
  const length = quantityStr.length;
  const pointIndex = quantityStr.indexOf('.');
  const decimalNumber = pointIndex > -1 ? length - 1 - pointIndex : -1;
  if (pointIndex === -1) {
    quantityStr += '.';
  }
  return _.padEnd(quantityStr, decimal - decimalNumber + length, '0');
};

window.mulDecimal = mulDecimal;
window.addDecimal0 = addDecimal0;
window.bigIntToNumberStr = bigIntToNumberStr;
window.removeScientificNotation = removeScientificNotation;

export function toFixed2Percent(data, n, str) {
  if (n && n > 0) {
    return (_.isNumber(data) && data.toFixed(n)) || (str === '' ? '' : '-');
  }
  return (
    (_.isNumber(data) && `${(data * 100).toFixed(2)}%`) ||
    (str === '' ? '' : '-')
  );
}

export function formatAccuracy(value, num, i) {
  const accuracy = Number(num) || 1;
  const digit = new Array(accuracy + 1).join(i || '#');
  return Digit.format(value, `0.${digit}`);
}

export function formatAccuracyPercent(value, num, i, isPercent) {
  if (!isNumber(value)) return '--';
  const accuracy = Number(num) || 1;
  const digit = new Array(accuracy + 1).join(i || '#');
  return Digit.format(value, `0.${digit}${(isPercent && '%') || ''}`);
}

export function getUnit(res) {
  if (!res || !res.length) {
    return {
      num: 1,
      label: '',
    };
  }
  const maxNum = _.maxBy(res, (d) => (isNumber(d) ? d : 0));
  if (maxNum > 1000000000000) {
    return {
      num: 100000000000,
      label: '万亿',
    };
  }
  if (maxNum > 100000000) {
    return {
      num: 10000000,
      label: '亿',
    };
  }
  if (maxNum > 10000) {
    return {
      num: 10000,
      label: '万',
    };
  }
  return {
    num: 1,
    label: '',
  };
}

export const hexEncode = (str) => {
  return Array.from(str)
    .map((c) =>
      c.charCodeAt(0) < 128
        ? c.charCodeAt(0).toString(16)
        : encodeURIComponent(c)
            // eslint-disable-next-line no-useless-escape
            .replace(/\%/g, '')
            .toLowerCase()
    )
    .join('');
};

window.hexDecode = hexDecode;
window.hexEncode = hexEncode;

export const hexDecode = (str) => {
  let j;
  const hexes = str.match(/.{1,4}/g) || [];
  let back = '';
  for (j = 0; j < hexes.length; j += 1) {
    back += String.fromCharCode(parseInt(hexes[j], 16));
  }
  return back;
};

export const checkStep = (value, step) => {
  const res = Number(value).div(step);
  return _.isInteger(res);
};
