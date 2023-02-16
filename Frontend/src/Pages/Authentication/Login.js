import React, { useContext, useState } from "react";
import { Alert, Nav } from "react-bootstrap";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { COUNTER_CONTEXT } from "../../App";
import { FetchApi } from "../../FetchApi/FetchApi";
import "./Authentication.css";
const Login = () => {
  const { userInfo, setUserInfo } = useContext(COUNTER_CONTEXT);
  const [showing, setShowing] = useState(false);
  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const isShow = (e) => {
    e.preventDefault();
    setShowing(!showing);
  };
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    FetchApi({
      route: "users/login",
      body: { ...form },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(200);
        if (data.status === 200) {
          const { name, role, email, accessToken } = data;
          const user = {
            name,
            role,
            email,
            accessToken,
          };
          console.log(data);
          localStorage.setItem("accessToken", data?.accessToken);
          localStorage.setItem("user", JSON.stringify(user));
          setUserInfo(user);
          //console.log(userInfo);
          // if (role === "admin") {
          //   navigate("/dashboard");
          // } else {
          //   navigate("/");
          // }
          navigate("/");
        } else {
          const err = data.msg
            ? data.msg
            : data.message
            ? data.message
            : "There is a error. Try again!";
          setError(err);
        }
      })
      .catch((e) => {
        const err = e.msg
          ? e.msg
          : e.message
          ? e.message
          : "There is a error. Try again!";
        setError(err);
      });
  };

  return (
    <div>
      <>
        <div
          style={{ height: "90vh" }}
          className="d-flex justify-content-center align-items-center"
        >
          <div className="form-container">
            {<div className="log-in-header">LogIn Form</div>}
            <form>
              <div className="input-field">
                <input
                  type="email"
                  onChange={(e) => {
                    const newForm = { ...form };
                    newForm["email"] = e.target.value;
                    setForm(newForm);
                  }}
                  required
                />
                <label>Email or Username</label>
              </div>
              <div className="input-field">
                <input
                  className="password"
                  onChange={(e) => {
                    const newForm = { ...form };
                    newForm["password"] = e.target.value;
                    setForm(newForm);
                  }}
                  type={showing ? "text" : "password"}
                  required
                />
                <span className="show">
                  <button onClick={isShow}>
                    {showing ? <FaRegEyeSlash /> : <FaRegEye />}
                  </button>
                </span>
                <label>Password</label>
              </div>

              {error && (
                <Alert variant="danger">
                  <MdErrorOutline /> {error}
                </Alert>
              )}
              <button className="primary-btn login-btn" onClick={handleLogin}>
                Log In
              </button>
            </form>

            <div className="signup">
              Not a member?
              <span>
                <Nav.Link
                  className="text-center nav-btn"
                  as={HashLink}
                  to="/Register"
                >
                  signup Now
                </Nav.Link>
              </span>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Login;
