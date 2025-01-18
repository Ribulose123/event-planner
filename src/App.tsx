import { Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPages from './pages/LandingPages'
import EventCreationPage from './component/EventCreationPage'
import EventList from './pages/EventList'

function App() {
  

  return (
    <div>
      <Routes>
      <Route path='/' element={<LandingPages/>}/>
      <Route path='/event-creation' element={<EventCreationPage/>}/>
      <Route path='/event-list' element={<EventList/>}/>
      </Routes>
    </div>
  )
}

export default App
