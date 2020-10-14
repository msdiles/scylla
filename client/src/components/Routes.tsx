import React from "react"
import { Route } from "react-router-dom"
import { RootState } from "@/state/reducers"
import { useSelector } from "react-redux"
import Home from "../pages/Home"
import Profile from "../pages/Profile"
import EmptyLayout from "../layouts/empty/Empty"
import Login from "@/pages/Login"
import Signup from "@/pages/Signup"
import ResetLink from "@/pages/ResetLink"
import ResetPassword from "@/pages/ResetPassword"

const Routes = () => {
  const isLogged = useSelector((state: RootState) => state.auth.isLogged)

  return !isLogged ? (
    <>
      <Route path="/login">
        <EmptyLayout>
          <Login />
        </EmptyLayout>
      </Route>
      <Route path="/signup">
        <EmptyLayout>
          <Signup />
        </EmptyLayout>
      </Route>
      <Route path="/reset" exact>
        <EmptyLayout>
          <ResetLink />
        </EmptyLayout>
      </Route>
      <Route path="/reset/:date/:id">
        <EmptyLayout>
          <ResetPassword />
        </EmptyLayout>
      </Route>
      <Route path="/" exact>
        <Home />
      </Route>
    </>
  ) : (
    <>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/" exact>
        <Home />
      </Route>
    </>
  )
}
export default Routes
