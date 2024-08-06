import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  CardMedia,
  Box,
} from "@mui/material";
import {
  RemoveCircle as RemoveCircleIcon,
  AddCircle as AddCircleIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { removeItem } from "../../../../Redux/productsSlice";
import QuantityPicker from "./QuantityPicker";

const CartPage = () => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const { cartItem } = useSelector((state) => state.count);

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  //   const handleIncreaseQuantity = (id) => {
  //     dispatch(increaseQuantity(id));
  //   };

  //   const handleDecreaseQuantity = (id) => {
  //     dispatch(decreaseQuantity(id));
  //   };

  const getTotalAmount = (item) => {
    console.log("🚀 ~ getTotalAmount ~ item:", item);
    return cartItem.reduce((total, item) => total + item.salePrice, 0);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      <List>
        {cartItem.length > 0 ? (
          cartItem.map((item) => (
            <ListItem
              key={item.id}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CardMedia
                  component="img"
                  sx={{ width: 100, height: 100, objectFit: "cover" }}
                  image={require(`../../../../assets/images/${item.pictures[0]}`)}
                  alt={item.name}
                />
                <Box sx={{ ml: 2 }}>
                  <ListItemText
                    primary={item.name}
                    secondary={`Price: $${item.salePrice.toFixed(
                      2
                    )} | Discount: $${item.discount.toFixed(2)} | Quantity: ${
                      item.quantity
                    }`}
                  />
                  <QuantityPicker
                    quantity={quantity}
                    setQuantity={setQuantity}
                  />
                </Box>
              </Box>
            </ListItem>
          ))
        ) : (
          <Typography>No items in cart</Typography>
        )}
      </List>
      <Typography variant="h6" gutterBottom>
        Total: ${getTotalAmount(cartItem).toFixed(2) * quantity}
      </Typography>
    </Container>
  );
};

export default CartPage;
