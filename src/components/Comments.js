import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getBoard } from "../api/clean";
import { FaCommentDots } from "react-icons/fa";

function Comments() {
  const { id } = useParams();
  const { data } = useQuery("clean", getBoard);
  const target = data?.filter((item) => item.id === id)[0]["comments"];

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
                <NameBox>{item.title}</NameBox>
                <div>{item.content}</div>
              </UserComments>
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
