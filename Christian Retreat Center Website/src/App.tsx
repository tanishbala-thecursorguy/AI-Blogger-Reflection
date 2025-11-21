import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Retreats } from './pages/Retreats';
import { InnerHealingRetreat } from './pages/InnerHealingRetreat';
import { Media } from './pages/Media';
import { Charities } from './pages/Charities';
import { Support } from './pages/Support';
import { SoulFood } from './pages/SoulFood';
import { Contact } from './pages/Contact';
import { Donation } from './pages/Donation';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/retreats" element={<Retreats />} />
          <Route path="/retreats/inner-healing" element={<InnerHealingRetreat />} />
          <Route path="/retreats/:id" element={<InnerHealingRetreat />} />
          <Route path="/media" element={<Media />} />
          <Route path="/charities" element={<Charities />} />
          <Route path="/support" element={<Support />} />
          <Route path="/soul-food" element={<SoulFood />} />
          <Route path="/soul-food/:id" element={<SoulFood />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donate" element={<Donation />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
