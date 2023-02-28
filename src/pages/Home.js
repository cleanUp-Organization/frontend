import React, { useState } from "react";
import Layout from "../components/Layout";
import Header from "../components/Header";
import { useMutation, useQuery } from "react-query";
import { getBoard } from "../api/clean";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

function Home() {
  const { data } = useQuery("clean", getBoard);
  // const { data } = useQuery("clean", getBoard,{
  //   onSuccess:(response) => {
  //     setList(response.data.response)
  //   }
  // });
  const navigate = useNavigate();
  // const [list, setList] = useState([])
  return (
    <>
      <Layout>
        <Header />
        <Nav>프로 살림꾼으로 거듭나는 꿀팁은 여기로 🔥</Nav>
        <Wrap>
          {data?.map((item) => {
            return (
              <CleanBox>
                <ImgBox>
                  <ImgView src={item.imgUrl} alt="img" />
                  <Count>1</Count>
                  <Heart>❤︎</Heart>
                </ImgBox>
                <Title
                  key={item.id}
                  onClick={() => {
                    navigate(`/main/${item.id}`);
                  }}
                >
                  {item.title}
                </Title>
              </CleanBox>
            );
          })}
        </Wrap>
        <PageBox>
          <Arrow> ◀ </Arrow>
          <Page>1</Page>
          <Page>2</Page>
          <Page>3</Page>
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
  width: 870px;
`;
const Wrap = styled.div`
  width: 870px;
  margin: 0 auto;
  margin-top: 2rem;
  height: 300px;
  display: flex;
  gap: 20px;
  overflow: hidden;
`;

const CleanBox = styled.div`
  width: 200px;
  text-align: center;
`;

const Title = styled.div`
  text-align: center;
  margin-top: 10px;
  cursor: pointer;
`;

const ImgBox = styled.div`
  width: 200px;
  height: 200px;
  position: relative;
  background-color: lightgray;
`;

const ImgView = styled.img`
  width: 200px;
  height: 200px;
`;

const Count = styled.div`
  position: absolute;
  top: 83%;
  left: 74%;
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
  font-size: 15px;
  margin: auto 0;
`;
