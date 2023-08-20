import React, { Component, Suspense, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch, withRouter } from "react-router-dom"
import HomePageLayout from "../src/views/layout/homeLayout"
import { useWallet } from "./custom-hooks/useWallet";
import contracts from "./constants/contractAddresses.json";
import { getContractEnteranceFees, getInterval, getLastTimeStamp, getRecentWinner, getTotalParticipants } from './redux/commonStore';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();

  const { isConnected, connection, chainId, address, contractProvider } = useWallet();

  

  let contractAddress = null;

  if (chainId in contracts) {
    contractAddress = contracts[chainId][0];
  }

  useEffect(() => {

    async function getInfo(){
      const body = { contractAddress, provider:contractProvider }
      dispatch(getContractEnteranceFees(body));
      dispatch(getRecentWinner(body))
      dispatch(getTotalParticipants(body))
      dispatch(getInterval(body))
      dispatch(getLastTimeStamp(body))
    }

    if (chainId && contractAddress) {
      getInfo();
    }
  }, [chainId, contractAddress]);
  
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
