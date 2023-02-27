import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Board from "../pages/Board";
import Detail from "../pages/Detail";
import SignUp from "../pages/SignUp";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/api/user/login" element={<Login />} />
        <Route path="/api/user/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/board" element={<Board />} />
        <Route path="/:id" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
