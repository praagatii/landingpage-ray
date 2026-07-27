import { useEffect, useRef, useCallback } from 'react';
import AnimatedHeadline from './AnimatedHeadline';

function App() {
  const wrapRef = useRef(null);
  const phoneRef = useRef(null);
  const ph1Ref = useRef(null);
  const heroRef = useRef(null);
  const s2ContentRef = useRef(null);
  const s2Ref = useRef(null);
  const ticking = useRef(false);

  const update = useCallback(() => {
    const wrap = wrapRef.current;
    const phone = phoneRef.current;
    const ph1 = ph1Ref.current;
    const hero = heroRef.current;
    if (!wrap || !phone || !ph1) return;

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const s = Math.min(vw, vh);
    const pw = phone.offsetWidth;
    const max = document.body.scrollHeight - window.innerHeight;
    const p = Math.min(1, Math.max(0, window.scrollY / max));

    const kf1x = vw - pw - vw * 0.03;
    const kf1y = vh * 0.11;
    const kf2x = s * 0.1;
    const kf2y = -vh * 0.06;
    const sc = 1 - p * 0.12;

    wrap.style.transform = `translate3d(${kf1x + (kf2x - kf1x) * p}px, ${kf1y + (kf2y - kf1y) * p}px, 0) scale(${sc})`;

    const raw = Math.min(1, Math.max(0, (p - 0.15) * 1.5));
    const fade = raw * raw * (3 - 2 * raw);
    phone.style.opacity = 1 - fade;
    ph1.style.opacity = fade;

    const heroFade = Math.min(1, p * 3);
    if (hero) hero.style.opacity = 1 - heroFade;

    const s2 = s2Ref.current;
    const s2c = s2ContentRef.current;
    if (s2 && s2c) {
      const s2Top = s2.offsetTop;
      const s2H = s2.offsetHeight;
      const scrollCenter = window.scrollY + vh * 0.5;
      const s2Center = s2Top + s2H * 0.5;
      const dist = Math.abs(scrollCenter - s2Center);
      const threshold = vh * 0.25;
      const s2Progress = Math.min(1, Math.max(0, 1 - dist / threshold));
      s2c.style.opacity = s2Progress;
    }

    ticking.current = false;
  }, []);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(update);
      ticking.current = true;
    }
  }, [update]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', update);
    update();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', update);
    };
  }, [handleScroll, update]);

  return (
    <>
      <nav>
        <img src="/logoray.png" alt="logoray" className="logo" />
        <ul className="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>

      <div className="section-1">
        <img src="/hero.png" alt="" className="bg-hero" ref={heroRef} />
        <AnimatedHeadline />
      </div>

      <div className="section-2" ref={s2Ref}>
        <div className="s2-content" ref={s2ContentRef}>
          <img src="/sec2.png" alt="" className="s2-image" />
        </div>
      </div>

      <div id="phoneWrap" ref={wrapRef}>
        <img src="/ph.png" alt="" id="phone" ref={phoneRef} />
        <img src="/ph3.png" alt="" id="ph1" ref={ph1Ref} />
      </div>
    </>
  );
}

export default App;
