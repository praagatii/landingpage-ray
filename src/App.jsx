import { useLayoutEffect, useRef, useCallback, useMemo } from 'react';
import AnimatedHeadline from './AnimatedHeadline';
import PillNav from './PillNav';

const smoothstep = t => t * t * (3 - 2 * t);
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

const navItems = [
  { label: 'Home', href: '#' },
  { label: 'Working', href: '#' },
  { label: 'About', href: '#' },
  { label: 'Contact', href: '#' }
];

function App() {
  const wrapRef = useRef(null);
  const phoneRef = useRef(null);
  const ph1Ref = useRef(null);
  const heroRef = useRef(null);
  const s2ContentRef = useRef(null);
  const ticking = useRef(false);
  const resizeTick = useRef(false);
  const layoutRef = useRef({ vw: 0, vh: 0, s: 0, pw: 0, max: 1 });

  const updateLayout = useCallback(() => {
    const phone = phoneRef.current;
    if (!phone) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    layoutRef.current = {
      vw,
      vh,
      s: Math.min(vw, vh),
      pw: phone.offsetWidth,
      max: Math.max(1, document.body.scrollHeight - vh)
    };
  }, []);

  const update = useCallback(() => {
    const wrap = wrapRef.current;
    const phone = phoneRef.current;
    const ph1 = ph1Ref.current;
    const hero = heroRef.current;
    if (!wrap || !phone || !ph1) return;

    const { vw, vh, s, pw, max } = layoutRef.current;
    const p = clamp(window.scrollY / max, 0, 1);

    const kf1x = vw - pw - vw * 0.03;
    const kf1y = vh * 0.11;
    const kf2x = s * 0.1;
    const kf2y = -vh * 0.06;

    wrap.style.transform = `translate3d(${kf1x + (kf2x - kf1x) * p}px, ${kf1y + (kf2y - kf1y) * p}px, 0) scale(${1 - p * 0.12})`;

    const heroT = smoothstep(clamp(p / 0.35, 0, 1));
    phone.style.opacity = 1 - heroT;
    ph1.style.opacity = heroT;
    if (hero) hero.style.opacity = 1 - heroT;

    const s2c = s2ContentRef.current;
    if (s2c) {
      s2c.style.opacity = smoothstep(clamp((p - 0.8) / 0.2, 0, 1));
    }

    ticking.current = false;
  }, []);

  const handleScroll = useCallback(() => {
    if (!ticking.current) {
      requestAnimationFrame(update);
      ticking.current = true;
    }
  }, [update]);

  const handleResize = useCallback(() => {
    if (!resizeTick.current) {
      requestAnimationFrame(() => {
        updateLayout();
        update();
        resizeTick.current = false;
      });
      resizeTick.current = true;
    }
  }, [update, updateLayout]);

  useLayoutEffect(() => {
    updateLayout();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    update();

    const onLoad = () => {
      updateLayout();
      update();
    };
    window.addEventListener('load', onLoad);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', onLoad);
    };
  }, [handleScroll, handleResize, update, updateLayout]);

  return (
    <>
      <img src="/assets/logoray.png" alt="logoray" className="top-left-logo" />

      <PillNav
        baseColor="transparent"
        pillColor="rgba(18, 15, 23, 0.65)"
        hoveredPillTextColor="#fff"
        pillTextColor="rgba(255, 255, 255, 0.75)"
        items={navItems}
      />

      <div className="section-1">
        <img src="/assets/hero.png" alt="" className="bg-hero" ref={heroRef} />
        <AnimatedHeadline />
      </div>

      <div className="section-2">
        <div className="s2-content" ref={s2ContentRef}>
          <img src="/assets/sec2.png" alt="" className="s2-image" />
          <p className="s2-subtext">Every conversation becomes part of something bigger. Ray transforms your thoughts into a living knowledge base that grows with you, making every idea easy to find, connect, and build upon.</p>
        </div>
      </div>

      <div className="section-3" />

      <div id="phoneWrap" ref={wrapRef}>
        <img src="/assets/ph.png" alt="" id="phone" ref={phoneRef} />
        <img src="/assets/ph3.png" alt="" id="ph1" ref={ph1Ref} />
      </div>
    </>
  );
}

export default App;
