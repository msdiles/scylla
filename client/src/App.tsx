import React, { useEffect, useState } from "react"
import useSub from "../hooks/useSub"
import axios from "axios"

export interface Props {
  number: number
}

const App: React.FC<Props> = ({ number }) => {
  const [count, setCount] = useState(0)
  const [post, setPost] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { subber } = useSub()
  const clickHandler = () => {
    setCount(count + 1)
  }

  useEffect(() => {
    let unmounted = false
    const getPost = async () => {
      try {
        setLoading(true)
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts/1"
        )
        if (response.status === 500) throw new Error("Something went wrong")
        // @ts-ignore
        const { body } = response.data
        if (!unmounted) {
          setPost(body)
          setLoading(false)
        }
      } catch (e) {
        setError(e)
        setLoading(false)
      }
    }
    getPost()
    return () => {
      unmounted = true
    }
  }, [])

  return (
    <div>
      <h1>Hello</h1>
      <button type="button" onClick={clickHandler}>
        +1
      </button>
      <p data-testid="count">{count}</p>
      <p data-testid="subber">{subber}</p>
      <p data-testid="number">{number}</p>
      <p data-testid="post">{post}</p>
      {loading ? (
        <p data-testid="loading">Loading</p>
      ) : error ? (
        <p data-testid="fetch">Error</p>
      ) : (
        <p data-testid="fetch">{post}</p>
      )}
    </div>
  )
}

export default App
