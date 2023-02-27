import React from "react";
import Layout from "../components/Layout";
import Header from "../components/Header";
import { useState } from "react";
import { instance } from "../api/axios";

export default function App() {
  let loginid = document.querySelector("#loginid");
  let passwordForm = document.querySelector("#password");
  let re_passwordForm = document.querySelector("#re_password");

  const [inputs, setInputs] = useState({
    loginid: "",
    password: "",
    re_password: "",
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
    if (inputs.loginid === "") {
      alert("아이디를 입력해주세요!");
      loginid.focus();
      return;
    } else if (CheckPassid(inputs.loginid) === false) {
      alert("아이디는 4자 이상의 영소문자, 숫자만 가능합니다.");
      loginid.focus();
      return;
    } else if (inputs.password === "") {
      alert("비밀번호를 입력해주세요!");
      passwordForm.focus();
      return;
    } else if (inputs.re_password === "") {
      alert("비밀번호 중복 확인을 입력해주세요!");
      re_passwordForm.focus();
      return;
    } else if (CheckPass(inputs.password) === false) {
      alert("비밀번호는 8자 이상의 영대소문자, 숫자만 가능합니다.");
      passwordForm.focus();
      return;
    } else if (inputs.re_password !== inputs.password) {
      alert("비밀번호가 동일하지 않습니다!");
      re_passwordForm.focus();
      return;
    } else {
      fetch("/api/signup", {
        //백엔드랑 협의된 주소 입력
        method: "post",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          loginid: inputs.loginid,
          password: inputs.password,
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.statusCode === "OK") {
            alert("정상적으로 회원가입이 완료되었습니다");
            // window.location.replace("/백엔드랑 협의된 주소");
          } else {
            alert("회원가입에 실패하였습니다.");
          }
        });
    }
  }

  return (
    <Layout>
      <Header></Header>

      <h2>회원가입</h2>

      <input
        type="text"
        id="loginid"
        name="loginid"
        onChange={onChange}
        placeholder="아이디"
      />

      <input
        type="password"
        id="password"
        name="password"
        onChange={onChange}
        placeholder="비밀번호"
      />

      <input
        type="password"
        id="re_password"
        name="re_password"
        onChange={onChange}
        placeholder="비밀번호 확인"
      />

      <input
        type="button"
        className="button medium primary"
        onClick={letsJoin}
        id="joinBtn"
        value="가입하기"
      />
    </Layout>
  );
}
