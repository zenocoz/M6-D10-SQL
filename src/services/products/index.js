const express = require("express")
const Product = require("../../db").Product
const { Op } = require("sequelize")
const sequelize = require("sequelize")
const multer = require("multer")
const cloudinary = require("../cloudinary")
const { CloudinaryStorage } = require("multer-storage-cloudinary")

const router = express.Router()

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "amazonSQL",
  },
})

const cloudinaryMulter = multer({ storage: storage })

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const data = await Product.findAll({
        where: req.query.category
          ? { name: { [Op.iLike]: "%" + req.query.category + "%" } }
          : {},
        offset: parseInt(req.query.offset) | 0,
        limit: parseInt(req.query.limit) | 10,
      })
      res.send(data)
    } catch (err) {
      console.log(err)
      next(err)
    }
  })
  .post(async (req, res, next) => {
    try {
      const newElement = await Product.create(req.body)
      res.send(newElement)
    } catch (err) {
      console.log(err)
      next(err)
    }
  })

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const data = await Product.findByPk(req.params.id)
      res.send(data)
    } catch (err) {
      console.log(err)
      next(err)
    }
  })
  .put(async (req, res, next) => {
    try {
      const updatedData = await Product.update(req.body, {
        returning: true,
        plain: true,
        where: { id: req.params.id },
      })
      res.send(updatedData[1])
    } catch (err) {
      console.log(err)
      next(err)
    }
  })
  .delete(async (req, res, next) => {
    try {
      Product.destroy({ where: { id: req.params.id } }).then((rowsDeleted) => {
        if (rowsDeleted > 0) {
          res.send("Deleted")
        } else {
          res.send("no match")
        }
      })
    } catch (err) {
      console.log(err)
      next(err)
    }
  })

router
  .route("/:productId/upload")
  .post(cloudinaryMulter.single("image"), async (req, res, next) => {
    try {
      const product = await Product.findByPk(req.params.productId)
      console.log(product.imageurl)
      product.imageurl = req.file.path
      await product.save()

      res.send(product)
    } catch (err) {}
  })

module.exports = router
