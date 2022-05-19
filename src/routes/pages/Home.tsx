import { useReactiveVar } from "@apollo/client";
import styled from "styled-components";
import { nextMonth, nowMonth, nowYear, preMonth } from "../../apollo";
import OnlyDevidedLine from "../../components/OnlyDevidedLine";
import SvgIcon from "../../components/SvgIcon";

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
const TitleBox = styled.div`
  width: 50%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const TitleText = styled.h1`
  font-size: 24px;
  display: flex;
`;
const NowText = styled.span`
  font-size: 10px;
  color: tomato;
`;
const Home: React.FC = () => {
  const clickedMonth = useReactiveVar(nowMonth);
  const clickedYear = useReactiveVar(nowYear);
  const sameThisYM = () => {
    if (
      clickedYear.year === new Date().getFullYear() &&
      clickedMonth.month === new Date().getMonth() + 1
    ) {
      return true;
    } else return false;
  };

  return (
    <Container>
      <InnerContainer>
        <ContentBox>
          <TitleBox>
            <SvgIcon>
              <svg
                onClick={() => preMonth()}
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </SvgIcon>

            {sameThisYM() ? (
              <TitleText>
                {`${clickedYear.year}年  ${clickedMonth.month}月  `}
                <NowText>now!</NowText>
              </TitleText>
            ) : (
              <TitleText>
                {`${clickedYear.year}年 ${clickedMonth.month}月 `}
              </TitleText>
            )}
            <SvgIcon>
              <svg
                onClick={() => nextMonth()}
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </SvgIcon>
          </TitleBox>
          <OnlyDevidedLine />
        </ContentBox>
      </InnerContainer>
    </Container>
  );
};

export default Home;
