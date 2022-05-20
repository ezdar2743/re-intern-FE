import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useMatch } from "react-router-dom";
import styled from "styled-components";
import { openAddModalVar } from "../../apollo";
import HomeAddFoam from "../../components/homeStyle/HomeAddFoam";
import HomeAddFoamModal from "../../components/homeStyle/HomeAddFoamModal";
import HomeDateSelector from "../../components/homeStyle/HomeDateSelector";
import HomeEditModal from "../../components/homeStyle/HomeEditModal";
import HomeList from "../../components/homeStyle/HomeList";
import HomeSummary from "../../components/homeStyle/HomeSummary";
const Container = styled.div`
  width: 90%;
  height: 100%;
  border-radius: 35px;
  background-color: #f5f6fa;
  box-shadow: 8px 8px 40px rgba(143, 143, 150, 0.55),
    -10px -10px 30px rgb(255, 255, 255, 0.8);
`;
const InnerContainer = styled.div`
  width: 100%;
  height: 100%;
  background: #f5f5f6;
  border-radius: 35px;
  box-shadow: inset -12px -12px 16px rgb(174, 174, 192, 0.32),
    inset 14px 14px 12px rgba(255, 255, 255);
  padding: 0 22px 40px 22px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;
const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 15px;
`;
const ThickDevide = styled.div`
  margin: 20px 0px 30px 0;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${(props) => props.theme.borderColor};
  height: 3px;
`;

export const VIEW_MONEY_QUERY = gql`
  query viewMoney($year: Int!, $month: Int) {
    viewMoney(year: $year, month: $month) {
      id
      title
      amount
      date
    }
  }
`;
export const CURRENT_USER = gql`
  query currentUser {
    currentUser {
      name
      moneyLists {
        amount
        date
        title
        month
        year
      }
    }
  }
`;

const Home: React.FC = () => {
  const { data: loginUser } = useQuery(CURRENT_USER);
  const clickedAdd = useReactiveVar(openAddModalVar);
  const editMatch = useMatch("/editList/:id");
  const editId = editMatch?.params.id;
  return (
    <>
      <Container>
        <InnerContainer>
          <ContentBox>
            <HomeDateSelector />
            <HomeSummary user={loginUser?.currentUser?.name} />
            <ThickDevide />
            <HomeList />
            <HomeAddFoam />
          </ContentBox>
        </InnerContainer>
      </Container>
      {clickedAdd && <HomeAddFoamModal />}
      {editMatch && <HomeEditModal id={Number(editId)} />}
    </>
  );
};

export default Home;
