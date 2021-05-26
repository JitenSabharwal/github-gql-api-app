import React from "react"
import Home from "./Home/Home"
import Issue from "./Issue/Issue"
import { BrowserRouter, Route, RouteProps, Switch } from "react-router-dom"

function useRoutes(): readonly RouteProps[] {
  const routes = [
    {
      component: Home,
      exact: true,
      path: "/",
    },
    {
      component: Issue,
      exact: true,
      path: "/issue/:owner/:name/:id",
    },
  ]
  return routes
}

export default function Navigation() {
  const routes = useRoutes()
  return (
    <BrowserRouter>
      <Switch>
        {routes.map((route, index) => (
          <Route key={(route.path as any) || index} {...route} />
        ))}
      </Switch>
    </BrowserRouter>
  )
}
