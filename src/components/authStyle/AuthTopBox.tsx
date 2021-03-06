import { ReactNode } from "react";
import styled from "styled-components";
import { AuthBox } from "./AuthBox";

const TopBox = styled(AuthBox)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 30px;
`;
type Props = {
  children: ReactNode;
};

const AuthTopBox = ({ children }: Props) => {
  return <TopBox>{children}</TopBox>;
};

export default AuthTopBox;
