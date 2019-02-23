import { createGlobalStyle } from 'styled-components';
import BackgroundImage from '../assets/growhausBackgroundImage.jpg'; 

const LoginBackground = createGlobalStyle`

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

  body {
    height: auto;
    min-height: 100%;
    background-image: url(${BackgroundImage}); 
  }
`

export default LoginBackground; 


