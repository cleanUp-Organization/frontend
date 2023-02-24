import React, { useState } from "react";
import Header from "../components/Header";
import styled from "styled-components";
import { useMutation, useQueryClient } from "react-query";
import { addBoard } from "../api/clean";

function Board() {
  //랜덤 아이디 생성
  const makeId = () => {
    return Math.random().toString(36).substring(2, 16);
  };
  const id = makeId();

  //데이터 조회
  const queryClient = useQueryClient();
  const mutation = useMutation(addBoard, {
    onSuccess: () => {
      queryClient.invalidateQueries("clean");
    },
  });
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  //데이터 등록
  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (title.trim() === "" || content.trim() === "")
      return alert("빈칸을 채워주세요!");
    const newBoard = {
      id: id,
      title: title,
      content: content,
    };
    mutation.mutate(newBoard);
    alert(`🧹 ${title} 작성 완료!`);
    setTitle("");
    setContent("");
  };
  return (
    <>
      <Header />
      <FormBox onSubmit={onSubmitHandler}>
        {/* <input placeholder="이미지" /> */}
        <TitleInput
          type="text"
          name="title"
          placeholder="제목을 입력해주세요(20자 내외)"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          maxLength={20}
        />
        <ContentInput
          type="text"
          name="title"
          placeholder="내용을 입력해주세요(100자 내외)"
          value={content}
          onChange={(event) => {
            setContent(event.target.value);
          }}
          maxLength={100}
        />
        <Button>작성</Button>
      </FormBox>
    </>
  );
}

export default Board;

const FormBox = styled.form`
  margin: 0 auto;
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  width: 800px;
  gap: 10px;
`;

const TitleInput = styled.input`
  border-radius: 5px;
  padding: 20px;
  border: 1px solid lightgray;
`;

const ContentInput = styled.textarea`
  border-radius: 5px;
  padding: 20px;
  border: 1px solid lightgray;
  height: 200px;
`;

const Button = styled.button`
  border-radius: 5px;
  background-color: rgb(83, 127, 231);
  border: none;
  width: 100px;
  height: 50px;
  margin: 0px 0px 0px auto;
  color: white;
`;
