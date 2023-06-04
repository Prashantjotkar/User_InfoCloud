import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./Component/NavBar";
import Home from "./Component/Home";
import About from "./Component/About";
import NoteState from "./Context/NoteState";
import Alert from "./Component/Alert";
import Login from "./Component/Login";
import SignUp from "./Component/SignUp";
import React, { useState } from "react";


function App() {
const [alert,setAlert]=useState(null);

const showAlert = (message, type)=>{
  setAlert({
    msg: message,
    type: type
  })
  setTimeout(() => {
      setAlert(null);
  }, 1500);
}
return (
    <>
      <NoteState>
        <BrowserRouter>
          <NavBar />
          <Alert alert={alert} />
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert} />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
            <Route exact path="/signup" element={<SignUp showAlert={showAlert}/>} />
          </Routes>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
