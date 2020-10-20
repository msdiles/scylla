import express from "express"
import compression from "compression"
import helmet from "helmet"
import logger from "morgan"
import cors from "cors"

import App from "./app"
import mongoConnect from "./utils/mongoConnect"
import AuthRouter from "./routers/auth.routes"
import BookmarkRouter from "./routers/bookmark.routes"

const app = new App({
  port: 3000,
  middlewares: [
    compression(),
    helmet(),
    logger("dev"),
    express.json(),
    express.urlencoded({ extended: true }),
    cors(),
  ],
  routers: [new AuthRouter([]), new BookmarkRouter([])],
})

mongoConnect()
  .then(() => app.listen())
  .catch((e) => console.log(e))

export default app
