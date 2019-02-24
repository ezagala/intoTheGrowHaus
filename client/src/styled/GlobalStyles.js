import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

  @import url('https://fonts.googleapis.com/css?family=Pontano+Sans');

  * {
    box-sizing: border-box;
    font-family: 'Pontano Sans', sans-serif;
    font-size: 14px;
    user-select: none;
  }

  html, body {
    margin: 0;
  }
`

export default GlobalStyles; 


