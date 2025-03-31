import { Routes, Route } from 'react-router-dom'
import './App.css'
//import Inventory from '../Inventory/Inventory'
import Home from '../Home/Home'
import Sites from '../Sites/Sites'
import Submit from '../Submit/Submit'
import Navbar from '../Navbar/Navbar'
import NotFound from '../NotFound/NotFound'

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path='/inventory' element={<Inventory />} /> */}
        <Route path='/sites' element={<Sites />} />
        <Route path='/submit' element={<Submit />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <div className='footer'>
        <h3>CRUD</h3>
        <p id="footerP">Authors: Harman Gidda</p>
      </div>
    </>
  )
}

export default App;