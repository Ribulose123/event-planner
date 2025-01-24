import { Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPages from './pages/LandingPages';
import EventCreationPage from './component/EventCreationPage';
import SampleEventCards from './component/SampleEventCards';
import EventList from './pages/EventList';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPages />} />
        <Route path="/event-creation/:category" element={<EventCreationPage />} />
        <Route path="/events" element={<SampleEventCards />} />
        <Route path="/event-list" element={<EventList />} />
        

      </Routes>
    </div>
  );
}

export default App;
