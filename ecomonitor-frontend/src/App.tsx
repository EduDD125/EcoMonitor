import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LadingPage';
import ReadingsPage from './pages/ReadingsPage';
import LogsPage from './pages/LogsPage';
import AuthPage from './pages/AuthPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/leituras" element={<ReadingsPage />} />
        <Route path="/logs" element={<LogsPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </Router>
  );
}

export default App;
