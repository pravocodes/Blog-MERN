import axios from "axios";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import registerstyle from "./Register.module.css";

function Register() {
  const [name, setname] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/auth/register`, {
        name,
        email,
        password,
        phone,
        answer,
      });
      if (res && res.data && res.data.success) {
        console.log("register successfully");
        navigate("/login");
      } else {
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);
      console.log("Something went Wrong");
    }
  };

  return (
    <div className={registerstyle.main}>
      <div className={registerstyle.register}>
        <form>
          <h1>Register</h1>
          <input
            type="text"
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
          <input
            type="Password"
            placeholder="Enter Password"
            required
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email Address"
            required
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />

          <input
            type="number"
            className="no-arrow"
            placeholder="Phone Number"
            required
            value={phone}
            onChange={(e) => setphone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Forgot password key"
            required
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
          <input
            className={registerstyle.button_common}
            type="submit"
            value="Register"
            onClick={handlesubmit}
          ></input>
        </form>
        <NavLink to="/login">Already registered? Login</NavLink>
      </div>
    </div>
  );
}

export default Register;
