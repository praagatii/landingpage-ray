import { useEffect, useLayoutEffect, useRef } from 'react';
import Lenis from 'lenis'
import AnimatedHeadline from '../components/AnimatedHeadline';
import PillNav from '../components/PillNav';
import { BottomBlur } from '../components/EdgeBlur';
import InfiniteMarquee from '../components/InfiniteMarquee';
import CtaBanner from '../components/CtaBanner';
import Footer from '../components/Footer';
import UnderTheHood from './UnderTheHood';
import {
  SiWhatsapp, SiGmail, SiGooglecalendar, SiNotion, SiDiscord, SiSpotify,
  SiYoutube, SiGooglemaps, SiUber, SiSwiggy, SiZomato, SiGoogledrive,
  SiGoogledocs, SiChatbot, SiFigma, SiGithub, SiPhonepe, SiGooglepay,
  SiGooglehome, SiInstagram
} from 'react-icons/si';
import { FaSlack, FaAmazon } from 'react-icons/fa';

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

const topRow = [
  { node: <SiWhatsapp />, title: 'WhatsApp' },
  { node: <SiNotion />, title: 'Notion' },
  { node: <SiDiscord />, title: 'Discord' },
  { node: <SiYoutube />, title: 'YouTube' },
  { node: <SiUber />, title: 'Uber' },
  { node: <SiZomato />, title: 'Zomato' },
  { node: <SiGoogledrive />, title: 'Google Drive' },
  { node: <SiChatbot />, title: 'ChatGPT' },
  { node: <SiGithub />, title: 'GitHub' },
  { node: <SiGooglepay />, title: 'Google Pay' },
  { node: <SiInstagram />, title: 'Instagram' },
  { src: 'https://cdn.jsdelivr.net/gh/GLINCKER/thesvg@main/public/icons/canva/default.svg', alt: 'Canva', title: 'Canva' },
];

const bottomRow = [
  { node: <SiGmail />, title: 'Gmail' },
  { node: <FaSlack />, title: 'Slack' },
  { node: <SiSpotify />, title: 'Spotify' },
  { node: <SiGooglemaps />, title: 'Google Maps' },
  { node: <SiSwiggy />, title: 'Swiggy' },
  { node: <FaAmazon />, title: 'Amazon' },
  { node: <SiGoogledocs />, title: 'Google Docs' },
  { node: <SiFigma />, title: 'Figma' },
  { node: <SiPhonepe />, title: 'PhonePe' },
  { node: <SiGooglehome />, title: 'Google Home' },
  { node: <SiGooglecalendar />, title: 'Google Calendar' },
  {
    src: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdib3g9IjAgMCAyNCAyNCI+PHJlY3Qgd2lkdGg9IjI0IiBoZWlnaHQ9IjI0IiByeD0iNSIgZmlsbD0iI2ZmMmQ1NSIvPjxwYXRoIGQ9Ik0xMiAyMS4zNWwtMS40NS0xLjMyQzUuNCAxNS4zNiAyIDEyLjI4IDIgOC41IDIgNS40MiA0LjQyIDMgNy41IDNjMS43NCAwIDMuNDEuODEgNC41IDIuMDlDMTMuMDkgMy44MSAxNC43NiAzIDE2LjUgMyAxOS41OCAzIDIyIDUuNDIgMjIgOC41YzAgMy43OC0zLjQgNi44Ni04LjU1IDExLjU0TDEyIDIxLjM1eiIgZmlsbD0id2hpdGUiLz48L3N2Zz4=',
    alt: 'Apple Health',
    title: 'Apple Health',
  },
];

export default function MobileApp() {
  const phoneRef = useRef(null);
  const ph1Ref = useRef(null);

  useLayoutEffect(() => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    const lenis = new Lenis({
      lerp: 0.15,
      wheelMultiplier: 0.8,
      smoothWheel: false
    })
    lenis.on('scroll', () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const heroT = clamp(scrollY / (0.7 * vh), 0, 1);
      const smoothT = heroT * heroT * (3 - 2 * heroT);

      if (phoneRef.current) phoneRef.current.style.opacity = 1 - smoothT;
      if (ph1Ref.current) ph1Ref.current.style.opacity = smoothT;

      document.body.classList.toggle('s2-active', scrollY >= 0.95 * vh);
      document.body.classList.toggle('s3-out', scrollY >= 2.85 * vh);
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal-up, .reveal-scale, .reveal-in').forEach(el => observer.observe(el));

    return () => {
      lenis.destroy()
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <img src="/assets/logoray.png" alt="logoray" className="top-left-logo" />

      <PillNav
        baseColor="transparent"
        pillColor="rgba(18, 15, 23, 0.65)"
        hoveredPillTextColor="#fff"
        pillTextColor="rgba(255, 255, 255, 0.75)"
        items={[
          { label: 'Home', href: '#home' },
          { label: 'About', href: '#s2' },
          { label: 'Working', href: '#s4' },
          { label: 'Contact', href: '#footer' }
        ]}
      />

      <div className="section-1" id="home">
        <div className="hero-tagline">never lose<br />a thought</div>
        <AnimatedHeadline />
        <div className="hero-btns">
          <a href="#s3" className="hero-btn">Learn More</a>
          <button className="hero-btn">Contact Us</button>
        </div>
        <div id="phoneWrap">
          <div className="phone-glow" />
          <img src="/assets/ph8.png" alt="" id="phone" ref={phoneRef} />
          <img src="/assets/ph6.png" alt="" id="ph1" ref={ph1Ref} />
        </div>
      </div>

      <div className="section-2" id="s2">
        <div className="s2-content">
          <div className="s2-headline">a second<br />brain</div>
          <p className="s2-subtext">Every conversation becomes part of something bigger. Ray transforms your thoughts into a living knowledge base that grows with you, making every idea easy to find, connect, and build upon.</p>
        </div>
      </div>

      <div className="section-3" id="s3">
        <div className="s3-inner">
          <div className="s3-cta-wrap">
            <CtaBanner />
          </div>
          <div className="s3-heading-wrap">
            <div className="s3-top-row">
              <h2 className="s3-heading">Connected<br />by <span className="s3-ray-gradient">Ray</span></h2>
              <div className="s3-marquee s3-marquee--top">
                <InfiniteMarquee className="ll2" logos={bottomRow} direction="right" speed={40} gap={72} logoSize={48} pauseOnHover />
              </div>
            </div>
            <div className="s3-marquee s3-marquee--bottom">
              <InfiniteMarquee className="ll1" logos={topRow} direction="left" speed={60} gap={72} logoSize={48} pauseOnHover />
            </div>
          </div>
        </div>
      </div>
      <UnderTheHood />
      <Footer />
      <BottomBlur height={60} />
    </>
  );
}

import './App.css';