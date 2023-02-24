import axios from "axios";

const getBoard = async () => {
  const response = await axios.get(`http://localhost:4000/api`);
  return response.data;
};

const addBoard = async (newBoard) => {
  await axios.post(`http://localhost:4000/api`, newBoard);
};

export { getBoard, addBoard };
