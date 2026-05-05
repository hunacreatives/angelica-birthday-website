import { useEffect, useState } from 'react';

export default function CinematicContent() {
  const [introVisible, setIntroVisible] = useState(true);
  const [introFading, setIntroFading] = useState(false);
  const [showHeadline, setShowHeadline] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [showRSVP, setShowRSVP] = useState(false);

  // Photo hover states
  const [photoHover, setPhotoHover] = useState<number | null>(null);

  useEffect(() => {
    // Intro sequence
    const introTimers = [
      setTimeout(() => setIntroFading(true), 2200),
      setTimeout(() => {
        setIntroVisible(false);
        setShowHeadline(true);
      }, 3000),
    ];

    // Staggered content reveal after intro
    const contentTimers = [
      setTimeout(() => setShowMessage(true), 3800),
      setTimeout(() => setShowDetails(true), 4600),
      setTimeout(() => setShowRSVP(true), 5400),
    ];

    return () => {
      introTimers.forEach(clearTimeout);
      contentTimers.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="relative z-10 min-h-screen flex flex-col items-center px-4 py-16 md:py-20">
      {/* INTRO OVERLAY — centered headline */}
      {introVisible && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-[#F5EDE6] transition-opacity duration-[1200ms] ease-out ${
            introFading ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <div className="text-center px-6">
            <h1
              className="font-script text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#C0606E] leading-[1.15] drop-shadow-sm"
              style={{ textShadow: '0 2px 20px rgba(192,96,110,0.15)' }}
            >
              <span className="block">Gel is</span>
              <span className="block">turning thirty!</span>
            </h1>
          </div>
        </div>
      )}

      {/* Center content container */}
      <div className="max-w-[520px] lg:max-w-[900px] w-full text-center">

        {/* HEADLINE */}
        <div
          className={`transition-all duration-[1800ms] ease-out ${
            showHeadline
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <h1 className="font-script text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-[#C0606E] leading-[1.15] drop-shadow-sm"
            style={{ textShadow: '0 2px 20px rgba(192,96,110,0.15)' }}
          >
            <span className="block whitespace-nowrap">Gel is</span>
            <span className="block whitespace-nowrap">turning thirty!</span>
          </h1>
        </div>

        {/* POLAROID PHOTOS */}
        <div
          className={`flex flex-row items-center justify-center gap-0 mt-10 md:mt-14 transition-all duration-[1500ms] ease-out ${
            showHeadline
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6'
          }`}
          style={{ transitionDelay: showHeadline ? '600ms' : '0ms' }}
        >
          {/* Left Photo */}
          <div
            className="relative transition-all duration-500"
            style={{ transform: photoHover === 0 ? 'rotate(0deg) translateY(-10px) scale(1.05)' : 'rotate(-2deg) translateY(0px) scale(1)' }}
            onMouseEnter={() => setPhotoHover(0)}
            onMouseLeave={() => setPhotoHover(null)}
          >
            {/* Party Hat Sticker */}
            <div
              className="absolute -top-3 right-[40%] z-20 w-16 h-20 md:w-24 md:h-32 lg:w-28 lg:h-36 transition-transform duration-500"
              style={{ transform: `rotate(-12deg) ${photoHover === 0 ? 'scale(1.15)' : 'scale(1)'}` }}
            >
              <img
                src="https://storage.readdy-site.link/project_files/1eb2dcfe-54c4-4a76-9638-7f7316aecfc8/70b431ef-41c1-4f31-91be-387273c64dde_Party-Hat.png?v=a03fc819403495eb1c7404a0220d2d0f"
                alt="Party hat"
                className="w-full h-full object-contain drop-shadow-md"
              />
            </div>
            <img
              src="/photo-2.png"
              alt="Gel's photo"
              className="w-52 sm:w-60 md:w-72 lg:w-96 drop-shadow-lg"
            />
          </div>

          {/* Right Photo */}
          <div
            className="relative transition-all duration-500 -ml-10 sm:-ml-12 md:ml-0"
            style={{ transform: photoHover === 1 ? 'rotate(0deg) translateY(-10px) scale(1.05)' : 'rotate(2deg) translateY(0px) scale(1)' }}
            onMouseEnter={() => setPhotoHover(1)}
            onMouseLeave={() => setPhotoHover(null)}
          >
            <img
              src="/photo-1.png"
              alt="Gel's photo"
              className="w-52 sm:w-60 md:w-72 lg:w-96 drop-shadow-lg"
            />
            {/* Heart Sticker */}
            <div
              className="absolute -bottom-1 -right-3 z-20 w-14 h-14 md:w-[72px] md:h-[72px] lg:w-24 lg:h-24 transition-transform duration-500"
              style={{ transform: `rotate(8deg) ${photoHover === 1 ? 'scale(1.2)' : 'scale(1)'}` }}
            >
              <img
                src="https://storage.readdy-site.link/project_files/1eb2dcfe-54c4-4a76-9638-7f7316aecfc8/003413c6-11e3-47f6-b4ce-b6db0078528d_Heart.png?v=2daccf140043aa5d7cdac026db038624"
                alt="Heart sticker"
                className="w-full h-full object-contain drop-shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Heart doodles scattered */}
        <div
          className={`relative w-full max-w-sm mx-auto mt-5 h-6 transition-all duration-[1200ms] ease-out ${
            showHeadline ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: showHeadline ? '1200ms' : '0ms' }}
        >
          <svg className="absolute left-[12%] top-0 animate-float-slow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4727A" strokeWidth="1.3">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <svg className="absolute right-[18%] top-1 animate-float" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F4A6A3" strokeWidth="1">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </div>

        {/* INVITATION MESSAGE */}
        <div
          className={`mt-10 md:mt-14 transition-all duration-[1800ms] ease-out ${
            showMessage
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6'
          }`}
        >
          <p
            className="font-handwritten text-xl sm:text-2xl md:text-[26px] lg:text-3xl text-[#8B9A6E] leading-[1.5] max-w-[460px] lg:max-w-[560px] mx-auto"
            style={{ transform: 'rotate(-0.5deg)', textShadow: '0 1px 8px rgba(139,154,110,0.1)' }}
          >
            Join me for an intimate dinner
            <br />
            as we celebrate this milestone together!
          </p>
        </div>

        {/* EVENT DETAILS */}
        <div
          className={`mt-8 md:mt-10 space-y-1 transition-all duration-[1500ms] ease-out ${
            showDetails
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-5'
          }`}
        >
          <p
            className="font-handwritten text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#8B9A6E] leading-tight"
            style={{ transform: 'rotate(-0.3deg)', textShadow: '0 1px 10px rgba(139,154,110,0.1)' }}
          >
            May 11, 7:00pm
          </p>
          <p
            className="font-handwritten text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#8B9A6E] leading-tight"
            style={{ transform: 'rotate(0.3deg)', textShadow: '0 1px 10px rgba(139,154,110,0.1)' }}
          >
            La Terraza, Montebello
          </p>
        </div>

        {/* DECORATIVE DIVIDER */}
        <div
          className={`mt-10 flex justify-center transition-all duration-[1200ms] ease-out ${
            showDetails ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transitionDelay: showDetails ? '500ms' : '0ms' }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-px bg-[#C9A0A0]/50" />
            <svg width="16" height="16" viewBox="0 0 24 24" fill="#C9A0A0" opacity="0.6">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <div className="w-10 h-px bg-[#C9A0A0]/50" />
          </div>
        </div>

      </div>
    </div>
  );
}
