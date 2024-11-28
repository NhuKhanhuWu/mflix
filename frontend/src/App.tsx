/** @format */

import { Route, BrowserRouter, Routes } from "react-router-dom";
import Header from "./component/header/header";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Header></Header>
      <Routes>
        {/* navbar: start */}
        <Route path="/" element="home"></Route>
        <Route path="/movies" element={<p>movies</p>}></Route>
        <Route path="/movies" element={<p>movies</p>}></Route>
        <Route path="/movies" element={<p>about</p>}></Route>
        {/* navbar: end */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
