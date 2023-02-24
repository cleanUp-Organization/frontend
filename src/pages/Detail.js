import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Header from "../components/Header";
import { useQueryClient } from "react-query";

function Detail() {
  const { id } = useParams();
  const [detail, setDetail] = useState({});
  const queryClient = useQueryClient();

  useEffect(() => {
    const detailBoard = async () => {
      const { data } = await axios.get(`http://localhost:4000/api/${id}`);
      return data;
    };
    detailBoard().then((result) => setDetail(result));
  }, [id]);

  return (
    <>
      <Header />
      <div>{detail.title}</div>
    </>
  );
}

export default Detail;
