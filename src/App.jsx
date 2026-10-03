import Home from './pages/Home';
import GlowCursor from './components/GlowCursor';
import { useLenis } from './hooks/useLenis';

function App() {
  // Initialize Lenis smooth scroll globally
  useLenis();

  return (
    <GlowCursor color="#ffffff" secondaryColor="#888888">
      <Home />
    </GlowCursor>
  );
}

export default App;
