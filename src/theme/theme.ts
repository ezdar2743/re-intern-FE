import { DefaultTheme, createGlobalStyle } from "styled-components";
import reset from "styled-reset";
export const lightTheme: DefaultTheme = {
  textColor: "rgb(38, 38, 38)",
  whiteColor: "#FAFAFA",
  mainColor: "#1B54AC",
  borderColor: "#DBDBDB",
  plusColor: "#1e90ff",
  minusColor: "#e84118",
};
// TODO: 時間があればダークモード
export const dartTheme: DefaultTheme = {
  textColor: "rgb(38, 38, 38)",
  whiteColor: "#FAFAFA",
  mainColor: "#1B54AC",
  borderColor: "#DBDBDB",
  plusColor: "#1e90ff",
  minusColor: "#e84118",
};

export const GlobalStyle = createGlobalStyle`
  ${reset}
  *  {
      box-sizing:border-box; 
    }
    body {
        background-color: ${(props) => props.theme.whiteColor};
        font-size:14px;
        font-family:'Open Sans', sans-serif;
        color:${(props) => props.theme.textColor};
    }
    a {
      text-decoration: none;
      color:inherit;
    }
    input { 
      border:none
    }
`;
