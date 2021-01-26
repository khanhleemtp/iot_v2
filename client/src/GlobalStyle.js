import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
/*===== VARIABLES CSS =====*/
:root{
    --header-height: 66px;
    --nav-width: 70px;

    /*===== Colors =====*/
    --first-color: #3e97ff;
    --first-color-light: #AFA5D9;
    --white-color: #fff;
    --header-color: #fff;;
    --background-hover-color: #007bff;

    /*===== Font and typography =====*/
    --body-font: 'Inter';
    --normal-font-size: 1rem;
  
    /*===== z index =====*/
    --z-fixed: 100;
}

/*===== BASE =====*/
*,::before,::after{
    box-sizing: border-box;
}

body{
    position: relative;
    font-family: var(--body-font);
    font-size: var(--normal-font-size);
    transition: .3s;
    background: #ddd;
}

a{
    text-decoration: none;
}

.my{
    margin: 12px 16px;
}

`;
