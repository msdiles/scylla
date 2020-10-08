import React from "React"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { rest } from "msw"
import { setupServer } from "msw/node"
import App, { Props } from "./App"

const server = setupServer(
  rest.get("https://jsonplaceholder.typicode.com/posts/1", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        userId: 1,
        id: 1,
        title:
          "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
        body:
          "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
      })
    )
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe("<App/>", () => {
  test("should render props", () => {
    render(<App number={10} />)
    expect(screen.getByTestId("number").innerHTML).toEqual("10")
  })
  test("should increase count on click", async () => {
    render(<App number={10} />)
    expect(screen.getByTestId("count").innerHTML).toEqual("0")
    await fireEvent.click(screen.getByText(/\+1/i))
    expect(screen.getByTestId("count").innerHTML).toEqual("1")
    await fireEvent.click(screen.getByText(/\+1/i))
    expect(screen.getByTestId("count").innerHTML).toEqual("2")
    await fireEvent.click(screen.getByText(/\+1/i))
    expect(screen.getByTestId("count").innerHTML).toEqual("3")
  })

  test("should decrease sub each seconds", async () => {
    render(<App number={10} />)
    expect(screen.getByTestId("subber").innerHTML).toEqual("0")
    await waitFor(
      () => {
        expect(screen.getByTestId("subber").innerHTML).toEqual("-1")
      },
      { timeout: 1000 }
    )
    await waitFor(
      () => {
        expect(screen.getByTestId("subber").innerHTML).toEqual("-2")
      },
      { timeout: 1000 }
    )
    await waitFor(
      () => {
        expect(screen.getByTestId("subber").innerHTML).toEqual("-3")
      },
      { timeout: 1000 }
    )
  })
  test("should fetch data", async () => {
    render(<App number={10} />)
    await waitFor(() => screen.getByTestId("loading"))
    await waitFor(() => screen.getByTestId("fetch"))
    expect(screen.getByTestId("fetch").innerHTML).toEqual(
      "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas" +
        " totam\nnostrum rerum est autem sunt rem eveniet architecto"
    )
  })

  test("should show error", async () => {
    server.use(
      rest.get(
        "https://jsonplaceholder.typicode.com/posts/1",
        (req, res, ctx) => {
          return res(ctx.status(500))
        }
      )
    )
    render(<App number={10} />)
    await waitFor(() => screen.getByTestId("loading"))
    await waitFor(() => screen.getByTestId("fetch"))
    expect(screen.getByTestId("fetch").innerHTML).toEqual("Error")
  })
})
