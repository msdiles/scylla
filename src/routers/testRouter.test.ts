import request from "supertest"
import app from "../server"
import { Server } from "http"

let server: Server, agent: request.SuperAgentTest

beforeEach((done) => {
  server = app.app.listen((err: Error) => {
    if (err) return done(err)
    agent = request.agent(server)
    done()
  })
})

afterEach((done) => {
  return server && server.close(done)
})

describe("Post Endpoints", () => {
  it("should create a new post", async () => {
    const res = await agent.get("/test/get")
    expect(res.status).toEqual(200)
    expect(res.body).toHaveProperty("title")
  })
})
