import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Technologies from './components/Technologies';
import Education from './components/Education';
import Projects from './components/Projects';
import Contact from './components/Contact';
import LightRays from './components/LightRays';

const App = () => {
  return (
    <div className="overflow-x-hidden text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-900">
      <div className="fixed top-0 -z-10 h-full w-full bg-neutral-950">
        <LightRays
          raysOrigin="top-center"
          raysColor="#7c3aed"
          raysSpeed={0.8}
          lightSpread={1.4}
          rayLength={2.2}
          pulsating={true}
          followMouse={true}
          mouseInfluence={0.18}
          noiseAmount={0.025}
          distortion={0.06}
          fadeDistance={1.2}
          saturation={1.0}
        />
      </div>

      <div className="container mx-auto px-8">
        <Navbar />
        <Hero />
        <Technologies />
        <Education />
        <Projects />
        <Contact />
      </div>
    </div>
  );
};

export default App;

