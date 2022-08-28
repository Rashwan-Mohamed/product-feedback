import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store'
import App from './App'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ProductRequests } from './features/productRequests/productRequests'
import { AddFeedback } from './features/AddFeedback'
import { EditFeedbackform } from './features/productRequests/EditFeedbackform'
import { Aside } from './features/productRequests/Aside'
import { SingleProduct } from './features/productRequests/singleProducts'
import { Roadmap } from './features/productRequests/Roadmap'
const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />}>
            <Route
              index
              element={
                <>
                  <Aside />
                  <ProductRequests />
                </>
              }
            ></Route>

            <Route path='feedback/:id' element={<SingleProduct />}></Route>
            <Route path='addFeedBack' element={<AddFeedback />}></Route>
            <Route path='Roadmap' element={<Roadmap />}></Route>
            <Route
              path='editFeedBack/:id'
              element={<EditFeedbackform />}
            ></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
