const express =
  require("express");

const {

  addToCart,

  getCart,

  removeFromCart

} = require(
  "../controllers/cartController"
);

const {

  protect

} = require(
  "../middleware/authMiddleware"
);

const router =
  express.Router();


// Add Course To Cart
router.post(

  "/add",

  protect,

  addToCart

);


// View Cart
router.get(

  "/",

  protect,

  getCart

);


// Remove Course From Cart
router.delete(

  "/remove/:id",

  protect,

  removeFromCart

);


module.exports =
  router;