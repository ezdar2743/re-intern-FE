import { useReactiveVar } from "@apollo/client";
import styled from "styled-components";
import { nextMonth, displayMonth, displayYear, preMonth } from "../../apollo";
import OnlyDevidedLine from "../OnlyDevidedLine";
import SvgIcon from "../SvgIcon";

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

const HomeDateSelector = () => {
  const clickedMonth = useReactiveVar(displayMonth);
  const clickedYear = useReactiveVar(displayYear);
  const sameThisYM = () => {
    if (
      clickedYear.year === new Date().getFullYear() &&
      clickedMonth.month === new Date().getMonth() + 1
    ) {
      return true;
    } else return false;
  };
  return (
    <>
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
    </>
  );
};

export default HomeDateSelector;
