import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    whiteColor: string;
    mainColor: string;
    borderColor: string;
    plusColor: string;
    minusColor: string;
  }
}
