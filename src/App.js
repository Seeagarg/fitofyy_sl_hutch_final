import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Home from './components/Home'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import SingleVideo from './components/SingleVideo'
import Login from './components/Login'
import OtpValidationPage from './Pages/OtpValidationPage'
import SubscriptionPage from './Pages/SubscriptionPage'
import CheckCookieRedirect from './components/CheckCookieRedirect'
const App = () => {

  return (
    <div>
     <BrowserRouter>
       <Routes>
       <Route path='/' element={<CheckCookieRedirect />} />

        <Route path='/login' element={<Login/>}/>
          <Route path='/home' element={<Home/>}/>
           <Route path='/videos/:id' element={<SingleVideo/>}/>
           <Route path="/subscribe" element={<SubscriptionPage/>}/>
          <Route path="/otp-validation" element={<OtpValidationPage/>}/>
       </Routes>
      
     </BrowserRouter>
    
    </div>
  )
}

export default App
