import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { products } from "../../../../assets/json";
import { Grid, Button, Typography } from "@mui/material";
import "../../../css/Cart.css";
import { useSelector, useDispatch } from "react-redux";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { addItem, setCountProducts } from "../../../../Redux/productsSlice";
import QuantityPicker from "./QuantityPicker";

const Cart = () => {
  const { productId } = useParams();
  const product = products.find((p) => p.id === parseInt(productId, 10));
  const [mainSlider, setMainSlider] = useState(null);
  const [navSlider, setNavSlider] = useState(null);
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const mainSliderSettings = {
    center: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: navSlider,
    arrows: true,
    nextArrow: <ArrowCircleRightIcon />,
    prevArrow: <ArrowCircleLeftIcon />,
    responsive: [
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const navSliderSettings = {
    center: true,
    dots: false,
    infinite: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    focusOnSelect: true,
    asNavFor: mainSlider,
    arrows: false,
    nextArrow: <ArrowCircleRightIcon />,
    prevArrow: <ArrowCircleLeftIcon />,
    responsive: [
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleAddToCart = () => {
    const productWithQuantity = { ...product, quantity };
    dispatch(addItem(productWithQuantity));
    console.log(`${product.name} added to cart with quantity ${quantity}`);
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className={`cart-container ${darkMode ? "dark-mode" : ""}`}>
      <div className="slider-and-details">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Slider
            {...mainSliderSettings}
            ref={(slider) => setMainSlider(slider)}
            className="main-slider"
          >
            {product.pictures.map((picture, index) => (
              <div key={index} className="slide">
                <img
                  src={require(`../../../../assets/images/${picture}`)}
                  alt={product.name}
                  className="product-image"
                />
              </div>
            ))}
          </Slider>
          <Slider
            {...navSliderSettings}
            ref={(slider) => setNavSlider(slider)}
            className="nav-slider"
            style={{ width: "400px" }}
          >
            {product.pictures.map((picture, index) => (
              <div key={index} className="nav-slide">
                <img
                  src={require(`../../../../assets/images/${picture}`)}
                  alt={product.name}
                  className="nav-image"
                  style={{ height: "200px", objectFit: "cover" }}
                />
              </div>
            ))}
          </Slider>
        </div>

        <div className="product-details">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5">Name: {product.name}</Typography>
              <Typography variant="h6">Price: ₹{product.price}</Typography>
              <Typography variant="body1">
                Description: {product.description}
              </Typography>
              <Typography variant="body1">
                Color: {product.colors.join(", ")}
              </Typography>
              <QuantityPicker quantity={quantity} setQuantity={setQuantity} />
              <Button
                variant="contained"
                color="primary"
                className="add-to-cart-button"
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default Cart;
