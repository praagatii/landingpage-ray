import { useEffect, useRef, useState } from 'react';
import './TerminalAnimation.css';

const lines = [
  { text: 'RAY AGENT v1.0', type: 'header' },
  { text: 'Status: Online', type: 'status' },
  { text: '', type: 'divider' },
  { text: 'Listening...', type: 'waiting' },
  { text: '✓ Voice detected', type: 'success' },
  { text: '"Book dinner with Sarah tomorrow at 7."', type: 'quote' },
  { text: 'Understanding intent...', type: 'waiting' },
  { text: 'Intent:  Restaurant Reservation (98%)', type: 'label' },
  { text: 'Selecting tools...', type: 'waiting' },
  { text: '✓ Google Calendar', type: 'success' },
  { text: '✓ Google Maps', type: 'success' },
  { text: '✓ WhatsApp', type: 'success' },
  { text: 'Executing workflow...', type: 'waiting' },
  { text: '✓ Calendar event created', type: 'success' },
  { text: '✓ Route generated', type: 'success' },
  { text: '✓ Message sent', type: 'success' },
  { text: 'Verifying results...', type: 'waiting' },
  { text: '✓ Success', type: 'success' },
  { text: '', type: 'divider' },
  { text: 'Execution Complete', type: 'header' },
  { text: '3 apps · 5 actions · 0.94s', type: 'status' },
];

const typingDelays = [200, 180, 150, 180, 200, 220, 180, 160, 200, 180, 180, 180, 200, 200, 200, 200, 180, 160, 150, 200, 220];

export default function TerminalAnimation() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [typedChars, setTypedChars] = useState(0);
  const containerRef = useRef(null);
  const lineRefs = useRef([]);

  useEffect(() => {
    if (containerRef.current) {
      const body = containerRef.current.querySelector('.terminal-body');
      if (body) body.scrollTop = body.scrollHeight;
    }
  }, [visibleLines, typedChars]);

  useEffect(() => {
    let currentLine = 0;
    let currentChar = 0;
    let timer;

    const tick = () => {
      if (currentLine >= lines.length) {
        timer = setTimeout(() => {
          currentLine = 0;
          currentChar = 0;
          setVisibleLines(0);
          setTypedChars(0);
          timer = setTimeout(tick, 300);
        }, 2000);
        return;
      }

      const line = lines[currentLine];
      const lineLen = line.text.length;

      if (currentChar < lineLen) {
        currentChar++;
        setTypedChars(currentChar);
        timer = setTimeout(tick, 25 + Math.random() * 20);
      } else {
        currentLine++;
        currentChar = 0;
        setVisibleLines(currentLine);
        setTypedChars(0);
        timer = setTimeout(tick, typingDelays[Math.min(currentLine, typingDelays.length - 1)] + Math.random() * 100);
      }
    };

    timer = setTimeout(tick, 400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="terminal-window" ref={containerRef}>
      <div className="terminal-header">
        <span className="terminal-dot terminal-dot--red" />
        <span className="terminal-dot terminal-dot--yellow" />
        <span className="terminal-dot terminal-dot--green" />
        <span className="terminal-status">
          <span className="terminal-status-dot" />
          LIVE
        </span>
      </div>
      <div className="terminal-body">
        {lines.map((line, i) => {
          if (i >= visibleLines) return null;
          const isLast = i === visibleLines - 1;
          const displayText = isLast ? line.text.slice(0, typedChars) : line.text;
          return (
            <div
              key={i}
              ref={el => { lineRefs.current[i] = el; }}
              className={`terminal-line terminal-line--${line.type}`}
            >
              {displayText}
              {isLast && <span className="terminal-cursor" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
