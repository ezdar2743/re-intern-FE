import { useQuery, useReactiveVar } from "@apollo/client";
import styled from "styled-components";
import { displayMonth, displayYear } from "../../apollo";
import { MoneyList } from "../../generated/graphql";
import { VIEW_MONEY_QUERY } from "../../routes/pages/Home";

const SummaryBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
`;
const MoneyImg = styled.img`
  margin: 10px 0 30px 0;
  width: 240px;
  height: 220px;
`;
const WelcomeText = styled.h1`
  color: ${(props) => props.theme.textColor};
  font-size: 16px;
  font-weight: 600;
  margin: 10px;
`;
const TotalAmount = styled.h1<{ amount: number }>`
  padding: 5px;
  margin: 10px 0;
  font-size: 28px;
  font-weight: 800px;
  color: ${(props) =>
    props.amount > 0 ? props.theme.plusColor : props.theme.minusColor};
`;
const AmountDevideBox = styled.div`
  border: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.whiteColor};
  width: 30vw;
  height: 15vh;
  display: flex;
  justify-content: space-evenly;
  border-radius: 15px;
  padding: 20px;
`;
const Income = styled.h2`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  div {
    font-size: 20px;
    font-weight: 600;
  }
  span {
    font-size: 22px;
    font-weight: 600;
    color: ${(props) => props.theme.plusColor};
  }
`;
const ColDevidedLine = styled.div`
  width: 2px;
  height: 100%;
  background-color: ${(props) => props.theme.borderColor};
`;
const Expend = styled.h2`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  div {
    font-size: 20px;
    font-weight: 600;
  }
  span {
    font-size: 22px;
    font-weight: 600;
    color: ${(props) => props.theme.minusColor};
  }
`;
type Props = {
  user: string;
};
const HomeSummary = ({ user }: Props) => {
  const clickedMonth = useReactiveVar(displayMonth);
  const clickedYear = useReactiveVar(displayYear);
  const { data: moneyInfo } = useQuery(VIEW_MONEY_QUERY, {
    variables: {
      year: clickedYear.year,
      month: clickedMonth.month,
    },
  });
  let total = 0;
  let income = 0;
  let expend = 0;

  if (moneyInfo?.viewMoney) {
    for (let x of moneyInfo.viewMoney) {
      total += x.amount;
    }
    const filpl = moneyInfo.viewMoney.filter((m: MoneyList) => m.amount > 0);
    for (let x of filpl) {
      income += x.amount;
    }
    const filmi = moneyInfo.viewMoney.filter((m: MoneyList) => m.amount < 0);
    for (let x of filmi) {
      expend += x.amount;
    }
  }
  return (
    <SummaryBox>
      <MoneyImg src="https://cdn.pixabay.com/photo/2021/06/27/12/40/money-6368673_960_720.png"></MoneyImg>
      <WelcomeText>こんにちは。{user}様！</WelcomeText>
      <WelcomeText>今までの収支を確認してください。</WelcomeText>
      <TotalAmount amount={total}>
        {new Intl.NumberFormat("ja-JP", {
          style: "currency",
          currency: "JPY",
        }).format(total)}
      </TotalAmount>
      <AmountDevideBox>
        <Income>
          <div>入ったお金</div>{" "}
          <span>
            {new Intl.NumberFormat("ja-JP", {
              style: "currency",
              currency: "JPY",
            }).format(income)}
          </span>
        </Income>
        <ColDevidedLine></ColDevidedLine>
        <Expend>
          <div>出たお金</div>
          <span>
            {new Intl.NumberFormat("ja-JP", {
              style: "currency",
              currency: "JPY",
            }).format(expend)}
          </span>
        </Expend>
      </AmountDevideBox>
    </SummaryBox>
  );
};

export default HomeSummary;
