import React from "react";
import styled from "styled-components";
import Navbar from "./Navbar";

type Props = {
  children: React.ReactNode;
};
const Content = styled.main`
  max-width: 930px;
  width: 100%;
  margin: 45px auto 0;
`;

const HomeLayout = ({ children }: Props) => {
  return (
    <>
      <Navbar />
      <Content>{children}</Content>
    </>
  );
};

export default HomeLayout;
