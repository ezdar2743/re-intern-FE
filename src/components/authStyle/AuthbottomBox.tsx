import { Link } from "react-router-dom";
import styled from "styled-components";
import { AuthBox } from "./AuthBox";

const Box = styled(AuthBox)`
  margin-top: 30px;
  padding: 20px 0px;
  text-align: center;
  font-weight: 600;
  a {
    margin-left: 10px;
    color: ${(props) => props.theme.mainColor};
    font-weight: 500;
    &:hover {
      color: #3276bc;
    }
  }
`;
interface IProps {
  text: string;
  link: string;
  linkName: string;
}

const AuthbottomBox = ({ text, link, linkName }: IProps) => {
  return (
    <Box>
      <span>
        {text} <Link to={`/${link}`}>{linkName}</Link>
      </span>
    </Box>
  );
};

export default AuthbottomBox;
