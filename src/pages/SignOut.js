import React from "react";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import "../fonts/font.css";

function SignOut() {
  // const [inputs, setInputs] = useState([]);
  const navigate = useNavigate();

  const letsSignout = (e) => {
    //회원탈퇴 버튼을 누르면
    e.preventDefault();
    // 또 한번 창이 뜨는데

    if (window.confirm("정말 탈퇴하시겠습니까?")) {
      // 그때 네를 누르면
      const headers = {
        Authorization: "Bearer " + localStorage.getItem("token"),
      };
      Axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/users/withdrawal`, {
        headers,
      }).then(() => {
        localStorage.removeItem("token");
        alert("회원 탈퇴가 완료되었습니다.");
        navigate("/");
      });
    } else {
      // 창이 뜰 때 아니오를 눌렀으면
      alert("회원 탈퇴에 실패하였습니다.");
    }
  };
  return (
    <Layout>
      <Header></Header>
      <SignoutBox>
        <h2>회원탈퇴</h2>
        <Buttons>
          <Signout onClick={letsSignout}>탈퇴하기</Signout>
        </Buttons>
      </SignoutBox>
    </Layout>
  );
}

export default SignOut;

const SignoutBox = styled.div`
  margin: 0 auto;
  text-align: center;
  margin-top: 100px;
  font-family: "GmarketSansMedium";
`;

const Buttons = styled.div`
  margin: 0 auto;
  margin-top: 30px;
  font-family: "GmarketSansMedium";
`;

const Signout = styled.button`
  border-radius: 5px;
  background-color: black;
  border: none;
  width: 70px;
  height: 40px;
  color: white;
  margin-right: 5px;
  cursor: pointer;
  &:hover {
    background-color: red;
    color: white;
  }
  font-family: "GmarketSansMedium";
`;
