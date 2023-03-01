import React from "react";
import Layout from "../components/Layout";
import Header from "../components/Header";
// import { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

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
      <h2>회원 탈퇴</h2>

      <input
        type="button"
        className="button medium primary"
        onClick={letsSignout}
        id="signoutBtn"
        value="탈퇴하기"
      />
    </Layout>
  );
}

export default SignOut;
