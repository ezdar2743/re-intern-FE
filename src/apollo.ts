import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
const TOKEN = "token";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
export const displayMonth = makeVar({ month: new Date().getMonth() + 1 });
export const displayYear = makeVar({ year: new Date().getFullYear() });
export const openAddModalVar = makeVar(false);
export const preMonth = () => {
  displayMonth({ month: displayMonth().month - 1 });
  if (displayMonth().month < 1) {
    displayMonth({ month: 12 });
    displayYear({ year: displayYear().year - 1 });
  }
};
export const nextMonth = () => {
  displayMonth({ month: displayMonth().month + 1 });
  if (displayMonth().month > 12) {
    displayMonth({ month: 1 });
    displayYear({ year: displayYear().year + 1 });
  }
};
export const logUserIn = (token: string) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
  window.location.reload();
};
export const logUserOut = () => {
  localStorage.removeItem(TOKEN);
  isLoggedInVar(false);
};

export const addClicked = () => {
  openAddModalVar(true);
};
export const confirmAdd = () => {
  openAddModalVar(false);
};

const httpLink = createHttpLink({
  uri: "http://localhost:4000",
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token,
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
