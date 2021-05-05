import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { useHistory } from "react-router";

function App() {
  const history = useHistory();
  const [cell, setCell] = useState<string>("");

  const updateCell = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCell(e.target.value);
  };

  const executeLogin = async () => {
    try {
      if (!(cell && cell.trim())) {
        return;
      }
      const response = await axios({
        method: "post",
        url: "http://localhost:3000/api/auth/login",
        data: {
          phone: cell,
        },
      });

      const data = response.data;

      localStorage.setItem("accessToken", data.accessToken);
      history.push("/2fa");
    } catch (err) {
      console.error("Login API has thrown error", err);
    }
  };

  return (
    <div className="App">
      <div className="App-form">
        <input
          type="number"
          value={cell}
          onChange={updateCell}
          placeholder={"Enter cell no. with country code as +91"}
        />

        <button onClick={executeLogin}> Login </button>
      </div>
    </div>
  );
}

export default App;
