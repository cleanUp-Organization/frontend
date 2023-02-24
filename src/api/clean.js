import axios from "axios";

const getBoard = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api`);
  return response.data;
};

const addBoard = async (newBoard) => {
  await axios.post(`${process.env.REACT_APP_SERVER_URL}/api`, newBoard);
};

const deleteBoard = async (id) => {
  await axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/${id}`);
};

export { getBoard, addBoard, deleteBoard };
