import React, { useState } from "react";
import Header from "../components/Header";
import styled from "styled-components";
import { useMutation, useQueryClient } from "react-query";
import { addBoard } from "../api/clean";
import { useNavigate } from "react-router-dom";
import "../fonts/font.css";

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
  const [imgView, setImgView] = useState([
    "https://cleaningproject.s3.ap-northeast-2.amazonaws.com/static/%EB%8F%99%EA%B7%B8%EB%9D%BC%EB%AF%B8%20%EC%B2%AD%EC%86%8C.png",
  ]);
  const [file, setFile] = useState();
  // "https://cleaningproject.s3.ap-northeast-2.amazonaws.com/static/%EB%8F%99%EA%B7%B8%EB%9D%BC%EB%AF%B8%20%EC%B2%AD%EC%86%8C.png"
  const navigate = useNavigate();

  // 데이터 등록 #1
  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (title.trim() === "" || content.trim() === "" || !file)
      return alert("📷 사진과 글을 입력해주세요!");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("imgUrl", file);
    mutation.mutate(formData);
    alert(`🧹 ${title} 작성 완료!`);
    console.log("작성완료");
    setTitle("");
    setContent("");
    navigate("/main");
  };

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
        <Upbutton onClick={onImgButton}>📷</Upbutton>

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
          placeholder="제목을 입력해주세요 (20자 내외)"
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          maxLength={20}
        />
        <ContentInput
          type="text"
          name="title"
          placeholder="내용을 입력해주세요 (100자 내외)"
          value={content}
          onChange={(event) => {
            setContent(event.target.value);
          }}
          maxLength={200}
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
  font-family: "GmarketSansMedium";
`;

const TitleInput = styled.input`
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid lightgray;
  width: 800px;
  height: 50px;
  color: black;
  padding-left: 15px;
  font-family: "GmarketSansMedium";
  outline: none;
`;

const ContentInput = styled.textarea`
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid lightgray;
  width: 800px;
  height: 200px;
  color: black;
  padding-top: 15px;
  padding-left: 15px;
  font-family: "GmarketSansMedium";
  outline: none;
`;

const Button = styled.button`
  border-radius: 5px;
  background-color: rgb(83, 127, 231);
  border: none;
  width: 100px;
  height: 50px;
  margin: 0px 0px 100px auto;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #0064ff;
    color: white;
  }
  font-family: "GmarketSansMedium";
`;

const Upbutton = styled.button`
  border-radius: 5px;
  background-color: #d2d2d2;
  border: none;
  width: 60px;
  height: 50px;
  margin: 0px 0px 0px 0px;
  color: white;
  font-size: 150%;
  cursor: pointer;
  &:hover {
    background-color: #b4b4b4;
    color: white;
  }
  font-family: "GmarketSansMedium";
`;

const ImgBox = styled.img`
  width: 100%;
  border-radius: 5px;
`;
