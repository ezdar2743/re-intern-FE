import styled from "styled-components";

const LoginText = styled.div`
  cursor: pointer;
  color: ${(props) => props.theme.mainColor};
  font-weight: 600;
  font-size: 16px;
  padding: 5px 5px 20px 5px;
`;
type Props = {
  text: string;
};

const OtherLogin = ({ text }: Props) => {
  return (
    <LoginText>
      <span>{text}</span>
    </LoginText>
  );
};

export default OtherLogin;
