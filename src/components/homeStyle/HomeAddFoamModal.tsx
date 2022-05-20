import styled from "styled-components";
import Input from "../Input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import AuthBtn from "../authStyle/AuthBtn";
import { closeModal } from "../../apollo";
import { AnimatePresence, motion } from "framer-motion";
import { gql, useMutation } from "@apollo/client";
import { VIEW_MONEY_QUERY } from "../../routes/pages/Home";

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Box = styled(motion.div)`
  width: 400px;
  height: 500px;
  background-color: white;
  overflow: hidden;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const Exit = styled.div`
  width: 50px;
  height: 30px;
  color: white;
  border-radius: 5px;
  position: absolute;
  right: 10px;
  top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.minusColor};
  cursor: pointer;
  &:hover {
    background-color: tomato;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  padding-bottom: 20px;
`;
const Header = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: ${(props) => props.theme.mainColor};
`;
const Label = styled.label`
  font-size: 14px;
  font-weight: 700;
  color: ${(props) => props.theme.mainColor};
`;
const DateBox = styled.div``;
const DateInput = styled.input`
  width: 100px;
  padding: 10px;
  background-color: #fafafa;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin: 5px 0px;
  border-radius: 3px;
  &::placeholder {
    font-size: 14px;
  }
`;
const BoarderBox = styled.div`
  display: flex;
`;
const PlusBoarder = styled.div<{ plus: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 20px;
  border-radius: 15px;
  width: 100px;
  height: 50px;
  border: solid 2px
    ${(props) => (props.plus ? props.theme.plusColor : props.theme.borderColor)};
  cursor: pointer;
  div {
    color: ${(props) =>
      props.plus ? props.theme.plusColor : props.theme.borderColor};
    font-size: 16px;
    font-weight: 700;
  }
`;
const MinusBoarder = styled.div<{ plus: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 20px;
  border-radius: 15px;
  width: 100px;
  height: 50px;
  border: solid 2px
    ${(props) =>
      props.plus ? props.theme.borderColor : props.theme.minusColor};
  cursor: pointer;
  div {
    color: ${(props) =>
      props.plus ? props.theme.borderColor : props.theme.minusColor};
    font-size: 16px;
    font-weight: 700;
  }
`;

type Data = {
  title: string;
  year: number;
  month: number;
  day: number;
  amount: number;
};

const CREATE_MUTATION = gql`
  mutation createMoney(
    $amount: Int!
    $title: String!
    $date: String!
    $year: Int!
    $month: Int!
  ) {
    createMoney(
      amount: $amount
      title: $title
      date: $date
      year: $year
      month: $month
    ) {
      ok
      error
    }
  }
`;

const HomeAddFoamModal = () => {
  const { register, handleSubmit } = useForm<Data>();
  const [plus, setPlus] = useState(true);
  const [createMoney, { loading }] = useMutation(CREATE_MUTATION);
  const clickedPlus = () => {
    setPlus(true);
  };
  const clickedMinus = () => {
    setPlus(false);
  };

  const onValid = (data: Data) => {
    let { year, month, day, title, amount } = data;
    if (!plus) amount *= -1;
    const date = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
    createMoney({
      variables: {
        title,
        date,
        amount: Number(amount),
        year: Number(year),
        month: Number(month),
      },
      refetchQueries: [VIEW_MONEY_QUERY],
    });
    confirmAdd();
  };

  return (
    <AnimatePresence>
      <Container>
        <Box
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.1 } }}
          exit={{ opacity: 0 }}
        >
          <Exit onClick={() => closeModal()}>とじる</Exit>
          <Header>追加する！</Header>
          <Form onSubmit={handleSubmit(onValid)}>
            <Label htmlFor="title">Content</Label>
            <Input
              placeholder="例:給料"
              register={register("title", {
                required: true,
              })}
            />
            <Label htmlFor="year">Date</Label>
            <DateBox>
              <DateInput
                {...register("year", { required: true, max: 2023 })}
                placeholder="yyyy "
              ></DateInput>
              <DateInput
                {...register("month", { required: true, max: 12, min: 1 })}
                placeholder="mm"
              ></DateInput>
              <DateInput
                {...register("day", { required: true, max: 31, min: 1 })}
                placeholder="dd"
              ></DateInput>
            </DateBox>
            <Label htmlFor="amount">Money</Label>
            <Input
              placeholder="金額"
              register={register("amount", {
                required: true,
              })}
            />
            <BoarderBox>
              <PlusBoarder plus={plus} onClick={clickedPlus}>
                <div>入った</div>
              </PlusBoarder>

              <MinusBoarder plus={plus} onClick={clickedMinus}>
                <div>出た</div>
              </MinusBoarder>
            </BoarderBox>
            <AuthBtn text="入力する" />
          </Form>
        </Box>
      </Container>
    </AnimatePresence>
  );
};

export default HomeAddFoamModal;
