import { useEffect, useRef, useState } from 'react';

export default function RSVP() {
  const sectionRef = useRef<HTMLElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    guests: '1',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await fetch('https://script.google.com/macros/s/AKfycbzqLQty1qfnHNkZJX0RxRG0-VU8OaO7LWcwXFweLv4ti0008Liapj5C5DGDv_cvbKds/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      setSubmitted(true);
      setFormData({ name: '', email: '', guests: '1', message: '' });
    } catch (err) {
      console.error('RSVP submission failed:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="rsvp" ref={sectionRef} className="relative w-full px-2 md:px-4 py-6 md:py-10">
      {/* Bottom fade gradient for readability */}
      <div className="absolute bottom-0 left-0 right-0 h-40 md:h-56 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none z-0" />

      <div
        className={`relative z-10 max-w-[480px] mx-auto transition-all duration-[2000ms] ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* DRESS CODE — always visible unless submitted */}
        {!submitted && (
          <div
            className={`-mt-24 md:-mt-28 text-center mb-10 transition-all duration-[1500ms] ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
          >
            <p className="font-script text-lg md:text-xl text-[#8B9A6E] mb-2">
              Dress Code
            </p>
            <p
              className="font-handwritten text-xl sm:text-2xl md:text-[26px] lg:text-3xl text-[#8B9A6E] leading-[1.5] max-w-[460px] lg:max-w-[560px] mx-auto px-8 sm:px-0"
              style={{ transform: 'rotate(-0.5deg)', textShadow: '0 1px 8px rgba(139,154,110,0.1)' }}
            >
              Think soft pastels, garden florals, or anything that feels like a warm spring afternoon ✿
            </p>
          </div>
        )}

        {/* RSVP CTA Button */}
        {!submitted && !showForm && (
          <div className="text-center">
            <button
              onClick={() => {
                setShowForm(true);
                requestAnimationFrame(() => {
                  setTimeout(() => {
                    formCardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }, 50);
                });
              }}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white/40 backdrop-blur-sm border border-[#D4727A]/20 text-[#C0606E] font-handwritten text-xl shadow-soft hover:bg-white/60 hover:shadow-lg transition-all duration-500 cursor-pointer whitespace-nowrap"
            >
              <span>Click here to RSVP</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>
        )}

        {/* RSVP Form Card */}
        {!submitted && showForm && (
          <div
            ref={formCardRef}
            className="bg-white/30 backdrop-blur-md rounded-2xl md:rounded-3xl border border-white/40 p-4 sm:p-6 md:p-10 shadow-soft"
            style={{ transform: 'rotate(-0.3deg)' }}
          >
            <h3 className="font-script text-2xl md:text-3xl text-[#C0606E] mb-1 text-center"
              style={{ textShadow: '0 1px 8px rgba(192,96,110,0.1)' }}
            >
              Will You Join Us?
            </h3>
            <p className="font-handwritten text-lg text-[#8B9A6E] text-center mb-8">
              I would love to celebrate with you!
            </p>

            <form
              id="rsvp-form"
              data-readdy-form
              onSubmit={handleSubmit}
              className="space-y-5 text-left"
              style={{ transform: 'rotate(0.3deg)' }}
            >
              <div>
                <label htmlFor="rsvp-name" className="font-handwritten text-base text-[#8B9A6E] block mb-1.5">
                  Your Name
                </label>
                <input
                  id="rsvp-name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/50 backdrop-blur-sm border border-[#D4727A]/15 focus:border-[#D4727A]/40 focus:outline-none focus:ring-2 focus:ring-[#D4727A]/10 text-sm text-charcoal placeholder:text-gray-300 transition-all font-sans"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="rsvp-email" className="font-handwritten text-base text-[#8B9A6E] block mb-1.5">
                  Email Address
                </label>
                <input
                  id="rsvp-email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/50 backdrop-blur-sm border border-[#D4727A]/15 focus:border-[#D4727A]/40 focus:outline-none focus:ring-2 focus:ring-[#D4727A]/10 text-sm text-charcoal placeholder:text-gray-300 transition-all font-sans"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="rsvp-guests" className="font-handwritten text-base text-[#8B9A6E] block mb-1.5">
                  Will you be bringing anyone?
                </label>
                <select
                  id="rsvp-guests"
                  name="guests"
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-white/50 backdrop-blur-sm border border-[#D4727A]/15 focus:border-[#D4727A]/40 focus:outline-none focus:ring-2 focus:ring-[#D4727A]/10 text-sm text-charcoal transition-all cursor-pointer font-sans"
                >
                  <option value="1">Nope, just me!</option>
                  <option value="2">Yes, I'm bringing 1 guest</option>
                  <option value="3">Yes, I'm bringing 2 guests</option>
                </select>
              </div>

              <div>
                <label htmlFor="rsvp-message" className="font-handwritten text-base text-[#8B9A6E] block mb-1.5">
                  A Sweet Note (Optional)
                </label>
                <textarea
                  id="rsvp-message"
                  name="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  maxLength={500}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl bg-white/50 backdrop-blur-sm border border-[#D4727A]/15 focus:border-[#D4727A]/40 focus:outline-none focus:ring-2 focus:ring-[#D4727A]/10 text-sm text-charcoal placeholder:text-gray-300 transition-all resize-none font-sans"
                  placeholder="Leave a message for Gel..."
                />
                <p className="text-xs text-gray-300 text-right mt-1 font-sans">
                  {formData.message.length}/500
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-white/50 backdrop-blur-sm border border-[#D4727A]/20 text-[#C0606E] px-8 py-3 rounded-full font-handwritten text-xl shadow-soft hover:bg-white/70 hover:shadow-lg transition-all cursor-pointer whitespace-nowrap disabled:opacity-60"
                >
                  {submitting ? 'Sending...' : 'Confirm Attendance'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-8 py-3 rounded-full font-sans text-sm text-charcoal-medium border border-blush-200 hover:bg-white/40 transition-all cursor-pointer whitespace-nowrap"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Success Message */}
        {submitted && (
          <div className="bg-white/30 backdrop-blur-md rounded-2xl md:rounded-3xl border border-white/40 p-6 sm:p-8 md:p-12 shadow-soft text-center">
            <div className="flex flex-col items-center gap-4">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="#B8C5B0" stroke="none">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <h3 className="font-script text-2xl md:text-3xl text-[#C0606E]">
                Thank You!
              </h3>
              <p className="font-handwritten text-lg text-[#8B9A6E]">
                See you on my special day!
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setShowForm(false);
                }}
                className="mt-2 font-sans text-sm text-blush-400 hover:text-blush-300 transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Signature */}
        <div className="mt-14 md:mt-20 text-center">
          <p className="font-handwritten text-sm md:text-base text-[#8B9A6E]/60">
            With love,
          </p>
          <p className="font-script text-2xl md:text-3xl text-[#C0606E] mt-1" style={{ textShadow: '0 1px 10px rgba(192,96,110,0.12)' }}>
            Gel
          </p>
        </div>

        {/* Designed by Huna Events */}
        <div className="mt-8 md:mt-12 pb-4 text-center">
          <a
            href="https://hunacreatives.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[10px] md:text-xs text-[#8B9A6E]/40 hover:text-[#8B9A6E]/70 transition-colors tracking-wider uppercase cursor-pointer"
          >
            Designed by Huna Events
          </a>
        </div>
      </div>
    </section>
  );
}
