import { gql, useQuery, useReactiveVar } from "@apollo/client";
import styled from "styled-components";
import { nextMonth, displayMonth, displayYear, preMonth } from "../../apollo";
import HomeDateSelector from "../../components/homeStyle/HomeDateSelector";
import HomeSummary from "../../components/homeStyle/HomeSummary";

const Container = styled.div`
  width: 90%;
  height: 100vh;
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
      title
      amount
      date
    }
  }
`;
export const CURRENT_USER = gql`
  query currentUser {
    currentUser {
      loginId
      name
      email
    }
  }
`;

const Home: React.FC = () => {
  const clickedMonth = useReactiveVar(displayMonth);
  const clickedYear = useReactiveVar(displayYear);
  const sameThisYM = () => {
    return (
      clickedYear.year === new Date().getFullYear() &&
      clickedMonth.month === new Date().getMonth() + 1
    );
  };

  return (
    <Container>
      <InnerContainer>
        <ContentBox>
          <HomeDateSelector />
          <HomeSummary />
          <ThickDevide />
        </ContentBox>
      </InnerContainer>
    </Container>
  );
};

export default Home;
