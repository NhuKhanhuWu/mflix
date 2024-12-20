/** @format */

import { Route, BrowserRouter, Routes } from "react-router-dom";

import "./App.css";
import { Homepage } from "./pages/Homepage/Hompage.tsx";
import { NavBar } from "./component/navbar/NavBar.tsx";

function App() {
  return (
    <BrowserRouter>
      <NavBar></NavBar>

      <Routes>
        <Route path="/" element={<Homepage />}></Route>
        <Route path="/movies" element={<p>movies</p>}></Route>
        <Route path="/movies" element={<p>movies</p>}></Route>
        <Route path="/movies" element={<p>about</p>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
