import { useEffect, useRef, useState } from 'react';
import TerminalAnimation from './TerminalAnimation';
import './UnderTheHood.css';

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

export default function UnderTheHood() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);
  const videoCardRef = useRef(null);
  const videoElRef = useRef(null);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const ob = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setVisible(true);
        el.classList.add('is-visible');
        ob.disconnect();
      }
    }, { threshold: 0.1 });
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  useEffect(() => {
    const video = videoElRef.current;
    if (!video || !visible) return;
    if (video.readyState >= 2) {
      video.currentTime = 0;
    }
  }, [visible]);

  useEffect(() => {
    const video = videoElRef.current;
    const card = videoCardRef.current;
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!video || !card || !canvas || !section) return;

    let docTop = 0;
    let total = 0;

    const sync = () => {
      docTop = section.getBoundingClientRect().top + window.scrollY;
      total = section.offsetHeight - window.innerHeight;
    };
    sync();

    const ctx = canvas.getContext('2d', { alpha: false });
    let ctxReady = false;

    const fitCanvas = () => {
      if (!video.videoWidth) return;
      const rect = canvas.getBoundingClientRect();
      const w = Math.round(rect.width);
      const h = Math.round(rect.height);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      ctxReady = true;
    };

    const draw = () => {
      if (!video.videoWidth) return;
      if (!ctxReady) fitCanvas();
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    };

    const drawFallback = () => {
      if (!ctxReady) fitCanvas();
      ctx.fillStyle = '#0a0a0a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const onResize = () => {
      sync();
      ctxReady = false;
      fitCanvas();
      if (video.readyState >= 2 && video.duration) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      }
    };
    window.addEventListener('resize', onResize);

    const seekDraw = (t) => {
      video.removeEventListener('seeked', draw);
      video.currentTime = t;
      video.addEventListener('seeked', draw, { once: true });
    };

    let lastSeeked = -1;
    const frameDur = 1 / 60;

    const loop = () => {
      if (video.readyState >= 2 && video.duration) {
        fitCanvas();
        const scrollP = clamp((window.scrollY - docTop) / Math.max(total, 1), 0, 1);
        const vh = window.innerHeight;

        const holdEnd = 0.2;
        const pullEnd = 0.4;
        if (scrollP < holdEnd) {
          card.style.transform = `translateY(${vh}px)`;
          if (video.currentTime !== 0) { video.currentTime = 0; draw(); }
          lastSeeked = -1;
        } else if (scrollP < pullEnd) {
          const p = clamp((scrollP - holdEnd) / (pullEnd - holdEnd), 0, 1);
          card.style.transform = `translateY(${(1 - p) * vh}px)`;
          if (video.currentTime !== 0) { video.currentTime = 0; draw(); }
          lastSeeked = -1;
        } else {
          card.style.transform = 'translateY(0)';
          const playP = clamp((scrollP - pullEnd) / (1 - pullEnd), 0, 1);
          const target = Math.round(playP * video.duration / frameDur) * frameDur;
          if (Math.abs(target - lastSeeked) > frameDur * 0.1) {
            seekDraw(target);
            lastSeeked = target;
          }
        }
      } else {
        drawFallback();
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    video.addEventListener('loadeddata', () => {
      fitCanvas();
      if (video.readyState >= 2) {
        video.currentTime = 0;
        video.addEventListener('seeked', draw, { once: true });
      }
    }, { once: true });

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <section className="uth-section" ref={sectionRef} id="s4">
      <div className="uth-content">
        <div className="uth-glow" />
        <div className="uth-container">
          <div className={`uth-left ${visible ? 'uth-left--visible' : ''}`}>
            <span className="uth-label">HOW RAY WORKS</span>
            <h2 className="uth-heading">Under the Hood.</h2>
          </div>
          <div className={`uth-right ${visible ? 'uth-right--visible' : ''}`}>
            <div className="uth-right-inner">
              <TerminalAnimation />
              <div className="uth-video-card" ref={videoCardRef}>
                <canvas ref={canvasRef} />
                <video ref={videoElRef} src="/assets/demovid-ezgif.mp4" muted playsInline preload="auto" style={{ position: 'absolute', width: 1, height: 1, opacity: 0, pointerEvents: 'none' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="uth-section-spacer" />
    </section>
  );
}
