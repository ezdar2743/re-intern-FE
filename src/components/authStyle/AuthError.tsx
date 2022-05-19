import styled from "styled-components";

const ErrorMessage = styled.h1`
  color: tomato;
  font-size: 12px;
  font-weight: bold;
`;

type Props = {
  text: string | undefined;
};

const AuthError = ({ text }: Props) => {
  return <ErrorMessage>{text}</ErrorMessage>;
};

export default AuthError;
