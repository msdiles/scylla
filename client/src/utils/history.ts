import * as a from "history"

const history = a.createBrowserHistory()

export const push = (path: string) => {
  history.push(path)
}

export default history
