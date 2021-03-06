import React, { useState, useContext } from "react";
import styled from "styled-components";
import { login, getMe } from "../../WebAPI";
import { setAuthToken } from "../../utils";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../contexts";

const ErrorMessage = styled.div`
  color: red;
`;

export default function LoginPage() {
  const { setUser } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const history = useHistory();

  const handleSubmit = (e) => {
    setErrorMessage(null);
    login(username, password).then((data) => {
      if (data.ok === 0) {
        setErrorMessage(data.message);
      }
      setAuthToken(data.token);
      getMe().then((response) => {
        if (response.ok !== 1) {
          setAuthToken(null);
          return setErrorMessage(response.toString());
        }
        setUser(response.data);
        history.push("/");
      });
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        username:{" "}
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        password:{" "}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">登入</button>
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </form>
  );
}
