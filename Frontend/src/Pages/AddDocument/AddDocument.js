import React, { useContext, useState } from "react";
import { Alert } from "react-bootstrap";
import { MdErrorOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { COUNTER_CONTEXT } from "../../App";
import { FetchApi } from "../../FetchApi/FetchApi";

const AddDocument = () => {
  // const { userInfo, setUserInfo } = useContext(COUNTER_CONTEXT);
  // const value = localStorage.getItem("user");

  // setUserInfo(JSON.parse(value));
  const [author, setAuthorName] = useState("");
  const [title, settitle] = useState("");
  const [duration, setDuration] = useState("");
  const [likes, setlikes] = useState("");
  const [dislikes, setDislikes] = useState("");
  const [iframe, setIframe] = useState("");
  const [description, setDescription] = useState("");
  let navigate = useNavigate();
  const [error, setError] = useState("");

  const addDocument = (e) => {
    e.preventDefault();
    if (!author || !title || !duration || !likes || !dislikes || !description) {
      setError("Filled All the input");
    } else {
      const form = {
        author,
        title,
        duration,
        likes,
        dislikes,
        iframe,
        description,
      };
      FetchApi({ route: "docs/", body: form })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          data?.msg === "Document Saved Successfully!"
            ? alert(data?.msg)
            : alert("Something wrong Happend please try again");
          navigate("/");
        });
    }
  };
  return (
    <div className="mt-5">
      <>
        <div
          style={{ height: "90vh" }}
          className="d-flex justify-content-center align-items-center"
        >
          <div className="form-container">
            {<div className="log-in-header">Add Document</div>}
            <form>
              <div className="input-field">
                <input
                  type="text"
                  required
                  onChange={(e) => setAuthorName(e.target.value)}
                />
                <label>Author Name</label>
              </div>
              <div className="input-field">
                <input
                  type="text"
                  required
                  onChange={(e) => settitle(e.target.value)}
                />
                <label>title of video</label>
              </div>
              <div className="input-field">
                <input
                  type="number"
                  required
                  onChange={(e) => setDuration(e.target.value)}
                />
                <label>duration</label>
              </div>
              <div className="input-field">
                <input
                  type="number"
                  required
                  onChange={(e) => setlikes(e.target.value)}
                />
                <label>Total likes</label>
              </div>
              <div className="input-field">
                <input
                  type="number"
                  required
                  onChange={(e) => setDislikes(e.target.value)}
                />
                <label>Total Dislikes</label>
              </div>

              {/* <div className="input-field">
                <input
                  type="text"
                  required
                  onChange={(e) => setIframe(e.target.value)}
                />
                <label>Link of video</label>
              </div> */}

              <div className="input-field">
                <input
                  type="text"
                  required
                  onChange={(e) => setDescription(e.target.value)}
                />
                <label>description</label>
              </div>
              {error && (
                <Alert variant="danger">
                  <MdErrorOutline /> {error}
                </Alert>
              )}
              <button onClick={addDocument} className="btn btn-primary">
                Add Document
              </button>
            </form>
          </div>
        </div>
      </>
    </div>
  );
};

export default AddDocument;
