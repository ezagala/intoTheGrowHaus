import React from 'react';
import {PropTypes } from 'prop-types'; 
import styled, { keyframes } from 'styled-components'; 

const moveUpFromBottom = keyframes`
  0% { opacity: 0; transform: translateY(9999px); }
  80% { opacity: .5; transform: translateY(-50px); }
  90% {transform: rotate(5deg)}
  100% { opacity: 1; transform: translateY(0), rotate(-5deg); }
`;

const AnimateUpWrapper = styled.div`
  animation: ${moveUpFromBottom} 1.5s ease-out forwards; 
  width: ${props => props.width ? props.width : '100%'};
`;

const AnimateUp = props => (
  <AnimateUpWrapper>
    { props.children }
  </AnimateUpWrapper>
)

AnimateUp.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default AnimateUp; 