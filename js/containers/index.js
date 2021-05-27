import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router';
import GlobalHeader from 'js/components/GlobalHeader';

@withRouter
export default class App extends React.PureComponent {
  render() {
    return (
      <StyledApp>
        <GlobalHeader />
        {this.props.children}
      </StyledApp>
    );
  }
}

App.propTypes = {
  children: PropTypes.any,
};

const StyledApp = styled.div`
  height: 100%;
  width: 100%;
`;
