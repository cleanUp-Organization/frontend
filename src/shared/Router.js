import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Board from "../pages/Board";
import Detail from "../pages/Detail";
import SignUp from "../pages/SignUp";
import SignOut from "../pages/SignOut";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signout" element={<SignOut />} />
        <Route path="/main" element={<Home />} />
        <Route path="/board" element={<Board />} />
        <Route path="/main/:id" element={<Detail />} />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/board" element={<Board />} />
        <Route path="/:id" element={<Detail />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
