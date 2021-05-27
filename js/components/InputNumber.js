import PropTypes from 'prop-types';
import React from 'react';
import { Input } from 'antd';

const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`);

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

export default function InputNumber({ onChange, ...rest }) {
  return (
    <Input
      pattern="^[0-9]*[.,]?[0-9]*$"
      onChange={(e) => {
        const val = e.target.value;
        if (val === '' || inputRegex.test(escapeRegExp(val))) {
          if (onChange) onChange(e);
        }
      }}
      {...rest}
    />
  );
}

InputNumber.propTypes = {
  onChange: PropTypes.func,
};
