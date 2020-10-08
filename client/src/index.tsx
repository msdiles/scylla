import React from "react"
import ReactDom from "react-dom"
import App from "./App"
import "./app.scss"

ReactDom.render(<App number={10} />, document.getElementById("root"))
