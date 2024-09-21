import { createGlobalStyle } from 'styled-components'
import AutumnInNovemberFont from '../assets/font/Autumn-In-November.ttf'
import BGIMG from '../assets/imgs/welcome-bg.png'

const CommonStyle = createGlobalStyle`
 html{
     font-size: 100px;
 }
 html,body{
    overflow-x: hidden;
    overflow-y: scroll;
    &::-webkit-scrollbar{
        display: none;
    }

    /* Background image settings for responsiveness */
    background-image: url(${BGIMG});
    background-repeat: repeat;
    background-size: cover; /* Image covers the entire section */
    background-position: center;
    background-attachment: fixed;
 }
 @media screen and (min-width: 1681px) {
    html {
        font-size:120px
    }
}
 @media screen and (max-width: 1680px) {
    html {
        font-size:100px
    }
}

@media screen and (max-width: 736px) {
    html {
        font-size:80px
    }
}

@media screen and (max-width: 414px) {
    html {
        font-size:60px
    }
}

@font-face {
    font-family: "AutumnInNovember";
    src: local("AutumnInNovember") url(${AutumnInNovemberFont}) format('truetype');
    font-style: normal;
    font-weight: normal;
  }
`

export default CommonStyle
