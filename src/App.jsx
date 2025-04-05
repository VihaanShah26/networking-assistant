import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Home from './pages/Home';
import Profile from './pages/Profile';
import Network from './pages/Network';
import './App.css'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/network" element={<Network />} />
      </Routes>
    </Router>
  );
};

export default App;