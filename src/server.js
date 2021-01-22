//Imports
const express = require("express")
const db = require("./db")
const cors = require("cors")

//ROUTES

//LISTEN
db.sequelize.sync({ force: true }).then((result) => {
  const port = process.env.PORT || 3006
  server.listen(port, () => console.log("server created on port", port))
})
