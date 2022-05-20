import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import styled from "styled-components";
import allLocales from "@fullcalendar/core/locales-all";
import interactionPlugin from "@fullcalendar/interaction";
import { useQuery } from "@apollo/client";
import { CURRENT_USER } from "./Home";

const Container = styled.div`
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Wrapper = styled.div`
  max-width: 1000px;
  width: 100%;
`;
const Calendar: React.FC = () => {
  const calendarList = [];

  const { data, loading } = useQuery(CURRENT_USER);

  const moneyList = data?.currentUser?.moneyLists;
  if (!loading) {
    for (let x of moneyList) {
      calendarList.push({
        title: `${x.title}  ${new Intl.NumberFormat("ja-JP", {
          style: "currency",
          currency: "JPY",
        }).format(x.amount)} `,
        date: x.date,
        id: x.id,
      });
    }
  }
  return (
    <Container>
      <Wrapper>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          locales={allLocales}
          locale="ja"
          eventDisplay={"block"}
          eventTextColor={"#FFF"}
          eventColor={"#1B54AC"}
          events={calendarList}
          height={"660px"}
        />
      </Wrapper>
    </Container>
  );
};

export default Calendar;
