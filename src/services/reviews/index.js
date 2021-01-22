const express = require("express")
const Product = require("../../db").Product
const User = require("../../db").User
const Review = require("../../db").Review
const { Op } = require("sequelize")

const router = express.Router()

router.route("/:productId").get(async (req, res, next) => {
  try {
    const reviews = await Review.findAll({ include: [Product, User] })
    res.send(reviews)
  } catch (err) {
    console.log(err)
    next(err)
  }
})

// router.route("/:authorId").get(async (req, res, next) => {
//   try {
//     const story = await Story.findAll({
//       include: [Product, User],
//       where: { authorId: req.params.authorId },
//     })
//     res.send(story)
//   } catch (err) {
//     console.log(err)
//     next(err)
//   }
// })

router
  .route("/:productId/:userId")
  .post(async (req, res, next) => {
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
  .put(async (req, res, next) => {
    try {
      //TODO
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
