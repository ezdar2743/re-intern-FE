import { useReactiveVar } from "@apollo/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { isLoggedInVar } from "../apollo";
import HomeLayout from "../components/homeStyle/HomeLayout";
import Expense from "./pages/Expense";
import Home from "./pages/Home";
import Income from "./pages/Income";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import SignUp from "./pages/SignUp";

const Router = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <HomeLayout>
                <Home />
              </HomeLayout>
            ) : (
              <Login />
            )
          }
        >
          <Route path="/income" element={<Income />}></Route>
          <Route path="/expend" element={<Expense />}></Route>
        </Route>
        {!isLoggedIn && <Route path="sign-up" element={<SignUp />} />}
        <Route path="*" element={<NotFound />} />
        <Route
          path="/editList/:id"
          element={
            <HomeLayout>
              <Home />
            </HomeLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
