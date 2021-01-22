const express = require("express")
const Product = require("../../db").Product
const Cart = require("../../db").Cart
const User = require("../../db").User
const { Op } = require("sequelize")

const router = express.Router()

router.route("/").get(async (req, res, next) => {
  try {
    const carts = await Cart.findAll({ include: [Product, User] })
    res.send(carts)
  } catch (err) {
    console.log(err)
    next(err)
  }
})

router.route("/:userId").get(async (req, res, next) => {
  try {
    const cart = await Cart.findAll({
      include: [Product, User],
      where: { userId: req.params.userId },
    })
    res.send(cart)
  } catch (err) {
    console.log(err)
    next(err)
  }
})

router.route("/:cartId").put(async (req, res, next) => {
  try {
    const updatedCart = await Review.update(req.body, {
      include: [Product, User],
      returning: true,
      plain: true,
      where: { id: req.params.cartId },
    })
    res.send(updatedCart[1])
  } catch (err) {
    console.log(err)
    next(err)
  }
})

router
  .route("/:userId/:productId")
  .post(async (req, res, next) => {
    try {
      const newCart = await Cart.create({
        userId: req.params.userId,
        productId: req.params.productId,
      })
      res.send(newCart)
    } catch (err) {
      console.log(err)
      next(err)
    }
  })
  .delete(async (req, res, next) => {
    try {
      //TODO
    } catch (err) {
      console.log(err)
      next(err)
    }
  })

module.exports = router
