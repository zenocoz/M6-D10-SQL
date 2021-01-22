const express = require("express")
const User = require("../../db").User
const { Op } = require("sequelize")

const router = express.Router()

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const users = await User.findAll({})
      res.send(users)
    } catch (err) {
      console.log(err)
      next(err)
    }
  })
  .post(async (req, res, next) => {
    try {
      const newUser = await User.create(req.body)
      res.send(newUser)
    } catch (err) {
      console.log(err)
      next(err)
    }
  })

router
  .route("/:userId")
  .put(async (req, res, next) => {
    try {
      const updatedUser = await User.update(req.body, {
        returning: true,
        plain: true,
        where: { id: req.params.userId },
      })
      res.send(updatedUser[1])
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
