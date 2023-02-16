import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { COUNTER_CONTEXT } from "../../App";
import { FetchApi } from "../../FetchApi/FetchApi";
import img from "../../image/youtube.jpg";

const DisplayDocument = (props) => {
  let navigate = useNavigate();
  const { _id, author, description, duration, iframe, title, reactions } =
    props.datas;
  const { userInfo, setUserInfo } = useContext(COUNTER_CONTEXT);

  return (
    <div className="mb-2">
      <div class="card h-100">
        <img src={img} class="card-img-top img-fluid" alt="..." />
        <div class="card-body">
          <h5 class="card-title"> {title}</h5>
          <h5>Author Name: {author}</h5>
          <p class="card-text">{description}</p>
          <p class="card-text">Duration : {duration}</p>
          <div class="card-text mb-3 d-flex justify-content-between">
            <span>Total Like: {reactions?.likes}</span>
            <span>Total DisLike: {reactions?.dislikes}</span>
          </div>
          {userInfo?.role === "admin" ? (
            <button
              className="btn btn-danger"
              onClick={() => {
                FetchApi({
                  method: "DELETE",
                  route: `docs/${_id}`,
                })
                  .then((res) => res.json())
                  .then((data) => {
                    console.log(data);
                    alert("Deleted Successfully");
                  });
              }}
            >
              Delete
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default DisplayDocument;
