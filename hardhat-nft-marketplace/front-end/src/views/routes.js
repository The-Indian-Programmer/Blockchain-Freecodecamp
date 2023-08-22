import React from "react"
import Allfunders from "../views/pages/allfunders/index"
import HomePage from "../views/pages/homepage"
import WithDrawNFT from "./pages/withdrawnft"
import CreateOrAddNFT from "./pages/createnft"


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
    path: "/withdraw/:id",
    display: true,
    exact: true,
    name: "WithDraw",
    component: WithDrawNFT,
    className: ""
  },
  {
    path: "/add-nft",
    display: true,
    exact: true,
    name: "CreateOrAddNFT",
    component: CreateOrAddNFT,
    className: ""
  },
  {
    path: "/update-nft/:id",
    display: true,
    exact: true,
    name: "CreateOrAddNFT",
    component: CreateOrAddNFT,
    className: ""
  },
]