import React from "react";
import Layout from "../components/Layout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GiBroom } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";

export default function App() {
  let username = document.querySelector("#username");
  let passwordForm = document.querySelector("#password");
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });

  const onChange = (e) => {
    //input에 name을 가진 요소의 value에 이벤트를 걸었다
    const { name, value } = e.target; // 변수를 만들어 이벤트가 발생했을때의 value를 넣어줬다
    const nextInputs = { ...inputs, [name]: value }; //스프레드 문법으로 기존의 객체를 복사한다.
    setInputs(nextInputs); //만든 변수를 seInput으로 변경해준다.
  };

  function CheckPassid(str) {
    //id 정규식
    let reg1 = /^(?=.*[a-z])(?=.*\d)[a-z\d@$!%*#?&]{4,}$/;
    return reg1.test(str);
  }

  function CheckPass(str) {
    //비밀번호 정규식
    let reg2 = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
    return reg2.test(str);
  }

  function letsJoin() {
    //로그인 유효성 검사
    if (inputs.username === "") {
      alert("아이디를 입력해주세요!");
      username.focus();
      return;
    } else if (CheckPassid(inputs.username) === false) {
      alert("아이디는 4자 이상의 영소문자, 숫자만 가능합니다.");
      username.focus();
      return;
    } else if (inputs.password === "") {
      alert("비밀번호를 입력해주세요!");
      passwordForm.focus();
      return;
    } else if (CheckPass(inputs.password) === false) {
      alert("비밀번호는 8자 이상의 영대소문자, 숫자만 가능합니다.");
      passwordForm.focus();
      return;
    } else {
      fetch("http://13.209.14.99:8080/api/users/signup", {
        //백엔드랑 협의된 주소 입력
        method: "post",
        headers: {
          "content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          username: inputs.username,
          password: inputs.password,
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.statusCode === "OK") {
            alert(response.msg); // alert("정상적으로 회원가입이 완료되었습니다"); 작동 잘 됨.
          } 
          else {
            alert("회원가입에 실패하였습니다.");
          }
        });
      navigate("/");
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
        <h2>회원가입</h2>
        <InputBox>
          <Input
            type="text"
            id="username"
            name="username"
            onChange={onChange}
            placeholder="아이디"
          />

          <Input
            type="password"
            id="password"
            name="password"
            onChange={onChange}
            placeholder="비밀번호"
          />

          {/* <input
        type="button"
        className="button medium primary"
        onClick={letsJoin}
        id="joinBtn"
        value="가입하기"
      /> */}
          <Buttons>
            <Signup onClick={letsJoin}>가입하기</Signup>
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
  padding-left: 330px; 
`;

const Input = styled.input`
  border: 1px solid #eee;
  padding: 20px;
  margin-bottom: 10px;
  outline: none;
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
