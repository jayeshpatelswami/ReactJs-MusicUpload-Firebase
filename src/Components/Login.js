import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [info, setinfo] = useState({ email: "", password: "" });
  let history = useHistory();

  const handalsubmit = async (e) => {
    e.preventDefault();

    //  const response = await fetch("http://localhost:5000/api/auth/login",{
    //     method:"POST",
    //     headers:{
    //         "Content-Type" : "application/json"
    //     },
    //     body : JSON.stringify({email : info.email , password :info.password})
    //  });
    //  const json = await response.json();

    //  if (json.success) {
    //     localStorage.setItem('token',json.authtoken);
    //     localStorage.setItem('email',info.email);
    // history.push("/home");
    //  }else{
    //     alert("invalid username or password")
    //  }

    if (info.email === "jayesh" && info.password === "patel") {
      localStorage.setItem("token", "jayesh");
      history.push("/home");
    } else {
      alert("Wrong Id Or PassWorD");
    }
  };

  const onchange = (e) => {
    setinfo({ ...info, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="container border border-3 my-5 mainContainer">
        <form onSubmit={handalsubmit}>
          <fieldset>
            <legend>Login</legend>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="text"
                // type="email"
                className="form-control"
                id="email"
                aria-describedby="emailHelp"
                autoComplete="username"
                onChange={onchange}
                value={info.email}
                name="email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                autoComplete="current-password"
                onChange={onchange}
                value={info.password}
                name="password"
              />
            </div>
            <div className="BtnContainer">
              <button type="submit" className="btn btn-primary my-2 ">
                Login
              </button>
            </div>
          </fieldset>
        </form>

        <div className="container mx-3 my-4 baseLinkContainer">
          <Link to="/signup">Don't have an Account,SignUp</Link>
        </div>
      </div>
    </>
  );
};

export default Login;
