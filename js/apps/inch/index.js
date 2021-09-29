import React, { useEffect, useState } from 'react';
import { useIntl } from 'js/locals';
import { Button, Input } from 'antd';
import styled from 'styled-components';
import { check } from './check';

export default function Inch() {
  const intl = useIntl();
  const [result, setResult] = useState({});

  useEffect(() => {
    doCheck();
  }, []);

  const doCheck = () => {
    check().then((resp) => {
      setResult(resp);
    });
  };

  return (
    <StyledIndex>
      <pre className="result">{JSON.stringify(result, null, 2)}</pre>
      <Button type="primary" onClick={doCheck}>
        check
      </Button>
    </StyledIndex>
  );
}

export const StyledIndex = styled.div`
  background: #fff;
  min-height: 100%;
  overflow: hidden;
  padding: 0.2rem 0.16rem 0.3rem;
  max-width: 500px;
  margin: 0 auto;

  .result {
    overflow: hidden;
    font-size: 18px;
  }

  .ant-btn {
    margin: 30px 0;
  }
`;
