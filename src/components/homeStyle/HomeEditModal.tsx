import styled from "styled-components";
import Input from "../Input";
import { useForm } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { gql, useMutation, useQuery } from "@apollo/client";
import { CURRENT_USER, VIEW_MONEY_QUERY } from "../../routes/pages/Home";

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
  color: #27ae60;
`;
const Label = styled.label`
  font-size: 14px;
  font-weight: 700;
  color: #27ae60;
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
const Btn = styled.button`
  padding: 8px;
  background-color: #27ae60;
  color: #ffffff;
  margin-top: 30px;
  border-radius: 3px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #2ecc71;
  }
`;

type Data = {
  title: string;
  year: number;
  month: number;
  day: number;
  amount: number;
};

type Props = {
  id: number;
};

export const VIEW_EDIT_LIST_QUERY = gql`
  query viewEditList($id: Int!) {
    viewEditList(id: $id) {
      title
      date
      amount
      year
      month
    }
  }
`;
const EDIT_MUTATION = gql`
  mutation editMoney(
    $title: String!
    $amount: Int!
    $date: String!
    $year: Int!
    $month: Int!
    $id: Int!
  ) {
    editMoney(
      title: $title
      amount: $amount
      date: $date
      year: $year
      month: $month
      id: $id
    ) {
      ok
    }
  }
`;

const HomeEditModal = ({ id }: Props) => {
  const { data, loading } = useQuery(VIEW_EDIT_LIST_QUERY, {
    variables: {
      id: Number(id),
    },
  });
  const [editMoney, lading] = useMutation(EDIT_MUTATION);

  let day;
  let fullDate = data?.viewEditList?.date;
  if (fullDate) {
    day = fullDate.slice(8, 10);
  }
  const { register, handleSubmit } = useForm<Data>({
    defaultValues: {
      title: data?.viewEditList.title || "",
      year: data?.viewEditList.year || "",
      month: data?.viewEditList.month || "",
      day,
      amount: data?.viewEditList.amount || "",
    },
  });

  const navigate = useNavigate();
  const confirmEdit = () => {
    navigate("/");
  };
  const onValid = (data: Data) => {
    let { year, month, day, title, amount } = data;
    const date = `${year}-${month.toString().padStart(2, "0")}-${day
      .toString()
      .padStart(2, "0")}`;
    editMoney({
      variables: {
        title,
        date,
        amount: Number(amount),
        year: Number(year),
        month: Number(month),
        id: Number(id),
      },
      refetchQueries: [VIEW_MONEY_QUERY, CURRENT_USER],
    });
    confirmEdit();
  };

  return (
    <AnimatePresence>
      <Container>
        <Box
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.1 } }}
          exit={{ opacity: 0 }}
        >
          <Exit onClick={() => confirmEdit()}>とじる</Exit>
          <Header>編集する！</Header>
          <Form onSubmit={handleSubmit(onValid)}>
            <Label htmlFor="title">Content</Label>
            <Input register={register("title")} />
            <Label htmlFor="year">Date</Label>
            <DateBox>
              <DateInput {...register("year", { max: 2023 })}></DateInput>
              <DateInput
                {...register("month", { max: 12, min: 1 })}
              ></DateInput>
              <DateInput {...register("day", { max: 31, min: 1 })}></DateInput>
            </DateBox>
            <Label htmlFor="amount">Money</Label>
            <Input register={register("amount")} />

            <Btn>編集する</Btn>
          </Form>
        </Box>
      </Container>
    </AnimatePresence>
  );
};

export default HomeEditModal;
