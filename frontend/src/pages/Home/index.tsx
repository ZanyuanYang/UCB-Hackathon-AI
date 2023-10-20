import React from 'react';
import { Footer, Navbar } from '../../layouts';
import Hero from './components/Hero';
import Team from './components/Team';

function Home() {
  return (
    <main className="block">
      <Navbar />
      <Hero />
      {/*<Feature />*/}
      <Team />
      <Footer />
    </main>
  );
}

export default Home;
