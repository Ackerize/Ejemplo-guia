import axios from "axios";
import React, { useState } from "react";
import Admin from "../components/Admin";
import Empleado from "../components/Empleado";
import Empresa from "../components/Empresa";
import Estudiante from "../components/Estudiante";
import Gestor from "../components/Gestor";
import { API_HOST } from "../utils/constantes";

const Login = () => {
  const [emailText, setEmailText] = useState("");
  const [passwordText, setPasswordText] = useState("");
  const [userType, setUserType] = useState(null);

  const onChange = (e, type) => {
    switch (type) {
      case "email":
        setEmailText(e.target.value);
        break;
      case "password":
        setPasswordText(e.target.value);
      default:
        break;
    }
  };

  const onSendData = () => {
    const data = {
      email: emailText,
      password: passwordText,
    };
    axios.post(`${API_HOST}/login`, data).then((response) => {
      setUserType(response.data.type);
    });
  };

  const componentToRender = (type) => {
    switch (type) {
      case "manager":
        return <Gestor />;
      case "admin":
        return <Admin />;
      case "student":
        return <Estudiante />;
      case "employee":
        return <Empleado />;
      case "company":
        return <Empresa />;
    }
  };

  return (
    <>
      {userType === null ? (
        <div>
          <label htmlFor="uname">
            <b>Email</b>
          </label>
          <input
            type="email"
            placeholder="Enter email"
            required
            onChange={(e) => onChange(e, "email")}
          />

          <label htmlFor="psw">
            <b>Password</b>
          </label>
          <input
            type="password"
            placeholder="Enter password"
            required
            onChange={(e) => onChange(e, "password")}
          />

          <button type="button" onClick={onSendData}>
            Login
          </button>
        </div>
      ) : (
        componentToRender(userType)
      )}
    </>
  );
};

export default Login;
