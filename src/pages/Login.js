import React from "react";
import Layout from "../components/Layout";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GiBroom } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";

export default function App() {
  let username = document.querySelector("#username");
  let password = document.querySelector("#password"); //아이디 중복 확인 버튼
  const navigate = useNavigate();
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
      fetch("http://13.209.14.99:8080/api/users/login", {
        //백엔드랑 협의된 주소 입력

        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          username: inputs.username,
          password: inputs.password,
          Authorization: inputs.Authorization,
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          // console.log(response.Authorization);
          console.log(response.jwtUtil);
          if (response.statusCode === "OK") {
            // 로그인 성공시
            alert(response.msg); // alert("로그인 성공");
            navigate("/main");
            const accessToken = response.jwtUtil;
            console.log(accessToken);
            // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
            axios.defaults.headers.common["jwtUtil"] = `Bearer ${accessToken}`;

            window.localStorage.setItem(
              "token",
              response.jwtUtil.split(" ")[2]
            );
            // window.location.href = "/";
          } else {
            // 로그인 실패시
            alert("사용자가 존재하지 않습니다.");
          }
        });
    }
  }
  const logoStyle = {
    color: "white",
    width: "60px",
    height: "60px",
    margin: "auto 10px",
  };
  const userStyle = {
    color: "lightgray",
    width: "40px",
    height: "40px",
    margin: "auto 0px",
    cursor: "pointer",
  };

  return (
    <Layout>
      <HeaderBox>
        <div></div>
        <TitleBox>
          <GiBroom style={logoStyle} />
          <Logo>청소 대장</Logo>
        </TitleBox>
        <FaUserCircle style={userStyle} onClick={() => navigate("/board")} />
      </HeaderBox>
      <LoginBox>
        <h2>로그인</h2>
        <InputBox>
          <Input
            type="text"
            id="username"
            name="username"
            placeholder="아이디"
            onChange={onChange}
          />

          <Input
            type="password"
            id="password"
            name="password"
            placeholder="비밀번호"
            onChange={onChange}
          />
          <Buttons>
            <Signup onClick={() => navigate("/signup")}>회원가입</Signup>

            <Login onClick={letsLogin}>로그인</Login>
            {/* <input
              type="button"
              className="button medium secondary"
              onClick={letsLogin}
              id="loginBtn"
              value="로그인"
            /> */}
          </Buttons>
        </InputBox>
      </LoginBox>
    </Layout>
  );
}

const HeaderBox = styled.div`
  width: 100%;
  height: 6rem;
  background-color: rgb(83, 127, 231);
  color: white;
  display: flex;
  justify-content: space-around;
`;
const TitleBox = styled.div`
  display: flex;
`;


const LoginBox = styled.div`
  width: 400px;
  height: 400px;
  margin: 0 auto;
  text-align: center;
  margin-top: 100px; 
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 40px;  
`;

const Buttons = styled.div`
  display: flex;
  margin: 0 auto;
  margin-top: 10px;
  padding-left: 265px; 
`;

const Input = styled.input`
  border: 1px solid #eee;
  padding: 20px;
  margin-bottom: 10px;
  outline: none;
`;

const Login = styled.button`
  border-radius: 5px;
  background-color: rgb(83, 127, 231);
  border: none;
  width: 60px;
  height: 40px;
  color: white;
  margin-right: 5px;
  cursor: pointer;
  &:hover {
    background-color: lightgray;
    color: black;
  }
`;

const Signup = styled.button`
  border-radius: 5px;
  background-color: rgb(83, 127, 231);
  border: none;
  width: 70px;
  height: 40px;
  color: white;
  margin-right: 5px;
  cursor: pointer;
  &:hover {
    background-color: lightgray;
    color: black;
  }
`;

const Logo = styled.h1` 
  margin: auto 0px;
  font-family: "LOTTERIACHAB";
  font-weight: 100;
  font-size: 50px;
`;
