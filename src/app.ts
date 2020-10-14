import express, { Application } from "express"
import { errorMiddleware } from "./middlewares/errorMiddleware"

class App {
  public app: Application
  public port: number

  constructor(appInit: { port: number; middlewares: any; routers: any }) {
    this.app = express()
    this.port = appInit.port

    this.middlewares(appInit.middlewares)
    this.routers(appInit.routers)
    this.errorHandler()
  }

  private middlewares(middlewares: any[]) {
    middlewares.forEach((middleware) => {
      this.app.use(middleware)
    })
  }

  private routers(routers: any[]) {
    routers.forEach((router) => {
      this.app.use(router.path, ...router.middlewares, router.router)
    })
  }

  private errorHandler() {
    this.app.use(errorMiddleware)
  }

  public listen() {
    if (process.env.NODE_ENV !== "test")
      this.app.listen(this.port, () => {
        console.log(
          `⚡️[server]:Server is running at http://localhost:${this.port}`
        )
      })
  }
}

export default App
