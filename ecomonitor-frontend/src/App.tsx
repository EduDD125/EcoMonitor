import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import LandingPage from './pages/LadingPage';
import ReadingsPage from './pages/ReadingsPage';
import LogsPage from './pages/LogsPage';
import AuthPage from './pages/AuthPage';
import DetailReadingPage from './pages/DetailReadingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/leituras" element={<ReadingsPage />} />
        <Route path="/leituras/:id" element={<DetailReadingWrapper />} />
        <Route path="/leituras/nova_leitura" element={<DetailReadingWrapper />} />
        <Route path="/logs" element={<LogsPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </Router>
  );
}

function DetailReadingWrapper() {
  const { id } = useParams();
  return <DetailReadingPage key={id || "new"} />;
}

export default App;
