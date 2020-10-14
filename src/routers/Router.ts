import express from "express"

abstract class Router {
  abstract path: string
  abstract router: express.Router
  middlewares

  constructor(middlewars: any[]) {
    this.middlewares = middlewars
  }

  abstract initRoute(): void
}
export default Router
