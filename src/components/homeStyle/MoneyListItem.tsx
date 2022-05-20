import styled from "styled-components";
import { MoneyList } from "../../generated/graphql";

const Container = styled.div`
  margin-left: 10px;
`;

const Date = styled.div`
  color: ${(props) => props.theme.borderColor};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5px 10px;
`;
const Text = styled.h1`
  color: ${(props) => props.theme.textColor};
  font-size: 16px;
  font-weight: 600;
`;
const Box = styled.div`
  display: flex;
`;
const Don = styled.h3<{ money: number }>`
  color: ${(props) =>
    props.money < 0 ? props.theme.minusColor : props.theme.plusColor};
  font-size: 18px;
  font-weight: 600;
  margin: 10px;
`;
const Btn = styled.div`
  margin: 10px;
  transition: 2ms ease-in;
  cursor: pointer;
  svg {
    width: 24px;
    background-color: transparent;
  }
  &:hover {
    transform: scale(1.1);
  }
`;

const MoneyListItem = ({ title, amount, date, year, month, id }: MoneyList) => {
  return (
    <Container>
      <Date>{date}</Date>
      <Wrapper>
        <Text>{title}</Text>
        <Box>
          <Don money={amount}>
            {amount > 0
              ? `+${new Intl.NumberFormat("ja-JP", {
                  style: "currency",
                  currency: "JPY",
                }).format(amount)}`
              : new Intl.NumberFormat("ja-JP", {
                  style: "currency",
                  currency: "JPY",
                }).format(amount)}
          </Don>

          <Btn>
            <svg
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </Btn>
          <Btn style={{ color: "green" }}>
            <svg
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
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </Btn>
        </Box>
      </Wrapper>
    </Container>
  );
};

export default MoneyListItem;
