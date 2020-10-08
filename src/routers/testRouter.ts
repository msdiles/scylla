import express from "express"

export class TestRouter {
  public path = "/test"
  public router = express.Router()
  public middlewares

  constructor(middlewares: any[]) {
    this.middlewares = middlewares
    this.initRoute()
  }

  private initRoute() {
    this.router.get("/get", (req, res) => {
      res.status(200).json({ title: "Hello", id: 3 })
    })

    this.router.post("/get", (req, res) => {
      res.status(200).json({ title: "Hello", id: 3 })
    })
  }
}

export default TestRouter
