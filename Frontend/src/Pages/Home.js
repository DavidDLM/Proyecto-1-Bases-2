import React, { useContext, useEffect, useState } from "react";
import { COUNTER_CONTEXT } from "../App";
import { FetchApi } from "../FetchApi/FetchApi";
import DisplayDocument from "./DisplayDocument/DisplayDocument";
import "./Style.css";

const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    FetchApi({
      method: "GET",
      route: "docs/",
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
      });
  }, []);
  // const { userInfo, setUserInfo } = useContext(COUNTER_CONTEXT);
  // const value = localStorage.getItem("user");

  // setUserInfo(JSON.parse(value));

  return (
    <div className="home mt-5 container">
      <div className="row row-cols-lg-3">
        {data.map((datas) => (
          <DisplayDocument datas={datas} key={datas._id}></DisplayDocument>
        ))}
      </div>
    </div>
  );
};

export default Home;
