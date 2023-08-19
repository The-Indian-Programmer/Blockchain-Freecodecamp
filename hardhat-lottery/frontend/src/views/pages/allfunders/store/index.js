// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

export const getMails = createAsyncThunk('appEmail/getMails', async params => {
  const response = await axios.get('/apps/email/emails', { params })
  return {
    params,
    data: response.data
  }
})



export const appEmailSlice = createSlice({
  name: 'appEmail',
  initialState: {
    mails: [],
  },
  reducers: {
    selectMail: (state, action) => {
      const selectedMails = state.selectedMails
      if (!selectedMails.includes(action.payload)) {
        selectedMails.push(action.payload)
      } else {
        selectedMails.splice(selectedMails.indexOf(action.payload), 1)
      }
      state.selectedMails = selectedMails
    },
    selectAllMail: (state, action) => {
      const selectAllMailsArr = []
      if (action.payload) {
        selectAllMailsArr.length = 0
        state.mails.forEach(mail => selectAllMailsArr.push(mail.id))
      } else {
        selectAllMailsArr.length = 0
      }
      state.selectedMails = selectAllMailsArr
    },
    resetSelectedMail: state => {
      state.selectedMails = []
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getMails.fulfilled, (state, action) => {
        state.mails = action.payload.data.emails
      })
  }
})

export const { selectMail, selectAllMail, resetSelectedMail } = appEmailSlice.actions

export default appEmailSlice.reducer
