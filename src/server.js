//Imports
const express = require("express")
const db = require("./db")
const cors = require("cors")

const server = express()
server.use(cors())
server.use(express.json())

//ROUTES
const productsRoutes = require("./services/products")
const reviewsRoutes = require("./services/reviews")
const usersRoutes = require("./services/users")
const cartsRoutes = require("./services/carts")

server.use("/products", productsRoutes)
server.use("/reviews", reviewsRoutes)
server.use("/users", usersRoutes)
server.use("/carts", cartsRoutes)

//LISTEN
db.sequelize.sync({ force: false }).then((result) => {
  const port = process.env.PORT || 3006
  server.listen(port, () => console.log("server created on port", port))
})
