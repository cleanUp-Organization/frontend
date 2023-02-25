import axios from "axios";
import { instance } from "./axios";
import { baseURL } from "./axios";

// const getBoard = async () => {
//   const response = await instance.get("/api/boards");
//   return response.data;
// };
const getBoard = async () => {
  const response = await instance.get("/api");
  return response.data;
};

// const addBoard = async (newBoard) => {
//   await baseURL
//     .post("/api/board", newBoard)
//     .then((response) => {
//       if (response.statusCode === "OK") {
//         alert(response.msg);
//       }
//     })
//     .catch((error) => {
//       if (error.statusCode === "UNAUTHORIZED") {
//         alert(error.msg);
//       }
//     });
// };
const addBoard = async (newBoard) => {
  await baseURL
    .post("/api", newBoard)
    .then((response) => {
      if (response.statusCode === "OK") {
        alert(response.msg);
      }
    })
    .catch((error) => {
      if (error.statusCode === "UNAUTHORIZED") {
        alert(error.msg);
      }
    });
};

// const deleteBoard = async (id) => {
//   await baseURL
//     .delete(`/api/board/${id}`)
//     .then((response) => {
//       if (response.statusCode === "OK") {
//         alert(response.msg);
//       }
//     })
//     .catch((error) => {
//       if (error.statusCode === "UNAUTHORIZED") {
//         alert(error.msg);
//       } else if (error.statusCode === "BAD_REQUEST") {
//         alert(error.msg);
//       }
//     });
// };
const deleteBoard = async (id) => {
  await baseURL
    .delete(`/api/${id}`)
    .then((response) => {
      if (response.statusCode === "OK") {
        alert(response.msg);
      }
    })
    .catch((error) => {
      if (error.statusCode === "UNAUTHORIZED") {
        alert(error.msg);
      } else if (error.statusCode === "BAD_REQUEST") {
        alert(error.msg);
      }
    });
};

// const updateBoard = async (payload) => {
//   await axios.patch(`${process.env.REACT_APP_SERVER_URL}/api/${payload.id}`, {
//     title: payload.title,
//     content: payload.content,
//   });
// };

const updateBoard = async (payload) => {
  await baseURL
    .put(`/api/board/${payload.id}`, {
      title: payload.title,
      // images:payload.img,
      content: payload.content,
    })
    .then((response) => {
      if (response.statusCode === "OK") {
        alert(response.msg);
      }
    })
    .catch((error) => {
      if (error.statusCode === "UNAUTHORIZED") {
        alert(error.msg);
      } else if (error.statusCode === "BAD_REQUEST") {
        alert(error.msg);
      }
    });
};

// const addComment = async (newComment) => {
//   await baseURL.patch(
//     `${process.env.REACT_APP_SERVER_URL}/api/${newComment.target}`,
//     newComment
//   );
// };
const addComment = async (newComment) => {
  await baseURL
    .put(`/api/comment/${newComment.target}`, newComment)
    .then((response) => {
      if (response.statusCode === "OK") {
        alert(response.msg);
      }
    })
    .catch((error) => {
      if (error.statusCode === "UNAUTHORIZED") {
        alert(error.msg);
      }
    });
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
