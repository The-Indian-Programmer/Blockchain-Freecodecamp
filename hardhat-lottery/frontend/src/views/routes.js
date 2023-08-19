import React from "react"
import Allfunders from "../views/pages/allfunders/index"
import HomePage from "../views/pages/homepage"


const Home = React.lazy(props => HomePage)
const AllfundersList = React.lazy(props => Allfunders)

export const publicRoute = [
  {
    path: "/",
    display: true,
    exact: true,
    name: "Home",
    component: HomePage,
    className: ""
  },
  {
    path: "/funders",
    display: true,
    exact: true,
    name: "Allfunders",
    component: Allfunders,
    className: ""
  }
]