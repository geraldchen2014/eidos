/* eslint-disable no-param-reassign */
import _ from 'lodash';
import BigNumber from 'bignumber.js';

export function isNumber(value) {
  if (!`${value}`.length || `${value}` === 'null') return false;
  const _value = Number(value);
  if (_.isNaN(_value) || !_.isFinite(_value)) {
    return false;
  }
  return true;
}

/*
 * 数值格式化
 *
 * @param   value           Number/String
 * @param   formatString    String
 *
 * formatString 格式:
 * `0` - 不保留小数
 * `0.0` - 保留1位小数
 * `0.00` - 保留2位小数
 * `0,000` - 千分位，不保留小数
 * `0,000.000` - 千分位，保留3位小数
 * `0,0.000` - 千分位的简写形式，保留3位小数
 * `0.###` - 最多保留3位小数，小数末尾不补0
 * `0.0%` - 使用百分比，保留1位小数
 *
 */

// options: {
//   double, floor
// }

const defaultFM = {
  prefix: '',
  decimalSeparator: '.',
  groupSeparator: ',',
  groupSize: 3,
  secondaryGroupSize: 0,
  fractionGroupSeparator: ' ',
  fractionGroupSize: 0,
  suffix: '',
};

function format(value, formatString, options) {
  const { floor = true } = options || {};
  // 验证格式化字符串
  const re = /^(\^)?[~+-]?0(,(0|0{3}))?(\.(0+|#+))?%?$/;
  if (!re.test(formatString)) {
    console.error(`Invalid format string: ${formatString}`);
    return false;
  }
  if (!isNumber(value)) {
    return '';
  }

  // 处理百分比格式，数值乘以100
  let suffix = '';
  if (formatString[formatString.length - 1] === '%') {
    value *= 100;
    suffix = '%';
    formatString = formatString.substr(0, formatString.length - 1);
  }

  // 处理小数精确度
  const precision =
    formatString.indexOf('.') === -1
      ? ''
      : formatString.substr(formatString.indexOf('.') + 1);

  let rm = BigNumber.ROUND_HALF_UP;
  if (floor) {
    rm = BigNumber.ROUND_FLOOR;
  }
  // 添加千分位
  const decimalSeparator = formatString.indexOf(',') !== -1;
  const output = new BigNumber(value).toFormat(precision.length, rm, {
    ...defaultFM,
    groupSeparator: decimalSeparator ? ',' : '',
    groupSize: 3,
    suffix: '',
  });

  if (precision.includes('#')) {
    return `${Number(output)}${suffix}`;
  }

  return `${output}${suffix}`;
}

export default {
  format,
};
