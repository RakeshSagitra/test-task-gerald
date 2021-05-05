import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import { useHistory } from "react-router";

function Check2FA() {
  const history = useHistory();
  const [twoFA, setTwoFA] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTwoFA(e.target.value);
    if (error) {
      setError("");
    }
  };

  const submit = async () => {
    try {
      if (!(twoFA && twoFA.trim())) {
        return;
      }
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios({
        method: "post",
        url: `http://localhost:4000/api/auth/verify2FA`,
        data: {
          twoFA: twoFA,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = response.data;

      localStorage.removeItem("accessToken");

      localStorage.setItem("jwtToken", data.jwtToken);
      history.push("/welcome");
    } catch (err) {
      console.error(err);
      setError("2FA Code is incorrect, please try again");
    }
  };

  const back = () => {
    localStorage.removeItem("accessToken");
    history.push("/");
  };

  return (
    <div>
      <div className="App-form">
        <input
          type="text"
          value={twoFA}
          onChange={handleChange}
          placeholder={"Please enter 2FA"}
        />

        <button onClick={submit}> Confirm 2FA </button>
        {error && <span className="error"> {error} </span>}
        <button className="back-button" onClick={back}>
          {" "}
          Back{" "}
        </button>
      </div>
    </div>
  );
}

export default Check2FA;
