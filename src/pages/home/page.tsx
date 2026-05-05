import AnimatedBackground from './components/AnimatedBackground';
import CinematicContent from './components/CinematicContent';
import RSVP from './components/RSVP';

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Full animated background layer */}
      <AnimatedBackground />

      {/* Main cinematic invitation content */}
      <CinematicContent />

      {/* RSVP section (scroll-to anchor target) */}
      <RSVP />
    </div>
  );
}