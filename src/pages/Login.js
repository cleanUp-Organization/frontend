import React from "react";
import Layout from "../components/Layout";
import Header from "../components/Header";
import { useState } from "react";
import axios from "axios";

export default function App() {
  let username = document.querySelector("#username");
  let password = document.querySelector("#password"); //아이디 중복 확인 버튼

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    const nextInputs = { ...inputs, [name]: value };
    setInputs(nextInputs);
  };

  function letsLogin() {
    if (inputs.username === "") {
      alert("아이디를 입력해주세요.");
      return;
    } else if (inputs.password === "false") {
      alert("비밀번호가 틀렸습니다.");
      return;
    } else {
      fetch("http://13.125.211.170:8080/api/user/login", {
        //백엔드랑 협의된 주소 입력

        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          username: inputs.username,
          password: inputs.password,
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          console.log(response.Authorization);
          if (response.statusCode === "OK") {
            // 로그인 성공시
            alert("로그인 성공");

            const { accessToken } = response.data;
            // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
            axios.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${accessToken}`;

            window.localStorage.setItem(
              "Authorization",
              response.Authorization
            );
            window.location.href = "/home";
          } else {
            // 로그인 실패시
            alert("사용자가 존재하지 않습니다.");
          }
        });
    }
  }

  return (
    <Layout>
      <Header></Header>

      <h2>로그인</h2>

      <input
        type="text"
        id="username"
        name="username"
        placeholder="아이디"
        onChange={onChange}
      />

      <input
        type="password"
        id="password"
        name="password"
        placeholder="비밀번호"
        onChange={onChange}
      />

      <input
        type="button"
        className="button medium secondary"
        onClick={letsLogin}
        id="loginBtn"
        value="로그인"
      />
    </Layout>
  );
}
