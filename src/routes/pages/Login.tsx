import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { logUserIn } from "../../apollo";
import AuthBtn from "../../components/authStyle/AuthBtn";
import AuthError from "../../components/authStyle/AuthError";
import AuthLayout from "../../components/authStyle/AuthLayout";
import AuthLogo from "../../components/authStyle/AuthLogo";
import AuthTopBox from "../../components/authStyle/AuthTopBox";
import BottomBox from "../../components/authStyle/AuthbottomBox";
import OtherLogin from "../../components/authStyle/OtherLogin";
import DevidedLine from "../../components/DevidedLine";
import Input from "../../components/Input";
import { LoginMutation, MutationLoginArgs } from "../../generated/graphql";

const LoginLogo = styled.svg`
  margin-top: 30px;
  width: 200px;
  height: 30px;
`;
const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  padding-bottom: 20px;
`;
const HeaderText = styled.h1`
  font-size: 16px;
  font-weight: 600;
`;
const CreateSuccess = styled(HeaderText)`
  color: ${(props) => props.theme.plusColor};
`;

const LOGIN_MUTATION = gql`
  mutation login($loginId: String!, $password: String!) {
    login(loginId: $loginId, password: $password) {
      ok
      token
      error
    }
  }
`;
interface ILocation {
  state: {
    message: string;
    loginId: string;
    password: string;
  };
}

const Login: React.FC = () => {
  const { state } = useLocation() as ILocation;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<MutationLoginArgs>({
    defaultValues: {
      loginId: state?.loginId || "",
      password: state?.password || "",
    },
  });

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data: LoginMutation) => {
      const { ok, error, token } = data.login;
      if (!ok) {
        setError("result", {
          message: error,
        });
      }
      if (token) {
        logUserIn(token);
      }
    },
  });

  const onValid = (data: MutationLoginArgs) => {
    if (loading) {
      return;
    }
    login({
      variables: { loginId: data?.loginId, password: data?.password },
    });
  };
  return (
    <AuthLayout>
      <AuthTopBox>
        <LoginLogo>
          <AuthLogo />
        </LoginLogo>
        {state ? (
          <CreateSuccess>{state?.message}</CreateSuccess>
        ) : (
          <HeaderText>????????????????????????????????? Login ID??????????????????</HeaderText>
        )}

        <AuthForm onSubmit={handleSubmit(onValid)}>
          <Input
            onChange={() => clearErrors("result")}
            register={register("loginId", {
              required: "ID??????????????????????????????",
            })}
            placeholder="Login ID"
          />
          <AuthError text={errors?.loginId?.message} />
          <Input
            type="password"
            onChange={() => clearErrors("result")}
            register={register("password", {
              required: "password??????????????????????????????",
            })}
            placeholder="password"
          />
          <AuthError text={errors?.password?.message} />
          <AuthError text={errors?.result?.message} />
          <AuthBtn text={loading ? "Loading.." : "????????????"} />
        </AuthForm>
        <DevidedLine text="or" />
        <OtherLogin text="?????????????????????????????????" />
      </AuthTopBox>
      <BottomBox
        text={`Don't you have an account?`}
        link="sign-up"
        linkName="????????????"
      />
    </AuthLayout>
  );
};

export default Login;
