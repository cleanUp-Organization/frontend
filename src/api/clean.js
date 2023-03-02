import { instance } from "./axios";
import { baseURL } from "./axios";

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

const addBoard = async (formData) => {
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

const deleteBoard = async (id) => {
  await baseURL
    .delete(`/api/boards/${id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
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
      } else if (error.statusCode === "BAD_REQUEST") {
        alert(error.msg);
      }
    });
};

const updateBoard = async (payload) => {
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

const getComment = async (id) => {
  const response = await instance.get(`/api/comment/${id}`);
  return response.data;
};

const addComment = async (id) => {
  await baseURL
    .post(
      `/api/boards/${id.id}/comments`,
      {
        username: id.username,
        contents: id.contents,
      },
      config
    )
    .then((response) => {
      console.log(response);
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
