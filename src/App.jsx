import { Route, Routes } from 'react-router-dom'

import './App.css'

import NavBar from './components/navbar/NavBar'
import Home from './views/Home/Home'
import Detail from './components/Detail/Detail'

function App() {

  return (
    
    <div>

      <NavBar />

      <div>
      <Routes>
        
      <Route path='/' element={<Home />} />
      <Route path='/detail/:id' element={<Detail />} />
      
      </Routes>
      </div>

    </div>
  )
}

export default App
