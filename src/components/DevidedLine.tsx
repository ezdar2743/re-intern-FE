import styled from "styled-components";

const Line = styled.div`
  margin: 20px 0px 30px 0;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  div {
    background-color: ${(props) => props.theme.borderColor};
    width: 100%;
    height: 1px;
  }
  span {
    font-weight: 600;
    margin: 0 20px;
    color: #8e8e8e;
  }
`;
interface IProps {
  text: string | undefined;
}

const DevidedLine = ({ text }: IProps) => {
  return (
    <Line>
      <div></div>
      <span>{text}</span>
      <div></div>
    </Line>
  );
};

export default DevidedLine;
