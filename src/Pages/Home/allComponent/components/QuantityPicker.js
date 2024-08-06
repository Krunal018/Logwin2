import React, { useState } from "react";
import { Button, Typography } from "@mui/material";

const QuantityPicker = ({ setQuantity, quantity, onQuantityChange }) => {
  const increase = () => {
    setQuantity((prev) => {
      const newQuantity = prev + 1;
      if (onQuantityChange) onQuantityChange(newQuantity);
      return newQuantity;
    });
  };

  const decrease = () => {
    setQuantity((prev) => {
      const newQuantity = Math.max(prev - 1, 1);
      if (onQuantityChange) onQuantityChange(newQuantity);
      return newQuantity;
    });
  };

  return (
    <div
      style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
    >
      <Button variant="contained" color="primary" onClick={decrease}>
        -
      </Button>
      <Typography variant="body1" style={{ margin: "0 10px" }}>
        {quantity}
      </Typography>

      <Button variant="contained" color="primary" onClick={increase}>
        +
      </Button>
    </div>
  );
};

export default QuantityPicker;
