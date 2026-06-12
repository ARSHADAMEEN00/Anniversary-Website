import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import LandingPage from '../pages/LandingPage.jsx';
import PuzzlePage from '../pages/PuzzlePage.jsx';
import CeremonyPage from '../pages/CeremonyPage.jsx';
import CertificatePage from '../pages/CertificatePage.jsx';

export default function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/timeline" element={<PuzzlePage />} />
        <Route path="/ceremony" element={<CeremonyPage />} />
        <Route path="/certificate" element={<CertificatePage />} />
      </Routes>
    </AnimatePresence>
  );
}
