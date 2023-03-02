import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import { useMutation, useQueryClient } from "react-query";
import { deleteBoard, updateBoard } from "../api/clean";
import Comment from "../components/comment";
import { instance } from "../api/axios";
import "../fonts/font.css";

function Detail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [detail, setDetail] = useState("");

  //삭제
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteBoard, {
    onSuccess: () => {
      queryClient.invalidateQueries("clean");
    },
  });

  //수정
  const updateMutation = useMutation(updateBoard, {
    onSuccess: () => {
      queryClient.invalidateQueries("clean");
    },
  });

  //상세페이지 조회
  useEffect(() => {
    const detailBoard = async () => {
      const { data } = await instance.get(`/api/boards/${id}`);
      return data;
    };
    detailBoard().then((result) => setDetail(result));
  }, [id]);

  //삭제
  const deleteHandler = (id) => {
    const message = window.confirm("기록을 삭제하시겠습니까?");
    console.log(id);
    if (message) {
      mutation.mutate(id);
      console.log(id);
      navigate("/main");
    } else {
      return;
    }
  };

  //수정
  const [open, setOpen] = useState(false);

  const [updateTitle, setUpdateTitle] = useState("");
  const [updateContent, setUpdateContent] = useState("");
  const [imgView, setImgView] = useState([]);
  const [file, setFile] = useState();

  const onToggle = () => {
    setOpen(!open);
    setImgView(detail.imgUrl);
    setFile(detail.file);
    setUpdateTitle(detail.title);
    setUpdateContent(detail.content);
  };

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

  const updateHandler = (event) => {
    event.preventDefault();
    const message = window.confirm("기록을 수정하시겠습니까?");
    if (!message) {
      return;
    } else {
      const formData = new FormData();
      formData.append("title", updateTitle);
      formData.append("content", updateContent);
      formData.append("imgUrl", file);
      const payload = {
        id: id,
        title: formData.get("title"),
        content: formData.get("content"),
        imgUrl: formData.get("imgUrl"),
      };
      updateMutation.mutate(payload);
      navigate("/main");
      setUpdateTitle("");
      setUpdateContent("");
      setImgView(imgView);
      setFile("");
      setDetail(payload);
      onToggle();
      alert("수정 완료!");
    }
  };

  //좋아요
  const access_token = localStorage.getItem("token");
  const [likeNum, setLikeNum] = useState(0);
  const onLikeHandler = async () => {
    const body = {
      id: id,
    };
    await instance
      .post(`/api/boards/${id}/like`, body, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        if (response.statusCode === "OK") {
          setLikeNum((prev) => prev + 1);
          alert(response.msg);
        }
      })
      .catch((error) => {
        if (error.statusCode === "BAD_REQUEST") {
          alert(error.msg);
        }
      });
    setLikeNum(likeNum);
  };

  return (
    <>
      <Header />
      <Wrap>
        <User>
          <div>작성자 : {detail.username} </div>{" "}
          <div>날짜: {detail.createdAt}</div>
        </User>
        <TitleBox>
          <LikeBox>
            <h3>{detail.title}</h3>
            <NumberOfLikes>{detail.likeNum}</NumberOfLikes>
            <Heart onClick={onLikeHandler}>❤︎</Heart>
          </LikeBox>
          <div>
            <Button onClick={() => deleteHandler(id)}>삭제</Button>
            <Button onClick={onToggle}>수정</Button>
            {open && (
              <UpdateWrap>
                <Background>
                  <UpdateBox>
                    <UpdateForm
                      onSubmit={updateHandler}
                      encType="multipart/form-data"
                    >
                      <Upbutton onClick={onImgButton}>📷</Upbutton>
                      <TitleInput
                        type="text"
                        placeholder={detail.title}
                        value={updateTitle || ""}
                        onChange={(event) => {
                          setUpdateTitle(event.target.value);
                        }}
                      />

                      <div>
                        <ImgBox src={imgView} alt="img" />
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        name="fileUpload"
                        style={{ display: "none" }}
                        ref={fileInput}
                        onChange={onImgHandler}
                      />
                      <ContentInput
                        type="text"
                        placeholder={detail.content}
                        value={updateContent || ""}
                        onChange={(event) => {
                          setUpdateContent(event.target.value);
                        }}
                      />
                      <Buttons>
                        <UpdateButton>수정하기</UpdateButton>
                        <UpdateButton onClick={onToggle}>취소</UpdateButton>
                      </Buttons>
                    </UpdateForm>
                  </UpdateBox>
                </Background>
              </UpdateWrap>
            )}
          </div>
        </TitleBox>
        <img src={detail.imgUrl} alt="img" />
        <p>{detail.content}</p>
        <Line></Line>
        <div>
          <Comment />
        </div>
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
  font-family: "GmarketSansMedium";
`;

const TitleBox = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: "GmarketSansMedium";
`;

const ImgBox = styled.img`
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
  font-family: "GmarketSansMedium";
`;

const UpdateWrap = styled.div`
  position: fixed;
  z-index: 999;
  top: 9rem;
  left: 21rem;
  background-color: white;
  font-family: "GmarketSansMedium";
`;

const Background = styled.div`
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 999;
`;

const LikeBox = styled.div`
  display: flex;
`;

const NumberOfLikes = styled.div`
  display: flex;
  font-size: 20px;
  margin: auto;
  margin-left: 50px;
  margin-right: 10px;
  font-family: "GmarketSansMedium";
`;
const UpdateBox = styled.div`
  position: absolute;
  width: 800px;
  gap: 10px;
  display: flex;
  flex-direction: column;
  font-family: "GmarketSansMedium";
`;

const TitleInput = styled.input`
  border-radius: 5px;
  padding: 20px;
  border: 1px solid lightgray;
  font-family: "GmarketSansMedium";
`;

const ContentInput = styled.textarea`
  border-radius: 5px;
  padding: 20px;
  border: 1px solid lightgray;
  font-family: "GmarketSansMedium";
  outline: none;
`;

const UpdateButton = styled.button`
  border-radius: 5px;
  background-color: rgb(83, 127, 231);
  border: none;
  width: 80px;
  height: 40px;
  color: white;
  margin-right: 5px;
  cursor: pointer;
  font-family: "GmarketSansMedium";
`;

const Buttons = styled.div`
  display: flex;
`;

const User = styled.div`
  font-size: 11px;
  margin-bottom: 8px;
  color: blue;
  text-align: left;
  display: flex;
  gap: 500px;
  justify-content: space-between;
  font-family: "KyoboHandwriting2021sjy";
  font-size: 13px;
`;

const Heart = styled.div`
  font-size: 25px;
  color: black;
  margin: auto;
  cursor: pointer;
  &:hover {
    color: rgb(255, 86, 119);
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
`;

const UpdateForm = styled.form`
  position: absolute;
  width: 800px;
  gap: 10px;
  display: flex;
  flex-direction: column;
`;
