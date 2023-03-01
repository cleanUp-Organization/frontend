import React, { useState } from "react";
import Layout from "../components/Layout";
import Header from "../components/Header";
import { useMutation, useQuery } from "react-query";
import { getBoard } from "../api/clean";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Pagination from "react-js-pagination";

function Home() {
  const { data } = useQuery("clean", getBoard);
  // const { data } = useQuery("clean", getBoard,{
  //   onSuccess:(response) => {
  //     setList(response.data.response)
  //   }
  // });
  const navigate = useNavigate();
  // const [list, setList] = useState([])

  const [page, setPage] = useState(1);
  const [item, setItems] = useState(5);
  const handlerPageChange = (page) => {
    setPage(page);
  };

  return (
    <>
      <Layout>
        <Header />
        <Nav>프로 살림꾼으로 거듭나는 꿀팁은 여기로 🔥</Nav>
        <Wrap>
          {data
            ?.slice(item * (page - 1), item * (page - 1) + item)
            .map((item) => {
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
          <Pagination
            activePage={page}
            itemsCountPerPage={item}
            totalItemsCount={40}
            pageRangeDisplayed={5}
            onChange={handlerPageChange}
          />
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
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  ul.pagination li {
    display: inline-block;
    width: 30px;
    height: 30px;
    border: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }
  ul.pagination li:first-child {
    border-radius: 5px 0 0 5px;
  }
  ul.pagination li:last-child {
    border-radius: 0 5px 5px 0;
  }
  ul.pagination li a {
    text-decoration: none;
    color: #337ab7;
    font-size: 1rem;
  }
  ul.pagination li.active a {
    color: white;
  }
  ul.pagination li.active {
    background-color: #337ab7;
  }
  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: blue;
  }
`;
