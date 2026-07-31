import { useEffect, useRef, useState } from 'react';

export default function RSVP() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="rsvp" ref={sectionRef} className="relative w-full px-2 md:px-4 py-6 md:py-10">
      {/* Bottom fade gradient for readability */}
      <div className="absolute bottom-0 left-0 right-0 h-40 md:h-56 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none z-0" />

      <div
        className={`relative z-10 max-w-[480px] mx-auto transition-all duration-[2000ms] ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Event closed / next-event promo */}
        <div className="bg-white/30 backdrop-blur-md rounded-2xl md:rounded-3xl border border-white/40 p-6 sm:p-8 md:p-12 shadow-soft text-center">
          <div className="flex flex-col items-center gap-4">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="#B8C5B0" stroke="none">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <h3 className="font-script text-2xl md:text-3xl text-[#C0606E]">
              What a Celebration!
            </h3>
            <p className="font-handwritten text-lg text-[#8B9A6E]">
              Gel&apos;s 30th is officially in the books.
              <br />
              Thank you for celebrating with her.
            </p>
            <div className="pt-4 mt-2 border-t border-white/40 w-full">
              <p className="font-handwritten text-base text-[#8B9A6E] mb-4">
                Planning your own event?
              </p>
              <a
                href="https://www.hunacreatives.com/contact"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white/50 backdrop-blur-sm border border-[#D4727A]/20 text-[#C0606E] px-8 py-3 rounded-full font-handwritten text-xl shadow-soft hover:bg-white/70 hover:shadow-lg transition-all cursor-pointer whitespace-nowrap"
              >
                The RSVP Studio ›
              </a>
            </div>
          </div>
        </div>

        {/* Signature */}
        <div className="mt-14 md:mt-20 text-center">
          <p className="font-handwritten text-sm md:text-base text-[#8B9A6E]/60">
            With love,
          </p>
          <p className="font-script text-2xl md:text-3xl text-[#C0606E] mt-1" style={{ textShadow: '0 1px 10px rgba(192,96,110,0.12)' }}>
            Gel
          </p>
        </div>

      </div>
    </section>
  );
}
