import React,{lazy,Suspense} from 'react'

const LoginPage =lazy(()=>import('./pages/login/loginPage'))
const HomePage =lazy(()=>import('./pages/home/HomePage'))
const PricingPage =lazy(()=>import('./pages/PricingPage'))
const AdvertisePage =lazy(()=>import('./pages/AdvertisePage'))


import { Route, Routes } from 'react-router-dom'
import BrickLoader from './components/brickLoader'
import EmailverifyPage from './pages/email/emailverifyPage'
import NotFoundPage from './pages/404/404Page'



function App() {

  return (
    <div>
      <Suspense fallback={<BrickLoader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/advertise" element={<AdvertisePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-email/:userId" element={<EmailverifyPage />} />
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
      </Suspense>
    </div>
  )
}

export default App
