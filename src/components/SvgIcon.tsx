import styled from "styled-components";

const Icon = styled.div`
  cursor: pointer;
  width: 30px;
  height: 20px;
  margin-left: 20px;
  color: ${(props) => props.theme.mainColor};
  transition: 1ms ease-in-out;
  &:hover {
    transform: scale(1.1);
    color: #3276bc;
  }
`;

type Props = {
  children: React.ReactNode;
};
const SvgIcon = ({ children }: Props) => {
  return <Icon>{children}</Icon>;
};

export default SvgIcon;
