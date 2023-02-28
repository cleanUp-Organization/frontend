import React from "react";
import styled from "styled-components";
import { GiBroom } from "react-icons/gi";
import { FaUserCircle } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function Header() {
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
  const homeStyle = {
    color: "white",
    width: "30px",
    height: "30px",
    margin: "auto 0px",
    cursor: "pointer",
  };
  const navigate = useNavigate();
  return (
    <HeaderBox>
      <AiFillHome
        style={homeStyle}
        onClick={() => {
          navigate("/main");
        }}
      />
      <TitleBox>
        <GiBroom style={logoStyle} />
        <Logo>청소 대장</Logo>
      </TitleBox>
      <FaUserCircle style={userStyle} onClick={() => navigate("/board")} />
    </HeaderBox>
  );
}

export default Header;

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
const Logo = styled.h1`
  margin: auto 0px;
`;
