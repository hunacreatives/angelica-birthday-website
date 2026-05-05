import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speedX: number;
  speedY: number;
  life: number;
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const setupScrollScrub = () => {
      const duration = video.duration;

      const handleScroll = () => {
        const scrollTop = window.scrollY || window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? Math.min(Math.max(scrollTop / docHeight, 0), 1) : 0;
        video.currentTime = scrollPercent * duration;
      };

      handleScroll();
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    };

    // iOS Safari requires a play() call before currentTime is seekable.
    // We set playbackRate=0 instead of pause() so iOS never shows the native play button overlay.
    const initVideo = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            video.playbackRate = 0;
            video.currentTime = 0;
            return setupScrollScrub();
          })
          .catch(() => {
            return setupScrollScrub();
          });
      } else {
        video.playbackRate = 0;
        return setupScrollScrub();
      }
    };

    if (video.readyState >= 1) {
      return initVideo() as unknown as (() => void);
    } else {
      video.addEventListener('loadedmetadata', initVideo, { once: true });
      return () => video.removeEventListener('loadedmetadata', initVideo);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    const particleCount = 35;
    particlesRef.current = [];
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 0.5 + Math.random() * 2,
        opacity: 0.1 + Math.random() * 0.25,
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: (Math.random() - 0.5) * 0.08 - 0.05,
        life: Math.random() * 1000,
      });
    }

    let time = 0;

    const animate = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.008;

      particlesRef.current.forEach((p) => {
        p.x += p.speedX + Math.sin(time + p.life) * 0.03;
        p.y += p.speedY;
        p.life += 1;

        // Wrap around
        if (p.x < -5) p.x = canvas.width + 5;
        if (p.x > canvas.width + 5) p.x = -5;
        if (p.y < -5) p.y = canvas.height + 5;
        if (p.y > canvas.height + 5) p.y = -5;

        // Gentle opacity pulse
        const pulse = 0.7 + Math.sin(time * 2 + p.life * 0.01) * 0.3;
        const currentOpacity = p.opacity * pulse;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 240, 245, ${currentOpacity})`;
        ctx.fill();
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <>
      {/* Portrait video - scroll scrubbed (mobile only) */}
      <video
        ref={videoRef}
        muted
        autoPlay
        playsInline
        preload="auto"
        className="fixed inset-0 z-0 w-full h-full object-cover md:hidden"
      >
        <source
          src="https://public.readdy.ai/ai/video_res/019df6be-972e-70e1-8e24-6861a2a52b96.mp4"
          type="video/mp4"
        />
      </video>

      {/* Landscape watercolor image (desktop only) */}
      <div className="fixed inset-0 z-0 hidden md:block overflow-hidden">
        <img
          src="https://storage.readdy-site.link/project_files/1eb2dcfe-54c4-4a76-9638-7f7316aecfc8/db7955d6-65cc-44c2-b44a-cb6b78d812f9_Background---Website.png?v=5334113970108d5284c00570eb7359cf"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Soft vignette overlay */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 45%, transparent 30%, rgba(150, 120, 130, 0.08) 60%, rgba(120, 90, 100, 0.15) 100%)',
        }}
      />

      {/* Pink center glow pulse */}
      <div className="fixed inset-0 z-[2] pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] w-[600px] h-[600px] rounded-full animate-glow-pulse pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(255,230,240,0.35) 0%, rgba(255,220,230,0.15) 40%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
      </div>

      {/* Subtle floating flower accents (CSS-based, very light) */}
      <div className="fixed inset-0 z-[3] pointer-events-none overflow-hidden">
        {/* Large soft circle - top left */}
        <div
          className="absolute -top-20 -left-20 w-80 h-80 rounded-full animate-float-very-slow"
          style={{
            background:
              'radial-gradient(circle, rgba(255,200,215,0.12) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        {/* Large soft circle - bottom right */}
        <div
          className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full animate-float-very-slow-reverse"
          style={{
            background:
              'radial-gradient(circle, rgba(255,235,220,0.1) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        {/* Mid soft circle - drifting */}
        <div
          className="absolute top-[30%] right-[10%] w-64 h-64 rounded-full animate-float-slow-drift"
          style={{
            background:
              'radial-gradient(circle, rgba(240,255,240,0.08) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
      </div>

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-[4] pointer-events-none"
        style={{ opacity: 0.8 }}
      />
    </>
  );
}