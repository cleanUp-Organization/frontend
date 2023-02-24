import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Header from "../components/Header";
import { useMutation, useQueryClient } from "react-query";
import { deleteBoard } from "../api/clean";

function Detail() {
  const { id } = useParams();
  const [detail, setDetail] = useState({});
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteBoard, {
    onSuccess: () => {
      queryClient.invalidateQueries("clean");
    },
  });

  //상세페이지 조회
  useEffect(() => {
    const detailBoard = async () => {
      const { data } = await axios.get(`http://localhost:4000/api/${id}`);
      return data;
    };
    detailBoard().then((result) => setDetail(result));
  }, [id]);

  //삭제
  const deleteHandler = (id) => {
    const message = window.confirm("기록을 삭제하시겠습니까?");
    if (message) {
      mutation.mutate(id);
      navigate("/");
    } else {
      return;
    }
  };

  return (
    <>
      <Header />
      <Wrap>
        <TitleBox>
          <h3>{detail.title}</h3>
          <div>
            <Button onClick={() => deleteHandler(detail.id)}>삭제</Button>
            <Button>수정</Button>
          </div>
        </TitleBox>
        <ImgBox>이미지 박스</ImgBox>
        <p>{detail.content}</p>
        <Line></Line>
      </Wrap>
    </>
  );
}

export default Detail;

const Wrap = styled.div`
  margin: 0 auto;
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  width: 800px;
  gap: 10px;
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ImgBox = styled.div`
  width: 800px;
  height: 300px;
  background-color: lightgray;
  text-align: center;
  line-height: 300px;
`;

const Line = styled.div`
  width: 800px;
  height: 1px;
  background-color: lightgray;
`;

const Button = styled.button`
  border-radius: 5px;
  background-color: rgb(83, 127, 231);
  border: none;
  width: 55px;
  height: 35px;
  color: white;
  margin-right: 5px;
  cursor: pointer;
`;
