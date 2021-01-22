const { Sequelize, DataTypes } = require("sequelize")
const Product = require("./product.js")
const Review = require("./review.js")
const Cart = require("./cart.js")
const User = require("./user.js")

const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  { host: process.env.PGHOST, dialect: "postgres" }
)

const models = {
  Product: Product(sequelize, DataTypes),
  Review: Review(sequelize, DataTypes),
  Cart: Cart(sequelize, DataTypes),
  User: User(sequelize, DataTypes),
}

Object.keys(models).forEach((modelName) => {
  if ("associate" in models[modelName]) models[modelName].associate(models)
})

models.sequelize = sequelize
models.Sequelize = Sequelize

sequelize
  .authenticate()
  .then(() => {
    console.log("connection established")
  })
  .catch(() => {
    console.log("connection failed", e)
  })

module.exports = models
