import React, { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import ApiService from "../../../services/api.service";
import { TokenService } from "../../../services/token.service";

const FormStyle = styled.div`
  color: #111;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 640px;
  form {
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    padding: 24px 48px;
    height: 42px;
    border-radius: 12px;
    width: 100%;
    max-width: 680px;
    border-radius: 4px;
    border: 2px solid #1d2424;
    height: 420px;
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
          width: 100%;
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

const AddUser = () => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [plate, setPlate] = useState("");
  const [carType, setCarType] = useState("");
  const history = useHistory();
  const handleSubmit = evt => {
    evt.preventDefault();
    ApiService.setHeader();
    ApiService.post("/admin/add", {
      name,
      position,
      plate,
      carType
    })
      .then(res => {
        setTimeout(() => {
          alert("Add success");
          window.location.reload();
        }, 1000);
      })
      .catch(error => console.log(error));
    return () => {};
  };
  if (!TokenService.getToken()) history.push("/login");

  return (
    <FormStyle>
      <form onSubmit={handleSubmit}>
        <div className="form__title">Add User</div>
        <div className="form__container">
          <label>
            Name:
            <input type="text" value={name} onChange={e => setName(e.target.value)} />
          </label>
          <label>
            Position:
            <input type="text" value={position} onChange={e => setPosition(e.target.value)} />
          </label>
          <label>
            Plate:
            <input type="text" value={plate} onChange={e => setPlate(e.target.value)} />
          </label>
          <label>
            CarType:
            <input type="text" value={carType} onChange={e => setCarType(e.target.value)} />
          </label>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </FormStyle>
  );
};

export default AddUser;
