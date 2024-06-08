import React from "react"
import {
  BrowserRouter,
  Routes,
  Route,

} from "react-router-dom"


import EditingPage from "./pages/EditingPage"
import LandingPage from "./pages/LandingPage"

function App() {
  


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="EditingPage" element={<EditingPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
