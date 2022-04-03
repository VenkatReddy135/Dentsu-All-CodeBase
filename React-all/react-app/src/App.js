import * as React from "react";
// import { Route } from "react-router-dom";
// import { BrowserRouter, Route, Switch } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import EmployeesList from "./components/ListingPage/index";
import Navbar from "./components/Navbar/Navbar";
import MultiStepForm from "./components/ViewPage/MultiStepForm";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route exact path="/" element={<EmployeesList />}></Route>
          <Route path="/about" element={<MultiStepForm />} />
        </Routes>
      </Router>
      <div className="flex-large"></div>
    </div>
  );
}

export default App;
