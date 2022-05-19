import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import styled from "styled-components";

const InputBox = styled.input`
  width: 300px;
  border-radius: 3px;
  padding: 10px;

  background-color: #fafafa;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin: 8px 0px;
  &::placeholder {
    font-size: 12px;
  }
`;
interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegisterReturn;
}
const Input = ({ register, ...rest }: IProps) => {
  return <InputBox {...register} {...rest}></InputBox>;
};

export default Input;
