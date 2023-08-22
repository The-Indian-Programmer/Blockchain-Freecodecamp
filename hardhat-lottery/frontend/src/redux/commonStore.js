// ** Redux Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import abi from "../constants/abi.json";
import { ethers } from "ethers";


export const getContractEnteranceFees = createAsyncThunk('layout/getContractEnteranceFees', async (data) => {

  const contract = new ethers.Contract(
    data.contractAddress,
    abi,
    data.provider
  );
  const funName = "getEnteranceFee";
  const response = await contract[funName]();
  return { eth: ethers.utils.formatEther(response), provider: data.provider, contractAddress: data.contractAddress };
})
export const getTotalParticipants = createAsyncThunk('layout/getTotalParticipants', async (data) => {

  const contract = new ethers.Contract(
    data.contractAddress,
    abi,
    data.provider
  );
  const funName = "getParticipants";
  const response = await contract[funName]();
  return { participants: response };
})
export const getRecentWinner = createAsyncThunk('layout/getRecentWinner', async (data) => {

  const contract = new ethers.Contract(
    data.contractAddress,
    abi,
    data.provider
  );
  const funName = "getRecentWinner";
  const response = await contract[funName]();
  return { recentWinner: response };
})
export const getInterval = createAsyncThunk('layout/getInterval', async (data) => {

  const contract = new ethers.Contract(
    data.contractAddress,
    abi,
    data.provider
  );
  const funName = "getTimeInterval";
  const response = await contract[funName]();
  return { interval: response };
})
export const getLastTimeStamp = createAsyncThunk('layout/getLastTimeStamp', async (data) => {

  const contract = new ethers.Contract(
    data.contractAddress,
    abi,
    data.provider
  );
  const funName = "getLastTimeStamp";
  const response = await contract[funName]();
  return { lastTimeStamp: response };
})

export const handleEnterLottery = createAsyncThunk('layout/handleEnterLottery', async (data) => {
  const contract = new ethers.Contract(
    data.contractAddress,
    abi,
    data.provider.getSigner()
  );  
  const funName = "enterRaffle";
  const response = await contract[funName]({ value: ethers.utils.parseUnits((data.eth).toString(), "ether")});
  return response;
});

export const updateTransactionResponse = createAsyncThunk('layout/updateTransactionResponse', async (data) => {
  return data;
});


export const contractSlice = createSlice({
  name: "contractData",
  initialState: {
    contractData: {},
    transactionLoading: false,
    transactionResponse: {message: '', status: ''},
    recentWinner: '',
    participants: [],
    interval: '',
    lastTimeStamp: ''
  },
  reducers: {
    getContractData: (state, action) => {
      // state.contractData = action.payload;
    },
  },
  extraReducers: builder => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(handleEnterLottery.pending, (state, action) => {
      state.transactionLoading = true
    });
    builder.addCase(handleEnterLottery.rejected, (state, action) => {
        state.transactionResponse = {message: action.error.message ? action.error.message.includes('rejected transaction') ? 'Transaction rejected' : action.error.message : action.error.message, status: 'error'}
      state.transactionLoading = false
    });
    builder.addCase(handleEnterLottery.fulfilled, (state, action) => {
      state.transactionResponse = {message: 'Transaction successful', status: 'success'}
      state.transactionLoading = false
    });
    builder.addCase(getContractEnteranceFees.fulfilled, (state, action) => {
      state.contractData = { ...state.contractData, ...action.payload }
      state.transactionLoading = false
    });
    builder.addCase(updateTransactionResponse.fulfilled, (state, action) => {
      state.transactionResponse = { ...state.transactionResponse, ...action.payload }
    });
    builder.addCase(getTotalParticipants.fulfilled, (state, action) => {
      state.participants = action.payload.participants
    });
    builder.addCase(getRecentWinner.fulfilled, (state, action) => {
      state.recentWinner = action.payload.recentWinner
    });
    builder.addCase(getInterval.fulfilled, (state, action) => {
      state.interval = action.payload.interval
    });
    builder.addCase(getLastTimeStamp.fulfilled, (state, action) => {
      state.lastTimeStamp = action.payload.lastTimeStamp
    });
  }
});

export const { getContractData } = contractSlice.actions;

export default contractSlice.reducer;
