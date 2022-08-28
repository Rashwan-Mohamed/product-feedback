import { configureStore } from '@reduxjs/toolkit';
import productRequestsReducer from '../features/productRequests/productRequestsrSlice'
import showCatReducer from '../features/showCat/showCatSlice'

export const store = configureStore({
  reducer: {
    productRequests: productRequestsReducer,
    showCat:showCatReducer,
  },
})
