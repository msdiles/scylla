import React, { ReactNode } from "react"
import { Route, Switch } from "react-router-dom"
import Profile from "../pages/Profile"
import EmptyLayout from "../layouts/empty/Empty"
import MainLayout from "@/layouts/Main"
import Login from "@/pages/Login"
import Signup from "@/pages/Signup"
import ResetLink from "@/pages/ResetLink"
import ResetPassword from "@/pages/ResetPassword"
import Main from "@/pages/Main"
import AuthProvider from "@/components/AuthProvider"
import { AuthAccess } from "@/types/enums"
import Error from "@/pages/Error"
import Home from "@/pages/Home"

export interface IRoute {
  name: string
  path?: string
  exact: boolean
  access: AuthAccess
  component: ReactNode
}

const Routes: IRoute[] = [
  {
    name: "login",
    path: "/login",
    access: AuthAccess.OnlyUnAuth,
    exact: false,
    component: (
      <EmptyLayout>
        <Login />
      </EmptyLayout>
    ),
  },
  {
    name: "signup",
    path: "/signup",
    access: AuthAccess.OnlyUnAuth,
    exact: false,
    component: (
      <EmptyLayout>
        <Signup />
      </EmptyLayout>
    ),
  },
  {
    name: "resetLink",
    path: "/reset",
    access: AuthAccess.OnlyUnAuth,
    exact: true,
    component: (
      <EmptyLayout>
        <ResetLink />
      </EmptyLayout>
    ),
  },
  {
    name: "resetPassword",
    path: "/reset/:date/:id",
    access: AuthAccess.OnlyUnAuth,
    exact: false,
    component: (
      <EmptyLayout>
        <ResetPassword />
      </EmptyLayout>
    ),
  },
  {
    name: "profile",
    path: "/profile",
    access: AuthAccess.OnlyAuth,
    exact: false,
    component: (
      <MainLayout>
        <Profile />
      </MainLayout>
    ),
  },
  {
    name: "main",
    path: "/",
    access: AuthAccess.All,
    exact: true,
    component: <Main />,
  },
  {
    name: "home",
    path: "/home",
    access: AuthAccess.OnlyAuth,
    exact: true,
    component: (
      <MainLayout>
        <Home />
      </MainLayout>
    ),
  },
  {
    name: "error",
    access: AuthAccess.All,
    exact: false,
    component: (
      <MainLayout>
        <Error />
      </MainLayout>
    ),
  },
]

const Router = () => {
  return (
    <Switch>
      {Routes.map((r) => (
        <Route path={r.path} exact={r.exact} key={r.name}>
          <AuthProvider access={r.access}>{r.component}</AuthProvider>
        </Route>
      ))}
    </Switch>
  )
}
export default Router
