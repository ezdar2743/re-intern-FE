import styled from "styled-components";

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
const TotalAmount = styled.h1`
  padding: 5px;
  margin: 10px 0;
  font-size: 28px;
  font-weight: 800px;
  color: ${(props) => props.theme.mainColor};
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
const HomeSummary = () => {
  return (
    <SummaryBox>
      <MoneyImg src="https://cdn.pixabay.com/photo/2021/06/27/12/40/money-6368673_960_720.png"></MoneyImg>
      <WelcomeText>こんにちは。(Name)様！</WelcomeText>
      <WelcomeText>今までの収支を確認してください。</WelcomeText>
      <TotalAmount>￥1,000</TotalAmount>
      <AmountDevideBox>
        <Income>
          <div>入ったお金</div> <span>50,000</span>
        </Income>
        <ColDevidedLine></ColDevidedLine>
        <Expend>
          <div>出たお金</div>
          <span>49,000</span>
        </Expend>
      </AmountDevideBox>
    </SummaryBox>
  );
};

export default HomeSummary;
