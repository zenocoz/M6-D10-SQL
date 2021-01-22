const express = require("express")
const Product = require("../../db").Product
const User = require("../../db").User
const Review = require("../../db").Review
const { Op } = require("sequelize")

const router = express.Router()

//get all reviews
router.route("/").get(async (req, res, next) => {
  try {
    const reviews = await Review.findAll({ include: [Product, User] })
    res.send(reviews)
  } catch (err) {
    console.log(err)
    next(err)
  }
})

//get all reviews for specific product
router.route("/:productId").get(async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      include: [Product, User],
      where: { productId: req.params.productId },
    })
    res.send(reviews)
  } catch (err) {
    console.log(err)
    next(err)
  }
})

//get all reviews by a user
router.route("/by/:userId").get(async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      include: [Product, User],
      where: { userId: req.params.userId },
    })
    res.send(reviews)
  } catch (err) {
    console.log(err)
    next(err)
  }
})

router.route("/:productId/:userId").post(async (req, res, next) => {
  try {
    const newReview = await Review.create({
      ...req.body,
      productId: req.params.productId,
      userId: req.params.userId,
    })
    res.send(newReview)
  } catch (err) {
    console.log(err)
    next(err)
  }
})

router
  .route("/:reviewId")
  .put(async (req, res, next) => {
    try {
      const updatedData = await Review.update(req.body, {
        returning: true,
        plain: true,
        where: { id: req.params.reviewId },
      })
      res.send(updatedData[1])
    } catch (err) {
      console.log(err)
      next(err)
    }
  })
  .delete(async (req, res, next) => {
    try {
      Review.destroy({ where: { id: req.params.reviewId } }).then(
        (rowsDeleted) => {
          if (rowsDeleted > 0) {
            res.send("Deleted")
          } else {
            res.send("no match")
          }
        }
      )
    } catch (err) {
      console.log(err)
      next(err)
    }
  })

module.exports = router
