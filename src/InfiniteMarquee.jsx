import { useRef, useEffect, useState } from 'react';
import './InfiniteMarquee.css';

function InfiniteMarquee({
  logos = [],
  direction = 'left',
  speed = 50,
  gap = 32,
  logoSize = 32,
  pauseOnHover = false,
  className = '',
}) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const update = () => {
      if (trackRef.current) {
        const copy = trackRef.current.children[0];
        if (copy) {
          const w = copy.getBoundingClientRect().width;
          if (w > 0) {
            trackRef.current.style.animationDuration = `${w / Math.abs(speed)}s`;
          }
        }
      }
    };
    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('resize', update);
    window.addEventListener('load', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
      window.removeEventListener('load', update);
    };
  }, [speed]);

  return (
    <div
      ref={containerRef}
      className={`infinite-marquee${className ? ' ' + className : ''}`}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
    >
      <div
        ref={trackRef}
        className={`infinite-marquee__track${paused ? ' infinite-marquee__track--paused' : ''}`}
        style={{
          animationName: direction === 'left' ? 'marquee-left' : 'marquee-right',
          animationDuration: '30s',
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
        }}
      >
        {[0, 1].map(ci => (
          <div key={ci} className="infinite-marquee__copy" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            {logos.map((logo, li) => (
              <span
                key={li}
                className="infinite-marquee__logo"
                style={{
                  flexShrink: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: logoSize, lineHeight: 1, height: logoSize, marginRight: gap,
                }}
                title={logo.title}
              >
                {'node' in logo ? logo.node : (
                  <img src={logo.src} alt={logo.alt ?? ''} style={{ height: logoSize, width: logoSize, display: 'block', objectFit: 'contain' }} />
                )}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default InfiniteMarquee;
