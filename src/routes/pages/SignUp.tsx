import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthBtn from "../../components/authStyle/AuthBtn";
import AuthError from "../../components/authStyle/AuthError";
import AuthLayout from "../../components/authStyle/AuthLayout";
import AuthLogo from "../../components/authStyle/AuthLogo";
import AuthTopBox from "../../components/authStyle/AuthTopBox";
import BottomBox from "../../components/authStyle/AuthbottomBox";
import OtherLogin from "../../components/authStyle/OtherLogin";
import DevidedLine from "../../components/DevidedLine";
import Input from "../../components/Input";
import {
  CreateAccountMutation,
  MutationCreateAccountArgs,
} from "../../generated/graphql";

const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  padding-bottom: 20px;
`;
const SignUpLogo = styled.svg`
  margin-top: 30px;
  width: 200px;
  height: 30px;
`;
const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $email: String!
    $name: String!
    $loginId: String!
    $password: String!
  ) {
    createAccount(
      email: $email
      name: $name
      loginId: $loginId
      password: $password
    ) {
      ok
      error
    }
  }
`;

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
  } = useForm<MutationCreateAccountArgs>();
  const { loginId, password } = getValues();
  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted: (data: CreateAccountMutation) => {
      const { ok, error } = data?.createAccount;
      if (!ok) {
        return;
      }
      navigate("/", {
        state: {
          message: "会員登録を完了しました。ログインしてください。",
          loginId,
          password,
        },
      });
    },
  });

  const onValid = (data: MutationCreateAccountArgs) => {
    if (loading) {
      return;
    }
    const { email, name, loginId, password } = data;

    createAccount({
      variables: { email, name, loginId, password },
    });
  };
  return (
    <AuthLayout>
      <AuthTopBox>
        <SignUpLogo>
          <AuthLogo />
        </SignUpLogo>
        <OtherLogin text="他の方法でログインする" />
        <DevidedLine text="or" />
        <AuthForm onSubmit={handleSubmit(onValid)}>
          <Input
            register={register("email", {
              required: "Emailは必修です。",
              pattern: {
                value:
                  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/g,
                message: "Emailの型式ではありません。",
              },
            })}
            placeholder="メール"
          />
          <AuthError text={errors?.email?.message} />
          <Input
            register={register("name", { required: "名前は必須です。" })}
            placeholder="名前"
          />
          <AuthError text={errors?.name?.message} />
          <Input
            register={register("loginId", { required: "Login IDは必須です。" })}
            placeholder="Login ID"
          />
          <AuthError text={errors?.loginId?.message} />
          <Input
            type="password"
            register={register("password", {
              required: "Passwordは必須です。",
            })}
            placeholder="Password"
          />
          <AuthError text={errors?.password?.message} />

          <AuthBtn text={loading ? "Loading.." : "会員登録"} />
        </AuthForm>
      </AuthTopBox>
      <BottomBox text="Do you have account?" link="" linkName="ログイン" />
    </AuthLayout>
  );
};

export default SignUp;
