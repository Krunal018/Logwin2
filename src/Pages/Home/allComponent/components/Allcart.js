import React, { useEffect } from "react";
import {
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../../../css/Allcart.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  getAllProducts,
  setCountProducts,
} from "../../../../Redux/productsSlice";

const Allcart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productData } = useSelector((state) => state.products);
  const handleViewProduct = (productId, products) => {
    navigate(`/cart/${productId}`);
  };

  const addtocart = (e, products) => {
    e.stopPropagation();
    console.log("products", products);
    dispatch(addItem(products));
  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);
  return (
    <div style={{ padding: "20px" }}>
      <Grid container spacing={4}>
        {productData?.length > 0 &&
          productData.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card className="card">
                <CardMedia
                  component="img"
                  alt={product.name}
                  height="200"
                  image={require(`../../../../assets/images/${product.pictures[0]}`)}
                  className="card-media"
                  onClick={() => handleViewProduct(product.id)}
                />
                <CardContent className="card-content">
                  <Typography variant="h6" gutterBottom>
                    {product.name}
                  </Typography>
                  <Typography variant="h6" color="textSecondary">
                    Price: ₹{product.price}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Rating: {product.rating}
                  </Typography>
                </CardContent>
                <CardActions className="card-actions">
                  <Button
                    size="small"
                    color="primary"
                    onClick={(e) => addtocart(e, product)}
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default Allcart;
