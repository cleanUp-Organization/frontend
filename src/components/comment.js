import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { addComment, getBoard } from "../api/clean";
import Comments from "./Comments";
import { instance } from "../api/axios";

function Comment() {
  const { id } = useParams();
  const { data } = useQuery("clean", getBoard);
  // const target = data?.filter((item) => item.id === id)[0].commentList;

  //댓글 조회
  const [detail, setDetail] = useState({});
  useEffect(() => {
    const detailBoard = async () => {
      const { data } = await instance.get(`/api/boards/${id}`);
      return data.commentList;
    };
    detailBoard().then((result) => setDetail(result));
  }, [id]);

  const [nickname, setNickname] = useState("");
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation(addComment, {
    onSuccess: () => queryClient.invalidateQueries("clean"),
  });
  const onSubmitHandler = (event) => {
    event.preventDefault();
    const newComment = {
      id: id,
      commentents: [...(detail.commentList || []), { nickname, comment }],
    };
    mutation.mutate(newComment);
    alert("댓글 등록 완료!");
    setNickname("");
    setComment("");
  };
  //   const Count = target.comments.length;
  //   console.log(Count);
  return (
    <div>
      <WrapBox>
        <form onSubmit={onSubmitHandler}>
          <User
            type="text"
            placeholder="이름"
            value={nickname}
            onChange={(event) => {
              setNickname(event.target.value);
            }}
          />
          <CommentInput
            type="text"
            placeholder="댓글"
            value={comment}
            onChange={(event) => {
              setComment(event.target.value);
            }}
          />
          <Button>등록</Button>
        </form>
        {/* <CounterBox>댓글 {Count}</CounterBox> */}
      </WrapBox>
      <div>{detail.contents}</div>
    </div>
  );
}

export default Comment;

const WrapBox = styled.div`
  margin-top: 10px;
  width: 800px;
`;

const Form = styled.form`
  width: 800px;
`;
const CommentInput = styled.input`
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 10px;
  width: 500px;
  margin-right: 10px;
`;

const User = styled.input`
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 10px;
  width: 200px;
  margin-right: 10px;
`;

const Button = styled.button`
  border-radius: 5px;
  background-color: rgb(83, 127, 231);
  border: none;
  width: 55px;
  height: 35px;
  color: white;
  cursor: pointer;
`;

const CounterBox = styled.div`
  color: rgb(83, 127, 231);
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
`;
