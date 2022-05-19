import styled from "styled-components";

const Btn = styled.button`
  padding: 8px;
  background-color: ${(props) => props.theme.mainColor};
  color: #ffffff;
  margin-top: 30px;
  border-radius: 3px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #3276bc;
  }
`;
type Props = {
  text: string;
};

const AuthBtn = ({ text }: Props) => {
  return <Btn>{text}</Btn>;
};

export default AuthBtn;
