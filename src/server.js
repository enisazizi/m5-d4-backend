const express = require("express")
const listEndpoints = require("express-list-endpoints")
const cors = require("cors")
const studentsRoutes = require("./services/students")
const projectRoutes = require("./services/projects")

const { 
  badrequestHandler,
  notFoundHandler,
  unauthorizedHandler,
  forbiddenHandler,
  catchAllHandler,
  
} =require("./errorHandling")



const server = express()
const port = 3001

const loggerMiddleware = (req, res, next) => {
  
  next()
}


server.use(cors())
server.use(express.json()) // I need to specify this line of code otherwise all the request bodies will be undefined. And this line of code must come BEFORE the routes
server.use(loggerMiddleware)

// now the express

server.use("/students", studentsRoutes)
server.use("/projects",projectRoutes)


//now the error handlers
server.use(badrequestHandler)
server.use(notFoundHandler)
server.use(forbiddenHandler)
server.use(unauthorizedHandler)
server.use(catchAllHandler)

console.log(listEndpoints(server))




server.listen(port, () => {
  console.log("Server is running on port: ", port)
})
