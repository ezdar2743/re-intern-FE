import { useQuery, useReactiveVar } from "@apollo/client";
import { Link, useMatch } from "react-router-dom";
import styled from "styled-components";
import { displayMonth, displayYear } from "../../apollo";
import { MoneyList } from "../../generated/graphql";
import { VIEW_MONEY_QUERY } from "../../routes/pages/Home";
import OnlyDevidedLine from "../OnlyDevidedLine";
import HomeMoneyList from "./HomeMoneyList";

const Wrapper = styled.div`
  border-radius: 10px;
  max-width: 760px;
  width: 100%;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #ffffff;
`;
const BtnBox = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 5px 20px;
`;
const List = styled.div<{ isActive: boolean }>`
  margin: 10px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  color: ${(props) =>
    props.isActive ? props.theme.mainColor : props.theme.borderColor};
`;
const ListBox = styled.div`
  height: 400px;
  overflow-y: auto;
`;

const HomeList = () => {
  const allMatch = useMatch("/");
  const inMatch = useMatch("/income");
  const exMatch = useMatch("/expend");
  let sortDate = [];
  const clickedMonth = useReactiveVar(displayMonth);
  const clickedYear = useReactiveVar(displayYear);
  const { data: moneyInfo } = useQuery(VIEW_MONEY_QUERY, {
    variables: {
      year: clickedYear.year,
      month: clickedMonth.month,
    },
  });

  if (moneyInfo?.viewMoney) {
    const sort = moneyInfo?.viewMoney
      .slice()
      .sort(
        (a: any, b: any) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    sortDate = sort;
  }

  return (
    <Wrapper>
      <BtnBox>
        <Link to="/">
          <List isActive={allMatch !== null}>全て</List>
        </Link>
        <Link to={`/income`}>
          <List isActive={inMatch !== null}>入った</List>
        </Link>
        <Link to={`/expend`}>
          <List isActive={exMatch !== null}>出た</List>
        </Link>
      </BtnBox>
      <ListBox>
        <OnlyDevidedLine />
        {allMatch && sortDate
          ? sortDate.map((i: MoneyList) => <HomeMoneyList key={i.id} {...i} />)
          : null}

        {inMatch && sortDate
          ? sortDate
              .filter((i: MoneyList) => i.amount > 0)
              .map((data: MoneyList) => (
                <HomeMoneyList key={data.id} {...data}></HomeMoneyList>
              ))
          : null}
        {exMatch && sortDate
          ? sortDate
              .filter((i: MoneyList) => i.amount < 0)
              .map((data: MoneyList) => (
                <HomeMoneyList key={data.id} {...data}></HomeMoneyList>
              ))
          : null}
      </ListBox>
    </Wrapper>
  );
};

export default HomeList;
