// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'


const initialUser = () => {
  const item = window.localStorage.getItem('userData')
  return item ? JSON.parse(item) : {}
}

export const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    userData: initialUser()
  },
  reducers: {
    handleWalletConnect: (state, action) => {
      state.userData = action.payload
      let userData = JSON.stringify(action.payload)
      localStorage.setItem('userData', userData)
    },
    handleWalletDisconnect: (state, action) => {
      state.userData = {}
      localStorage.removeItem('userData')
    }
  }
})

export const { handleWalletConnect, handleWalletDisconnect } = authSlice.actions

export default authSlice.reducer
