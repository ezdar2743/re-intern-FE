import { ReactNode } from "react";
import styled from "styled-components";

const AuthContainer = styled.div`
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const Wrapper = styled.div`
  max-width: 600px;
  width: 100%;
`;
interface IProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: IProps) => {
  return (
    <AuthContainer>
      <Wrapper>{children}</Wrapper>
    </AuthContainer>
  );
};

export default AuthLayout;
