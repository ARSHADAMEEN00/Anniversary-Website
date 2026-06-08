import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import InvitationPage from '../pages/InvitationPage.jsx';
import PuzzlePage from '../pages/PuzzlePage.jsx';
import CeremonyPage from '../pages/CeremonyPage.jsx';
import CertificatePage from '../pages/CertificatePage.jsx';

export default function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<InvitationPage />} />
        <Route path="/timeline" element={<PuzzlePage />} />
        <Route path="/ceremony" element={<CeremonyPage />} />
        <Route path="/certificate" element={<CertificatePage />} />
      </Routes>
    </AnimatePresence>
  );
}
