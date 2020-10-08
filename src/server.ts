import express from "express"
import App from "./app"
import TestRouter from "./routers/testRouter"

const app = new App({
  port: 3000,
  middlewares: [express.json(), express.urlencoded({ extended: true })],
  routers: [new TestRouter([])],
})

app.listen()

export default app
