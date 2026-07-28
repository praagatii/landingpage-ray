import { FiArrowRight, FiCheck } from 'react-icons/fi';
import './CtaBanner.css';

const trustItems = [
  { icon: FiCheck, text: 'No credit card' },
  { icon: FiCheck, text: 'Free forever plan' },
  { icon: FiCheck, text: 'Cancel anytime' },
];

export default function CtaBanner() {
  return (
    <div className="cta-banner">
      <div className="cta-banner__glow" />
      <div className="cta-banner__inner">
        <div className="cta-banner__left">
          <h2 className="cta-banner__headline">
            Your life. Organized.<br />
            <span className="cta-banner__headline-accent">Your way.</span>
          </h2>
          <p className="cta-banner__description">
            Ray adapts to you so you can focus on what truly matters.
          </p>
        </div>
        <div className="cta-banner__right">
          <span className="cta-banner__eyebrow">Start your journey with Ray today.</span>
          <button className="cta-banner__button">
            Try Ray for Free
            <FiArrowRight className="cta-banner__button-icon" />
          </button>
          <div className="cta-banner__trust">
            {trustItems.map((item, i) => (
              <div key={i} className="cta-banner__trust-item">
                <item.icon className="cta-banner__trust-icon" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
