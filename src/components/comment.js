import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { addComment, getBoard } from "../api/clean";
import Comments from "./Comments";

function Comment() {
  const { id } = useParams();
  const { data } = useQuery("clean", getBoard);
  const target = data?.filter((item) => item.id === id)[0];
  const [title, setCommentTitle] = useState("");
  const [content, setCommentContent] = useState("");
  const queryClient = useQueryClient();
  const mutation = useMutation(addComment, {
    onSuccess: () => queryClient.invalidateQueries("clean"),
  });
  const onSubmitHandler = (event) => {
    event.preventDefault();
    const newComment = {
      target: id,
      comments: [...(target.comments || []), { title, content }],
    };
    mutation.mutate(newComment);
    alert("댓글 등록 완료!");
    setCommentTitle("");
    setCommentContent("");
  };

  return (
    <div>
      <WrapBox>
        <form onSubmit={onSubmitHandler}>
          <User
            type="text"
            placeholder="이름"
            value={title}
            onChange={(event) => {
              setCommentTitle(event.target.value);
            }}
          />
          <CommentInput
            type="text"
            placeholder="댓글"
            value={content}
            onChange={(event) => {
              setCommentContent(event.target.value);
            }}
          />
          <Button>등록</Button>
        </form>
        <CounterBox>댓글 {target.comments.length}</CounterBox>
      </WrapBox>
      <Comments />
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
