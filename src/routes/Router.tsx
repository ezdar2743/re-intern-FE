import { useReactiveVar } from "@apollo/client";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { isLoggedInVar } from "../apollo";
import HomeLayout from "../components/homeStyle/HomeLayout";
import Home from "./pages/Home";
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
        />
        {!isLoggedIn && <Route path="sign-up" element={<SignUp />} />}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
