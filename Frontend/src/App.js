import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Pages/Shareable/Header";
import Footer from "./Pages/Shareable/Footer";
import Login from "./Pages/Authentication/Login";
import Register from "./Pages/Authentication/Register";
import AddDocument from "./Pages/AddDocument/AddDocument";
import { createContext, useEffect, useState } from "react";
export const COUNTER_CONTEXT = createContext();

function App() {
  const [userInfo, setUserInfo] = useState({});
  const value = {
    userInfo,
    setUserInfo,
  };

  return (
    <div>
      <COUNTER_CONTEXT.Provider value={value}>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addDocument" element={<AddDocument />} />
        </Routes>
        <Footer></Footer>
      </COUNTER_CONTEXT.Provider>
    </div>
  );
}

export default App;
