import React from 'react';
import { useIntl } from 'js/locals';
import styled from 'styled-components';
import { Select } from 'antd';
import { useEos } from 'js/providers/useEos';

const Option = Select.Option;

export default function EOSNodes() {
  const { networks = [], networkOption, changeNetwork } = useEos();
  const intl = useIntl();
  return (
    <StyledNodes isMobile={false}>
      {intl['common.Node']}:
      <Select
        value={networkOption?.host}
        onChange={(val) => {
          const cur = networks.find((n) => n.host === val);
          if (cur) changeNetwork(cur);
        }}
      >
        {networks.map((n) => (
          <Option key={n.host} value={n.host}>
            {n.host}
          </Option>
        ))}
      </Select>
    </StyledNodes>
  );
}

const StyledNodes = styled.div`
  padding: 0 16px;
  margin: 10px 0;
  display: flex;
  align-items: center;
  .ant-select {
    margin-left: 10px;
    width: 200px;
  }
`;
