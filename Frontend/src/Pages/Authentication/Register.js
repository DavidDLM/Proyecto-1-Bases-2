import React, { useState } from "react";
import { Alert, Nav } from "react-bootstrap";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { FetchApi } from "../../FetchApi/FetchApi";
import "./Authentication.css";
const Register = () => {
  const [showing, setShowing] = useState(false);
  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const isShow = (e) => {
    e.preventDefault();
    setShowing(!showing);
  };
  const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Password Must be same!");
      return;
    }
    if (!form.name) {
      setError("User Must have a name!");
      return;
    }
    if (!form.email) {
      setError("Please enter email!");
      return;
    }

    FetchApi({
      route: "users/signup",
      body: { ...form },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 200) {
          navigate("/login");
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
            {<div className="log-in-header">SignUp Form</div>}
            <form>
              <div className="input-field">
                <input
                  type="text"
                  onChange={(e) => {
                    const newForm = { ...form };
                    newForm["name"] = e.target.value;
                    setForm(newForm);
                  }}
                  required
                />
                <label>Full Name</label>
              </div>
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
                <label>Email</label>
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
              <div className="input-field">
                <input
                  className="password"
                  onChange={(e) => {
                    const newForm = { ...form };
                    newForm["confirmPassword"] = e.target.value;
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
                <label>Confirm Password</label>
              </div>

              {error && (
                <Alert variant="danger">
                  <MdErrorOutline /> {error}
                </Alert>
              )}
              <button
                className="primary-btn login-btn"
                onClick={handleRegister}
                style={{ color: "black" }}
              >
                Register
              </button>
            </form>

            <div className="signup">
              Not a member?
              <span>
                <Nav.Link
                  className="text-center nav-btn"
                  as={HashLink}
                  to="/login"
                >
                  Login Now
                </Nav.Link>
              </span>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Register;
