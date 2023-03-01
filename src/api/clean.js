import axios from "axios";
import { instance } from "./axios";
import { baseURL } from "./axios";
// import { getCookie } from "./cookie";

// const access_token = getCookie("ACCESS_TOKEN");
// const instance = axios.create({
//   baseURL: `${process.env.REACT_APP_SERVER_URL}`,
//   headers: { Authorization: `Bearer ${access_token}` },
// });

const access_token = localStorage.getItem("token");
const config = {
  headers: {
    Authorization: `Bearer ${access_token}`,
  },
};
console.log(access_token, config);

const getBoard = async () => {
  const response = await instance.get("/api/boards");
  return response.data;
};

// const getBoard = async () => {
//   const response = await instance.get("/api");
//   return response.data;
// };

const addBoard = async (formData) => {
  console.log(formData);
  await baseURL
    .post("/api/boards", formData, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "multipart/form-data",
      },
    })
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
// const addBoard = async (newBoard) => {
//   await baseURL
//     .post("/api", newBoard)
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

const deleteBoard = async (id) => {
  await baseURL
    .delete(`/api/boards/${id}`, config)
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
// const deleteBoard = async (id) => {
//   await baseURL
//     .delete(`/api/${id}`)
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

const updateBoard = async (payload) => {
  console.log(payload);
  await baseURL
    .patch(
      `/api/boards/${payload.id}`,
      {
        title: payload.title,
        imgUrl: payload.imgUrl,
        content: payload.content,
      },

      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    )
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
//     images: payload.images,
//   });
// };

const getComment = async (id) => {
  const response = await instance.get(`/api/comment/${id}`);
  return response.data;
};

const addComment = async (id) => {
  console.log(id);
  await baseURL
    .post(
      `/api/boards/${id.id}/comments`,
      {
        contents: id.contents,
      },
      config
    )
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
  console.log(id);
  await baseURL
    .delete(`/api/boards/comments/${id}`, config)
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
export {
  getBoard,
  addBoard,
  deleteBoard,
  updateBoard,
  addComment,
  deleteComment,
};
