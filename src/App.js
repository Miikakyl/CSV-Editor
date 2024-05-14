import React from "react"
import {
  BrowserRouter,
  Routes,
  Route,

} from "react-router-dom"


import MainPage from "./pages/MainPage"
import LandingPage from "./pages/LandingPage"

function App() {
  


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="MainPage" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
