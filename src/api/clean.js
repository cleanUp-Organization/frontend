import axios from "axios";
import { instance } from "./axios";
import { baseURL } from "./axios";

const getBoard = async () => {
  const response = await instance.get("/api/boards");
  return response.data;
};

const addBoard = async (newBoard) => {
  await instance
    .post("/board", newBoard)
    .then((response) => {
      if (response.statusCode === "ok") {
        alert(response.msg);
      }
    })
    .catch((error) => {
      if (error.statusCode === "UNAUTHORIZED") {
        alert(error.msg);
      }
    });
};

const deleteBoard = async (id) => {
  await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/${id}`);
};

const updateBoard = async (payload) => {
  await axios.patch(`${process.env.REACT_APP_SERVER_URL}/api/${payload.id}`, {
    title: payload.title,
    content: payload.content,
  });
};

const addComment = async (newComment) => {
  await axios.patch(
    `${process.env.REACT_APP_SERVER_URL}/api/${newComment.target}`,
    newComment
  );
};

const deleteComment = async (id) => {
  await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/${id}`);
};
export {
  getBoard,
  addBoard,
  deleteBoard,
  updateBoard,
  addComment,
  deleteComment,
};
