// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

export const contractSlice = createSlice({
  name: 'contractData',
  initialState: {
    contractData: {}
  },
  reducers: {
    getContractData: (state, action) => {
        state.contractData = action.payload
    }
  }
})

export const { getContractData } = contractSlice.actions

export default contractSlice.reducer
