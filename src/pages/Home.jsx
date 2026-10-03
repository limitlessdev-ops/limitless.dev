import { useState, useEffect } from 'react';
import LoadingScreen from '../components/animations/LoadingScreen';
import Navbar from '../components/layout/Navbar';
import OptionWheel from '../components/OptionWheel';
import { AuroraBackground } from '../components/lightswind/aurora-background';
import { useFadeInUp, useScaleIn } from '../hooks/useScrollAnimations';
import { useParallax } from '../hooks/useScrollAnimations';
import { gsap } from '../hooks/useLenis';
import WordReveal from '../components/animations/WordReveal';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Only hero gets parallax — lightweight single instance
  const heroParallax = useParallax(0.25);

  const services1 = useFadeInUp(0);
  const services2 = useFadeInUp(0.15);
  const services3 = useFadeInUp(0.3);

  const work1 = useScaleIn(0);
  const work2 = useScaleIn(0.15);
  const work3 = useScaleIn(0.3);

  // Step 1: Set initial position on mount — loading screen covers this
  useEffect(() => {
    const el = heroParallax.current;
    if (!el) return;
    gsap.set(el, { y: 200, opacity: 0 });
  }, []);

  // Step 2: Animate in AFTER loading screen fully disappears
  useEffect(() => {
    if (isLoading) return;
    const el = heroParallax.current;
    if (!el) return;

    gsap.to(el, {
      y: 0,
      opacity: 1,
      duration: 1.2,
      delay: 0.15,
      ease: 'power3.out',
      force3D: true,
    });
  }, [isLoading]);

  const handleWheelChange = (index, label) => {
    console.log('Wheel selected:', label);
  };

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <div className={`bg-black text-white ${isLoading ? 'h-screen overflow-hidden' : ''}`}>
        <Navbar />

        {/* Logo top-left */}
        <div className="fixed top-8 left-8 md:left-12 z-40">
          <a href="#" className="text-2xl font-bold tracking-tight text-white">
            Limitless<span className="text-gray-500">Dev</span>
          </a>
        </div>

        {/* OptionWheel right side */}
        <div className="fixed right-0 top-0 h-screen w-32 md:w-64 z-40 pointer-events-none">
          <div className="h-full w-full pointer-events-auto flex items-center justify-end">
            <OptionWheel
              items={['Strategy', 'Design', 'Development', 'Marketing', 'Support']}
              defaultSelected={2}
              onChange={handleWheelChange}
              textColor="#444444"
              activeColor="#ffffff"
              side="right"
              fontSize={1.5}
              spacing={1.6}
              curve={1.2}
              tilt={10}
            />
          </div>
        </div>

        {/* ─── SECTION 1: HERO ─────────────────────────────────── */}
        <section className="relative h-screen overflow-hidden flex items-center justify-center">
          <AuroraBackground className="!bg-black absolute inset-0 w-full h-full" />

          {/* Parallax + entrance wrapper */}
          <div ref={heroParallax} className="relative z-10 flex flex-col items-center text-center px-6 space-y-8">

            {/* Line 1 — word by word */}
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tighter text-white drop-shadow-2xl leading-[1.1]">
              <WordReveal
                text="We build fast,"
                trigger={!isLoading}
                delay={0.1}
                stagger={0.08}
                duration={1}
                className="block"
                as="span"
              />
              <WordReveal
                text="modern websites."
                trigger={!isLoading}
                delay={0.38}
                stagger={0.08}
                duration={1}
                className="block"
                as="span"
              />
            </h1>

            {/* Subtext — word by word, slightly slower stagger */}
            <p className="text-base md:text-lg text-gray-300 max-w-xl font-medium">
              <WordReveal
                text="Limitless Dev transforms your ideas into stunning digital reality."
                trigger={!isLoading}
                delay={0.65}
                stagger={0.05}
                duration={0.8}
                as="span"
              />
            </p>

            {/* CTA buttons fade in after words settle */}
            <div
              className="flex gap-4"
              style={{ opacity: 0, transform: 'translateY(20px)', transition: 'opacity 0.7s ease, transform 0.7s ease' }}
              ref={el => {
                if (!el || isLoading) return;
                setTimeout(() => {
                  el.style.opacity = '1';
                  el.style.transform = 'translateY(0)';
                }, 1300);
              }}
            >
              <a href="#work" className="px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-all shadow-xl hover:scale-105 duration-200">
                View Our Work
              </a>
              <a href="#contact" className="px-8 py-4 border border-white/20 text-white rounded-full font-bold hover:bg-white/10 transition-all backdrop-blur-md hover:scale-105 duration-200">
                Get a Free Quote
              </a>
            </div>
          </div>
        </section>

        {/* ─── SECTION 2: SERVICES ─────────────────────────────── */}
        <section id="services" className="relative min-h-screen bg-black flex items-center justify-center py-32 px-6 overflow-hidden"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
        >

          <div className="relative z-10 max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white text-center mb-20 tracking-tight">
              What We Build
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { ref: services1, title: 'Business Websites', desc: 'Fast, SEO-optimized, and designed to convert visitors into customers.', icon: '🌐' },
                { ref: services2, title: 'E-commerce Stores', desc: 'Beautiful storefronts built to drive sales and retain customers.', icon: '🛒' },
                { ref: services3, title: 'Web Applications', desc: 'Scalable, modern apps that power your most complex workflows.', icon: '⚡' },
              ].map((s, i) => (
                <div key={i} ref={s.ref} className="p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300 group">
                  <div className="text-4xl mb-6">{s.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SECTION 3: WORK / PORTFOLIO ─────────────────────── */}
        <section id="work" className="relative min-h-screen bg-[#050505] flex items-center justify-center py-32 px-6 overflow-hidden">
          {/* Static CSS glows — no JS, no jank */}
          <div className="absolute w-[600px] h-[600px] rounded-full bg-white/[0.03] blur-3xl -top-40 -left-40 pointer-events-none" />
          <div className="absolute w-[400px] h-[400px] rounded-full bg-white/[0.03] blur-3xl bottom-0 right-0 pointer-events-none" />

          <div className="relative z-10 max-w-6xl mx-auto w-full">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white text-center mb-20 tracking-tight">
              Our Work
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { ref: work1, label: 'SaaS Dashboard', bg: '#111' },
                { ref: work2, label: 'E-commerce Store', bg: '#0d0d0d' },
                { ref: work3, label: 'Marketing Site', bg: '#111' },
              ].map((w, i) => (
                <div key={i} ref={w.ref} className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 cursor-pointer hover:border-white/30 transition-all duration-500"
                  style={{ background: w.bg }}>
                  <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/80 to-transparent">
                    <span className="text-white font-bold text-lg">{w.label}</span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center text-white/20 text-sm tracking-widest uppercase">
                    {w.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SECTION 4: CONTACT CTA ──────────────────────────── */}
        <section id="contact" className="relative min-h-[60vh] bg-black flex items-center justify-center px-6 py-32 overflow-hidden">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
              Ready to build something great?
            </h2>
            <p className="text-gray-400 text-xl">Let's talk. No pressure, just possibilities.</p>
            <a href="mailto:hello@limitlessdev.com"
              className="inline-block px-10 py-5 bg-white text-black rounded-full font-bold text-lg hover:bg-gray-200 hover:scale-105 transition-all duration-200 shadow-2xl">
              Get a Free Quote →
            </a>
          </div>
        </section>

      </div>
    </>
  );
};

export default Home;
