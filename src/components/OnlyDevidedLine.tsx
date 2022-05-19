import styled from "styled-components";

const DividedLine = styled.div`
  margin: 20px 0px 30px 0;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${(props) => props.theme.borderColor};
  height: 1px;
`;
const OnlyDevidedLine = () => {
  return <DividedLine></DividedLine>;
};

export default OnlyDevidedLine;
