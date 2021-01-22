const express = require("express")

const cors = require("cors")

//ROUTES

//SERVER
const port = process.env.PORT || 3006
const server = express()
server.listen(port, () => {
  console.log("server listening on port", port)
})
