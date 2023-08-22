import React, { Component, Suspense, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch, withRouter } from "react-router-dom"
import HomePageLayout from "../src/views/layout/homeLayout"
import { useWallet } from "./custom-hooks/useWallet";

const App = () => {

  const { isConnected, connection, chainId, address } = useWallet();

  
  return (
    <Suspense fallback={'pageLoader'}>
      <Switch>
        <Route
          path="/"
          name="Layout"
          render={props => <HomePageLayout pageLoader={'pageLoader'} />}
        />

      </Switch>
    </Suspense>
  )
}

export default App
