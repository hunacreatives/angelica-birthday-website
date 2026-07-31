import AnimatedBackground from './components/AnimatedBackground';
import CinematicContent from './components/CinematicContent';
import RSVP from './components/RSVP';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden flex flex-col">
      {/* Full animated background layer */}
      <AnimatedBackground />

      <div className="flex-1">
        {/* Main cinematic invitation content */}
        <CinematicContent />

        {/* RSVP section (scroll-to anchor target) */}
        <RSVP />
      </div>

      <Footer />
    </div>
  );
}