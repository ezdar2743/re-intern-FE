import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

const TOKEN = "token";

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
export const nowMonth = makeVar({ month: new Date().getMonth() + 1 });
export const nowYear = makeVar({ year: new Date().getFullYear() });

export const preMonth = () => {
  nowMonth({ month: nowMonth().month - 1 });
  if (nowMonth().month < 1) {
    nowMonth({ month: 12 });
    nowYear({ year: nowYear().year - 1 });
  }
};
export const nextMonth = () => {
  nowMonth({ month: nowMonth().month + 1 });
  if (nowMonth().month > 12) {
    nowMonth({ month: 1 });
    nowYear({ year: nowYear().year + 1 });
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
