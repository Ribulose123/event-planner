import { Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPages from './pages/LandingPages';
import EventCreationPage from './component/EventCreationPage';
import SampleEventCards from './component/SampleEventCards';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPages />} />
        <Route path="/event-creation" element={<EventCreationPage />} />
        <Route path="/events" element={<SampleEventCards />} />
      </Routes>
    </div>
  );
}

export default App;
