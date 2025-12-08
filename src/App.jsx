import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ImageUpload from './components/ImageUpload';
import ResultShowcase from './components/ResultShowcase';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen selection:bg-violet-500/30">
      <Navbar />
      <main>
        <Hero />
        <ImageUpload />
        <ResultShowcase />
      </main>
      <Footer />
    </div>
  );
}

export default App;
