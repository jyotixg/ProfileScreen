import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AthleteProfile from './AthleteProfile';
import GuardianProfile from './GuardianProfile';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="athlete" element={<AthleteProfile />} />
          <Route path="guardian" element={<GuardianProfile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
