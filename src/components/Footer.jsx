import { useEffect, useRef } from 'react';
import './Footer.css';

const productLinks = [
  { label: 'How it Works', href: '#' },
  { label: 'Memory', href: '#' },
  { label: 'Pricing', href: '#' },
  { label: 'Download', href: '#' },
];

const resourceLinks = [
  { label: 'Docs', href: '#' },
  { label: 'API', href: '#' },
  { label: 'Blog', href: '#' },
  { label: 'Help', href: '#' },
];

const companyLinks = [
  { label: 'About', href: '#' },
  { label: 'Careers', href: '#' },
  { label: 'Privacy', href: '#' },
];

export default function Footer() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(([e]) => {
      document.body.classList.toggle('footer-visible', e.isIntersecting);
    }, { threshold: 0 });
    ob.observe(el);
    return () => ob.disconnect();
  }, []);
  return (
    <footer className="rf" ref={ref} id="footer">
      <div className="rf-glow" />
      <div className="rf-inner">
        <div className="rf-grid">
          <div className="rf-col rf-brand">
            <img src="/assets/logoray.png" alt="Ray" className="rf-logo" />
            <span className="rf-brand-name">Ray</span>
            <p className="rf-desc">
              Your intelligent second brain that listens, remembers, and takes action across every app you use.
            </p>
          </div>

          <div className="rf-col">
            <h4 className="rf-col-heading">Product</h4>
            <ul className="rf-links">
              {productLinks.map(l => (
                <li key={l.label}><a href={l.href} className="rf-link">{l.label}</a></li>
              ))}
            </ul>
          </div>

          <div className="rf-col">
            <h4 className="rf-col-heading">Resources</h4>
            <ul className="rf-links">
              {resourceLinks.map(l => (
                <li key={l.label}><a href={l.href} className="rf-link">{l.label}</a></li>
              ))}
            </ul>
          </div>

          <div className="rf-col">
            <h4 className="rf-col-heading">Company</h4>
            <ul className="rf-links">
              {companyLinks.map(l => (
                <li key={l.label}><a href={l.href} className="rf-link">{l.label}</a></li>
              ))}
            </ul>
          </div>

          <div className="rf-col rf-newsletter">
            <h4 className="rf-col-heading">Stay in the loop.</h4>
            <p className="rf-newsletter-desc">Get product updates, new features, and early access announcements.</p>
            <form className="rf-form" onSubmit={e => e.preventDefault()}>
              <div className="rf-input-wrap">
                <input type="email" placeholder="Enter your email" className="rf-input" />
                <button type="submit" className="rf-submit">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>
            </form>
            <p className="rf-spam">No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </div>

      <div className="rf-bottom">
        <div className="rf-bottom-inner">
          <span>&copy; 2026 Ray. All rights reserved.</span>
          <span>Privacy first, always.</span>
        </div>
      </div>
    </footer>
  );
}
