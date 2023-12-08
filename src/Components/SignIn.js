import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../Redux/actions";
import "./registration.css";

export function mapDispatchToProps(dispatch) {
  return {
    setUser: (data) => dispatch(registerUser(data)),
  };
}

const SignIn = ({ setUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (event) => {
    event.preventDefault();

    const params = new URLSearchParams({ email, password });

    fetch(`http://localhost:5001/users?${params.toString()}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length !== 1) {
          alert("Invalid credentials");
        }

        const user = data[0];
        setUser(data[0]);
        navigate("/home");
        localStorage.setItem("app-user", JSON.stringify(user));
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div className="container">
      <form onSubmit={handleSignIn}>
        <fieldset>
          <div>
            <h1 className="signin">Sign In</h1>
            <hr />
            <label htmlFor="email">
              <b>Email</b>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              className="rect"
              value={email}
              onChange={handleEmailChange}
            />
            <label htmlFor="password">
              <b>Password</b>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              className="rect"
              value={password}
              onChange={handlePasswordChange}
            />
            <input type="submit" value="Sign In" className="my_button" />
            <div>
              <p>
                Don't have an account yet? Register <a href="/">here</a>.
              </p>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default connect(() => {}, mapDispatchToProps)(SignIn);
