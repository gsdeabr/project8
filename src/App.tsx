import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { WeChatButton } from './components/shared/WeChatButton';
import { Home } from './pages/Home';
import { Tours } from './pages/Tours';
import { TourDetail } from './pages/TourDetail';
import { Planner } from './pages/Planner';
import { Info } from './pages/Info';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';
import { Packages } from './pages/Packages';
import { Checkout } from './pages/Checkout';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/tours/:id" element={<TourDetail />} />
            <Route path="/planner" element={<Planner />} />
            <Route path="/info" element={<Info />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </main>
        <Footer />
        <WeChatButton />
      </div>
    </Router>
  );
}

export default App;