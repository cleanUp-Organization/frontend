import React, { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getBoard } from "../api/clean";
import { FaCommentDots } from "react-icons/fa";
import { deleteComment } from "../api/clean";

function Comments() {
  const { id } = useParams();
  const { data } = useQuery("clean", getBoard);
  const target = data?.filter((item) => item.id === id)[0]["comments"];
  console.log(target);
  //삭제
  const queryClient = useQueryClient();
  const mutation = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("clean");
    },
  });
  const deleteHandler = (id) => {
    const message = window.confirm("댓글을 삭제하시겠습니까?");
    if (message) {
      mutation.mutate(id);
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
      <div>
        {target?.map((item) => {
          return (
            <CommentBox key={item.id}>
              <FaCommentDots style={style} />
              <UserComments>
                <NameBox>{item.nickname}</NameBox>
                <div>{item.comment}</div>
              </UserComments>
              <Button onClick={() => deleteHandler(item.id)}>삭제</Button>
            </CommentBox>
          );
        })}
      </div>
    </div>
  );
}

export default Comments;

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

const Button = styled.button`
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
