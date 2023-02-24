import React from "react";
import Layout from "../components/Layout";
import Header from "../components/Header";
import { useQuery } from "react-query";
import { getBoard } from "../api/clean";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function Home() {
  const { data } = useQuery("clean", getBoard);
  const navigate = useNavigate();
  return (
    <>
      <Layout>
        <Header />
        <Nav>프로 살림꾼으로 거듭나는 꿀팁은 여기로🔥</Nav>
        <Wrap>
          {data?.map((item) => {
            return (
              <CleanBox
                key={item.id}
                onClick={() => {
                  navigate(`/${item.id}`);
                }}
              >
                <ImgBox>
                  이미지 박스
                  <Heart>❤︎</Heart>
                </ImgBox>
                <Title>{item.title}</Title>
              </CleanBox>
            );
          })}
        </Wrap>
        <PageBox>
          <Arrow> ◀ </Arrow>
          <Page>●</Page>
          <Page>●</Page>
          <Page>●</Page>
          <Arrow> ▶</Arrow>
        </PageBox>
      </Layout>
    </>
  );
}

export default Home;

const Nav = styled.p`
  margin: 0 auto;
  margin-top: 4.5rem;
  width: 860px;
`;
const Wrap = styled.div`
  width: 860px;
  margin: 0 auto;
  margin-top: 2rem;
  height: 300px;
  display: flex;
  gap: 20px;
`;

const CleanBox = styled.div`
  width: 200px;
  text-align: center;
`;

const Title = styled.div`
  text-align: center;
  margin-top: 10px;
`;

const ImgBox = styled.div`
  width: 200px;
  height: 200px;
  border: 1px solid black;
  position: relative;
`;

const Heart = styled.div`
  width: 20px;
  height: 20px;
  font-size: 25px;
  position: absolute;
  top: 80%;
  left: 80%;
  cursor: pointer;
  &:hover {
    color: rgb(255, 86, 119);
  }
`;

const PageBox = styled.div`
  width: 300px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;

const Arrow = styled.button`
  border: none;
  width: 35px;
  height: 35px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: rgb(83, 127, 231);
    color: white;
  }
`;

const Page = styled.div`
  cursor: pointer;
  font-size: 20px;
`;
