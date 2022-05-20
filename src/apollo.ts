import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

const TOKEN = "token";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
export const displayMonth = makeVar({ month: new Date().getMonth() + 1 });
export const displayYear = makeVar({ year: new Date().getFullYear() });

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
};
export const logUserOut = () => {
  localStorage.removeItem(TOKEN);
  isLoggedInVar(false);
};

export const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});
