import React from "react";
import "./ProductCardStyle.css";
import { Link } from "react-router-dom";

const ProductCard = (props) => {
  const {
    _id,
    title,
    brand,
    category,
    price,
    itemImageString,
    description,
    condition,
  } = props.item;

  const addToCart = () => {
    if (localStorage.getItem("cartItem")) {
      const cartItem = JSON.parse(localStorage.getItem("cartItem"));
      console.log(cartItem);

      let tempCart = [...cartItem, props.item];
      localStorage.setItem("cartItem", JSON.stringify(tempCart));
    } else {
      localStorage.setItem("cartItem", JSON.stringify([props.item]));
    }
  };

  return (
    <Link to={`/${_id}`}>
      <div className="product-card-container">
        <div className="product-image-container">
          <img
            className="product-image"
            src={
              require(`../../Static/itemImages/${itemImageString}`)
                ? require(`../../Static/itemImages/${itemImageString}`)
                : "https://www.grouphealth.ca/wp-content/uploads/2018/05/placeholder-image.png"
            }
          ></img>
        </div>

        <div className="product-details">
          <span className="product-title">{title}</span>

          <span className="product-sort-description">{description}</span>

          <span className="product-price">{price}$</span>

          {/* <button className="add-to-cart-button" onClick={(e) => addToCart(e)}>
          {" "}
          Add To Cart
        </button> */}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
