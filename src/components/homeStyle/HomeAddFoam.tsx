import styled from "styled-components";
import { addClicked } from "../../apollo";

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 50px;
`;
const Boader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 400px;
  height: 200px;
  border: 1px dashed ${(props) => props.theme.mainColor};
  border-radius: 24px;
  background-color: #f5f6fa;
  &:hover {
    background-color: white;
    svg {
      transform: scale(1.1);
    }
  }
  cursor: pointer;
`;
const AddIcon = styled.svg`
  width: 40px;
  color: ${(props) => props.theme.mainColor};
  padding: 5px;
  margin-bottom: 20px;
  border: 1px solid ${(props) => props.theme.mainColor};
  border-radius: 50%;
`;
const Text = styled.h1`
  color: ${(props) => props.theme.mainColor};
  font-size: 18px;
  font-weight: 600;
`;

const HomeAddFoam = () => {
  return (
    <Container>
      <Boader onClick={() => addClicked()}>
        <AddIcon
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </AddIcon>
        <Text>新しいものを追加する。</Text>
      </Boader>
    </Container>
  );
};

export default HomeAddFoam;
