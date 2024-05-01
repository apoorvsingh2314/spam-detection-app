
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import WelcomePage from './components/WelcomePage';
import Home from './components/Home';
import SpamDetection from './components/SpamDetection';
import { DarkModeProvider } from './DarkModeContext';
import TextAnalyzer from './components/TextAnalyzer';

function App() {
  return (
    <div className='h-screen '>
    <DarkModeProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="home" element={<Home />} />
          <Route path="spam-check" element={<SpamDetection />} />
          <Route path="predict-emotions" element={<TextAnalyzer />} />
        </Routes>
      </BrowserRouter>
    </DarkModeProvider>
    </div>
  );
}

export default App;
