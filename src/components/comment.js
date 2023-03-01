import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { addComment, deleteComment, getBoard } from "../api/clean";
import { instance } from "../api/axios";
import { FaCommentDots } from "react-icons/fa";

function Comment() {
  const { id } = useParams();

  //댓글 조회
  const [detail, setDetail] = useState({});
  const getComment = async () => {
    const data = await instance.get(`/api/boards/${id}`);
    return data;
  };
  const { data } = useQuery("clean", getComment, {
    onSuccess: (response) => {
      setDetail(response.data.commentList.reverse());
    },
  });
  // const [nickname, setNickname] = useState("");
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();

  //댓글 추가
  const mutation = useMutation(addComment, {
    onSuccess: () => queryClient.invalidateQueries("clean"),
  });

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const newComment = {
      id: id,
      contents: comment,
    };
    mutation.mutate(newComment);
    alert("댓글 등록 완료!");
    // setNickname("");
    setComment("");
    setDetail([...detail, newComment]);
    console.log(detail);
  };

  //댓글 삭제
  const delMutation = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("clean");
    },
  });
  const commentDeleteHandler = (id) => {
    const message = window.confirm("댓글을 삭제하시겠습니까?");
    if (message) {
      delMutation.mutate(id);
      setDetail([...detail]);
    } else {
      return;
    }
  };
  const style = {
    width: "20px",
    height: "20px",
  };
  return (
    <div>
      <WrapBox>
        <form onSubmit={onSubmitHandler}>
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
      </WrapBox>
      <CommentBox>
        {detail.length > 0 &&
          detail.map((item) => {
            return (
              <CommentBox key={item.id}>
                <FaCommentDots style={style} />
                <UserComments>
                  <NameBox>{item.username}</NameBox>
                  <div>{item.contents}</div>
                </UserComments>
                <DButton onClick={() => commentDeleteHandler(item.id)}>
                  삭제
                </DButton>
              </CommentBox>
            );
          })}
      </CommentBox>
    </div>
  );
}

export default Comment;

const WrapBox = styled.div`
  margin-top: 10px;
  width: 800px;
`;

const CommentInput = styled.input`
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 5px;
  margin-bottom: 10px;
  width: 720px;
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

const CommentBox = styled.div`
  display: flex;
  margin-top: 10px;
  width: 800px;
  gap: 10px;
  position: relative;
`;

const UserComments = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  line-height: 15px;
  gap: 10px;
  margin-bottom: 10px;
`;

const NameBox = styled.div`
  font-size: 20px;
  font-weight: 600;
`;

const DButton = styled.button`
  border-radius: 5px;
  background-color: rgb(83, 127, 231);
  border: none;
  width: 55px;
  height: 35px;
  color: white;
  cursor: pointer;
  position: absolute;
  right: 0;
`;
