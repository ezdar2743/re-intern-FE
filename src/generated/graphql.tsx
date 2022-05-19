import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreateResult = {
  __typename?: "CreateResult";
  error?: Maybe<Scalars["String"]>;
  ok: Scalars["Boolean"];
};
export type CreateAccountMutation = {
  __typename?: "Mutation";
  createAccount: {
    __typename?: "CreateResult";
    ok: boolean;
    error?: any;
  };
};

export type LoginResult = {
  __typename?: "LoginResult";
  error?: Maybe<Scalars["String"]>;
  ok: Scalars["Boolean"];
  token?: Maybe<Scalars["String"]>;
};

export type MoneyList = {
  __typename?: "MoneyList";
  amount: Scalars["Int"];
  date: Scalars["String"];
  id: Scalars["Int"];
  month: Scalars["Int"];
  title: Scalars["String"];
  year: Scalars["Int"];
  day?: Scalars["Int"];
};

export type Mutation = {
  __typename?: "Mutation";
  createAccount?: Maybe<CreateResult>;
  createMoney: MutationResult;
  deleteMoney: MutationResult;
  editMoney: MutationResult;
  login: LoginResult;
};

export type MutationCreateAccountArgs = {
  email: Scalars["String"];
  loginId: Scalars["String"];
  name: Scalars["String"];
  password: Scalars["String"];
};

export type MutationCreateMoneyArgs = {
  amount: Scalars["Int"];
  date: Scalars["String"];
  month: Scalars["Int"];
  title: Scalars["String"];
  year: Scalars["Int"];
};

export type MutationDeleteMoneyArgs = {
  id: Scalars["Int"];
};

export type MutationEditMoneyArgs = {
  amount?: InputMaybe<Scalars["Int"]>;
  date?: InputMaybe<Scalars["String"]>;
  id: Scalars["Int"];
  month?: InputMaybe<Scalars["Int"]>;
  title?: InputMaybe<Scalars["String"]>;
  year?: InputMaybe<Scalars["Int"]>;
};

export type MutationLoginArgs = {
  loginId: Scalars["String"];
  password: Scalars["String"];
  result: string;
};

export type MutationResult = {
  __typename?: "MutationResult";
  error?: Maybe<Scalars["String"]>;
  ok: Scalars["Boolean"];
};

export type Query = {
  __typename?: "Query";
  currentUser?: Maybe<User>;
  viewMoney: Array<MoneyList>;
};

export type QueryViewMoneyArgs = {
  month?: InputMaybe<Scalars["Int"]>;
  year: Scalars["Int"];
};

export type User = {
  __typename?: "User";
  createdAt: Scalars["String"];
  email: Scalars["String"];
  id: Scalars["Int"];
  loginId: Scalars["String"];
  moneyLists: Array<MoneyList>;
  name: Scalars["String"];
};

export type LoginMutationVariables = Exact<{
  loginId: Scalars["String"];
  password: Scalars["String"];
}>;

export type LoginMutation = {
  __typename?: "Mutation";
  login: {
    __typename?: "LoginResult";
    ok: boolean;
    token?: string | null;
    error?: any;
  };
};

export const LoginDocument = gql`
  mutation login($loginId: String!, $password: String!) {
    login(loginId: $loginId, password: $password) {
      ok
      token
      error
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginId: // value for 'loginId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
