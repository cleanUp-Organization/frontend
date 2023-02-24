import React from "react";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Body from "../components/Body";
import { useQuery } from "react-query";
import { getBoard } from "../api/clean";

function Home() {
  const { data } = useQuery("clean", getBoard);
  return (
    <>
      <Layout>
        <Header>g</Header>
      </Layout>
    </>
  );
}

export default Home;
