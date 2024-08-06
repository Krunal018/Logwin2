// src/pages/Home.js

import React from "react";
import MapComponent from "./components/MapComponent"; // Adjust the import path if necessary
import Cart from "./components/Cart";
import Allcart from "./components/Allcart";

const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
      {/* <MapComponent /> */}
      <Allcart />
      {/* <Cart /> */}
    </div>
  );
};

export default Home;
