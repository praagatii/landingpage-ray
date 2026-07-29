import { useRef, useEffect } from 'react';
import TerminalAnimation from '../components/TerminalAnimation';
import './MobileUnderTheHood.css';

export default function MobileUnderTheHood() {
  const videoRef = useRef(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <section className="muth-section" id="s4">
      <div className="muth-content">
        <div className="muth-header">
          <span className="muth-label">HOW RAY WORKS</span>
          <h2 className="muth-heading">Under the Hood.</h2>
        </div>
        <TerminalAnimation />
        <div className="muth-video-card">
          <video
            ref={videoRef}
            src="/assets/demovid-ezgif.mp4"
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            className="muth-video"
          />
        </div>
      </div>
    </section>
  );
}
