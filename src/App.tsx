import { Route, Routes } from 'react-router-dom';
import './App.css';
import LandingPages from './pages/LandingPages';
import EventCreationPage from './component/EventCreationPage';
import EventList from './pages/EventList';
import Category from './pages/Category';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPages />} />
        <Route path="/event-creation" element={<EventCreationPage />} />
        <Route path ="/category-list/:category" element ={<Category/>}/>
        <Route path="/event-list" element={<EventList />} />
        

      </Routes>
    </div>
  );
}

export default App;
