import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Education from './components/Education';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Portal from './components/Portal';
import { useView } from './hooks/useView';

function App() {
  const [view, setView] = useView();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar currentView={view} onViewChange={setView} />
      
      {view === 'portfolio' ? (
        <main>
          <Hero />
          <Experience />
          <Education />
          <Projects />
          <Skills />
          <Contact />
        </main>
      ) : (
        <Portal />
      )}
      
      <Footer />
    </div>
  );
}

export default App;