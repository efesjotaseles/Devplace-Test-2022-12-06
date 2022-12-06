import "./App.css";
import React from "react";
import { useState, useEffect } from "react";

function App() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPremium, setIsPremium] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [isFilePicked, setIsFilePicked] = useState(false);

  function changeFileHandler(e) {
    setSelectedFile(e.target.files[0]);
    setIsFilePicked(true);
  }

  function handleSubmit(e) {
    const userSubmited = {
      username: username,
      email: email,
      password: password,
      isPremium: isPremium,
    };

    fetch("http://localhost:5050/users", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify(userSubmited),
    })
      .then((res) => {
        res.json();
      })
      .then((data) => {
        console.log(data);
      });
  }

  function handleFileUpload(e) {
    if (isFilePicked) {
      const formData = new FormData();
      formData.append("userPhoto", selectedFile);

      fetch("http://localhost:5050/uploads", {
        method: "POST",
        body: formData,
      })
        .then(setIsPremium(true))
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <div className="App">
      <div>Formulario de inscripción</div>
      <form>
        <input
          name="username"
          type="text"
          placeholder="username"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        ></input>
        <input
          name="email"
          type="email"
          placeholder="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <input
          name="password"
          type="password"
          placeholder="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <label for="premiumCheck" >Usuario premium</label>
        <input name="premiumCheck" type="checkbox" disabled checked={isPremium} ></input>
        <label for="userPhoto">Suba una foto:</label>
        <input
          name="userPhoto"
          type="file"
          onChange={changeFileHandler}
        ></input>
        <button type="button" name="uploadFile" onClick={handleFileUpload}>
          Subir foto de user
        </button>
        <button type="button" name="submitBtn" onClick={handleSubmit}>
          Crear user
        </button>
      </form>
    </div>
  );
}

export default App;
