import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import ApiService from "../../../services/api.service";
import { TokenService } from "../../../services/token.service";

const FormStyle = styled.div`
  background-image: linear-gradient(to right top, #0039f1, #0066f1, #007cd6, #008ab3, #6b9299);
  color: #111;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
  form {
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding: 24px 48px;
    height: 320px;
    border-radius: 12px;
    .form {
      &__title {
        font-size: 32px;
        font-weight: 300;
      }
      &__container {
        display: flex;
        align-items: center;
        flex-direction: column;
        label {
          margin: 12px 0;
        }
        input {
          width: 100%;
          padding: 8px 4px;
          outline: none;
          border: none;
          border-bottom: 1px solid #123;
        }
        input[type="submit"] {
          background-image: linear-gradient(to right top, #1d2424, #2f3b3b, #425354, #576c6f, #6c868b);
          color: #fff;
          border-radius: 8px;
          text-transform: uppercase;
          cursor: pointer;
          margin-top: 24px;
        }
      }
    }
  }
`;

const LoginPage = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const handleSubmit = evt => {
    evt.preventDefault();
    ApiService.post("/admin/login", {
      username: name,
      password
    })
      .then(res => {
        TokenService.saveToken(res.data.token);
        history.push("/");
      })
      .catch(error => console.log(error));
    return () => {};
  };

  if (TokenService.getToken()) history.push("/");

  return (
    <FormStyle>
      <form onSubmit={handleSubmit}>
        <div className="form__title">Login</div>
        <div className="form__container">
          <label>
            User Name:
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="text" value={password} onChange={e => setPassword(e.target.value)} />
          </label>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </FormStyle>
  );
};

export default LoginPage;
