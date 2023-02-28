import React, { useState } from "react";
import Header from "../components/Header";
import styled from "styled-components";
import { useMutation, useQueryClient } from "react-query";
import { addBoard } from "../api/clean";
import { useNavigate } from "react-router-dom";
import { type } from "@testing-library/user-event/dist/type";
import axios from "axios";
import { useDispatch } from "react-redux";
import { write } from "../redux/modules/slice";

function Board() {
  //데이터 조회
  const queryClient = useQueryClient();
  const mutation = useMutation(addBoard, {
    onSuccess: () => {
      queryClient.invalidateQueries("clean");
    },
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imgView, setImgView] = useState([]);
  const [file, setFile] = useState();
  const navigate = useNavigate();

  // 데이터 등록 #1
  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (title.trim() === "" || content.trim() === "")
      return alert("빈칸을 채워주세요!");
    // const newBoard = {
    //   // username:username,
    //   title: title,
    //   content: content,
    //   images: imgView,
    // };
    // mutation.mutate(newBoard);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("imgUrl", file);
    // const newBoard = [
    //   {
    //     title: formData.append("title", title),
    //     content: formData.append("content", content),
    //   },
    // ];
    // formData.append(
    //   "data",
    //   new Blob([JSON.stringify(newBoard)], { type: "application/json" })
    // );
    // console.log(
    //   formData.get("title"),
    //   formData.get("content"),
    //   formData.get("file")
    // );
    mutation.mutate(formData);
    alert(`🧹 ${title} 작성 완료!`);
    setTitle("");
    setContent("");
    navigate("/main");
  };

  // 데이터등록 #2
  // const onSubmitHandler = (event) => {
  //   event.preventDefault();
  //   if (title.trim() === "" || content.trim() === "")
  //     return alert("빈칸을 채워주세요!");
  //   // const newBoard = {
  //   //   // username:username,
  //   //   title: title,
  //   //   content: content,
  //   //   images: imgView,
  //   // };
  //   // mutation.mutate(newBoard);
  //   const formData = new FormData();
  //   // formData.append("title", title);
  //   // formData.append("content", content);
  //   // formData.append("imgUrl", file);
  //   formData.append("file", file);
  //   formData.append("title", title);
  //   formData.append("content", content);
  //   axios.post("http://13.125.211.170:8080/api/board", formData, {
  //     headers: {
  //       "Contest-Type": "multipart/form-data",
  //     },
  //   });
  //   console.log(
  //     formData.get("title"),
  //     formData.get("content"),
  //     formData.get("file")
  //   );
  //   // mutation.mutate(formData);
  //   alert(`🧹 ${title} 작성 완료!`);
  //   setTitle("");
  //   setContent("");
  //   navigate("/main");
  // };

  // // 데이터 등록 #4
  // const onSubmitHandler = (event) => {
  //   event.preventDefault();
  //   if (title.trim() === "" || content.trim() === "")
  //     return alert("빈칸을 채워주세요!");
  //   const formData = new FormData();
  //   formData.append("images", imgView[0]);
  //   const newBoard = [
  //     {
  //       title: formData.append("title", title),
  //       content: formData.append("content", content),
  //     },
  //   ];
  //   formData.append(
  //     "data",
  //     new Blob([JSON.stringify(newBoard)], { type: "application/json" })
  //   );
  //   mutation.mutate(formData);
  //   console.log(formData.get("data"));
  //   alert(`🧹 ${title} 작성 완료!`);
  //   setTitle("");
  //   setContent("");
  //   navigate("/");
  // };

  //이미지 구현
  const fileInput = React.useRef(null);
  const onImgButton = (event) => {
    event.preventDefault();
    fileInput.current.click();
  };
  const onImgHandler = (event) => {
    setImgView([]);
    for (let i = 0; i < event.target.files.length; i++) {
      if (event.target.files[i]) {
        setFile(event.target.files[i]);
        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onloadend = () => {
          const base = reader.result;
          if (base) {
            const baseSub = base.toString();
            setImgView((imgView) => [...imgView, baseSub]);
          }
        };
      }
    }
  };

  return (
    <>
      <Header />
      <FormBox onSubmit={onSubmitHandler}>
        <button onClick={onImgButton}>파일 업로드</button>
        <div>
          {imgView.map((item) => {
            return <ImgBox src={item} alt="img" />;
          })}
        </div>
        <input
          type="file"
          accept="image/*"
          id="fileUpload"
          style={{ display: "none" }}
          ref={fileInput}
          onChange={onImgHandler}
        />
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
  cursor: pointer;
`;

const ImgBox = styled.img`
  width: 800px;
  height: 200px;
`;
