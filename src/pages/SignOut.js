import React from "react";
import Layout from "../components/Layout";
import Header from "../components/Header";
import { useState } from "react";

export default function App() {
  const [inputs, setInputs] = useState([]);

  const letsSignout = (e) => { //회원탈퇴 버튼을 누르면
    e.preventDefault();
    // 또 한번 창이 뜨는데
    
    if (window.confirm('정말 탈퇴하시렵니까??')) {  // 그때 네를 누르면
      axios.delete(
          `${process.env.REACT_APP_SERVER_URL}/users/${username}`,
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token'),
            },
            body: {
                username: inputs.username,
                password: inputs.password,
            }
          }
        )
        .then(() => {
          alert('회원 탈퇴가 완료되었습니다.');
          navigate("/");
        })
      localStorage.removeItem("token")
    } 
    else {
        // 창이 뜰 때 아니오를 눌렀으면
        alert('회원 탈퇴에 실패하였습니다.');
    }
        return (
            <Layout>
              <Header></Header>
              <h2>회원 탈퇴</h2>

              <input
                type="text"
                id="username"
                name="username"
                onChange={onChange}
                placeholder="아이디"
                required
              />

              <input
                type="password"
                id="password"
                name="password"
                onChange={onChange}
                placeholder="비밀번호"
                required
              />

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
}