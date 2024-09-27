import { createGlobalStyle } from 'styled-components';
import AutumnInNovemberFont from '../assets/font/Autumn-In-November.ttf';

const CommonStyle = createGlobalStyle`
 html {
     font-size: 100px;
 }
 
 html, body {
    scroll-behavior: smooth;
    -ms-overflow-style: none;  /* Internet Explorer 10+ */
    scrollbar-width: none;  /* Firefox */

    /* Remove custom scrollbar to avoid layout reflows */
    &::-webkit-scrollbar { 
        width: 0;
        display: none; 
    } 

    background: #ee9ca7;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to top, #ffdde1, #ee9ca7);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to top, #ffdde1, #ee9ca7); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
 }

 @media screen and (min-width: 1681px) {
    html {
        font-size: 120px;
    }
 }
 
 @media screen and (max-width: 1680px) {
    html {
        font-size: 100px;
    }
 }

 @media screen and (max-width: 736px) {
    html {
        font-size: 80px;
    }
 }

 @media screen and (max-width: 414px) {
    html {
        font-size: 60px;
    }
 }

 @font-face {
    font-family: "AutumnInNovember";
    src: local("AutumnInNovember"), url(${AutumnInNovemberFont}) format('truetype');
    font-style: normal;
    font-weight: normal;
 }
`;

export default CommonStyle;
