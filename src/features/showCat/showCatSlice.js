import { createSlice } from '@reduxjs/toolkit'

const initialState = 'All'

export const showCatSlice = createSlice({
  name: 'showCat',
  initialState,
  reducers: {
    changeCat: (state, action) => {
      return (state = action.payload.showCat)
    },
  },
})

export const { changeCat } = showCatSlice.actions

export default showCatSlice.reducer
