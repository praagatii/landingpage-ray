import { useState, useEffect, useRef, useCallback } from 'react';

const lines = [
  { text: 'Initializing Ray...', color: '#b39aff', delay: 600 },
  { text: '', delay: 200 },
  { text: 'Loading user memory...', color: '#888', delay: 400 },
  { text: '✓ Complete', color: '#22ff73', delay: 300 },
  { text: '', delay: 200 },
  { text: 'Understanding request...', color: '#888', delay: 400 },
  { text: '✓ Intent recognized', color: '#22ff73', delay: 300 },
  { text: '', delay: 200 },
  { text: 'Planning execution...', color: '#888', delay: 400 },
  { text: '✓ Workflow generated', color: '#22ff73', delay: 300 },
  { text: '', delay: 200 },
  { text: 'Selecting tools...', color: '#32f3e9', delay: 300 },
  { text: '', delay: 100 },
  { text: '→ Google Calendar', color: '#ccc', delay: 150 },
  { text: '→ Google Maps', color: '#ccc', delay: 150 },
  { text: '→ WhatsApp', color: '#ccc', delay: 150 },
  { text: '', delay: 200 },
  { text: 'Connecting...', color: '#32f3e9', delay: 400 },
  { text: '', delay: 80 },
  { text: '✓ Calendar Connected', color: '#22ff73', delay: 200 },
  { text: '✓ Maps Connected', color: '#22ff73', delay: 200 },
  { text: '✓ WhatsApp Connected', color: '#22ff73', delay: 200 },
  { text: '', delay: 200 },
  { text: 'Executing actions...', color: '#32f3e9', delay: 400 },
  { text: '', delay: 80 },
  { text: '✓ Event Created', color: '#22ff73', delay: 200 },
  { text: '✓ Route Generated', color: '#22ff73', delay: 200 },
  { text: '✓ Message Sent', color: '#22ff73', delay: 200 },
  { text: '', delay: 300 },
  { text: '────────────────────────────────────', color: '#555', delay: 300 },
  { text: '', delay: 200 },
  { text: 'Execution Complete', color: '#fff', delay: 400 },
  { text: '', delay: 100 },
  { text: '3 Apps', color: '#888', delay: 200 },
  { text: '5 Actions', color: '#888', delay: 200 },
  { text: '0.94s', color: '#888', delay: 200 },
];

export default function TerminalAnimation() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [started, setStarted] = useState(false);
  const timeoutRef = useRef([]);
  const [isInView, setIsInView] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const start = useCallback(() => {
    let i = 0;
    const showNext = () => {
      if (i <= lines.length) {
        setVisibleCount(i);
        if (i < lines.length) {
          const t = setTimeout(showNext, lines[i].delay ?? 100);
          timeoutRef.current.push(t);
          i++;
        } else {
          const t = setTimeout(() => setShowCursor(false), 800);
          timeoutRef.current.push(t);
        }
      }
    };
    const t = setTimeout(showNext, 300);
    timeoutRef.current.push(t);
  }, []);

  useEffect(() => {
    if (isInView && !started) {
      setStarted(true);
      start();
    }
    return () => timeoutRef.current.forEach(clearTimeout);
  }, [isInView, started, start]);

  return (
    <div
      ref={rootRef}
      style={{
        width: '100%',
        maxWidth: '62rem',
        margin: '0 auto',
        padding: '40px 16px 0',
      }}
    >
      <div
        style={{
          borderRadius: '12px 12px 0 0',
          overflow: 'hidden',
          background: '#0d0d0d',
          border: '1px solid #222',
          minHeight: '28rem',
          transition: 'transform 1s cubic-bezier(0.16,1,0.3,1), opacity 1s ease',
          transform: isInView ? 'translateY(0)' : 'translateY(64px)',
          opacity: isInView ? 1 : 0,
        }}
      >
        {/* Title bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 20px',
            background: '#1a1a1a',
            borderBottom: '1px solid #222',
          }}
        >
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
          <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
          <span style={{ marginLeft: 'auto', fontSize: 13, color: '#666', fontFamily: 'monospace' }}>Ray Terminal</span>
        </div>

        {/* Terminal content */}
        <div style={{ padding: '24px 32px 32px', fontFamily: 'ui-monospace, SFMono-Regular, monospace', fontSize: 14, lineHeight: 1.6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ color: '#32f3e9' }}>$</span>
            <span style={{ color: '#fff' }}>ray run --sync</span>
            {showCursor && <span style={{ display: 'inline-block', width: 7, height: 18, background: '#32f3e9', animation: 'caretBlink 1s step-end infinite' }} />}
          </div>
          <div>
            {lines.slice(0, visibleCount).map((line, i) => (
              <div key={i} style={{ minHeight: '1.4em', color: line.color ?? '#aaa' }}>
                {line.text || '\u00A0'}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
