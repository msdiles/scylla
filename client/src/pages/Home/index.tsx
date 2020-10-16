import React from "react"
import { useDispatch } from "react-redux"
import { setError, setMessage } from "@/state/actions/app.actions"
import { NavLink } from "react-router-dom"

const Home = () => {
  const dispatch = useDispatch()
  return (
    <div style={{ width: "100%", height: "500px" }}>
      Hom
      <button onClick={() => dispatch(setMessage({ message: "ASD" }))}>
        Set
      </button>
      <button onClick={() => dispatch(setError({ error: "asd" }))}>Set</button>
      <NavLink to="/profile">ASDASd</NavLink>
    </div>
  )
}

export default Home
