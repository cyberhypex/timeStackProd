import './App.css'
import NavBar from './Components/NavBar'
import Footer from './Components/Footer'
import { Outlet } from 'react-router-dom'

function App() {
  

  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
