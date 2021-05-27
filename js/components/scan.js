import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { scan, MYK } from 'js/utils/myk';
import icon_tron from 'img/scan@3x.png';

export default function Scan({ onScan }) {
  const showScanIcon = !!_.get(MYK, 'Browser.scan');
  if (!showScanIcon) return null;
  return (
    <img
      src={icon_tron}
      alt="icon-scan"
      className="icon-scan"
      style={{ width: '0.26rem', height: '0.26rem' }}
      onClick={() => {
        scan()
          .then((resp) => {
            onScan(resp);
          })
          .catch(() => {});
      }}
    />
  );
}

Scan.propTypes = {
  onScan: PropTypes.func,
};
