import { useRef, useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import heroVideo from '../assets/hero video/himanshu-hero.mp4';
import { heroContent, socialLinks } from '../data/portfolioData';

// Points of interest in the video frame, as fractions of its 1920x1080 size.
const LAPTOP_FOCUS = { x: 0.830, y: 0.735 };
const FACE_FOCUS = { x: 0.385, y: 0.275 };

// Fallback until the video reports its own dimensions, so the control is placed
// correctly on first paint rather than waiting on metadata.
const VIDEO_ASPECT = 16 / 9;

// Below this width/height ratio, cover crops so much off the sides that the
// default 50% object-position pushes the face to the very edge of the frame —
// a phone in portrait shows it about 36px from the left. Narrower than this we
// centre the face instead; wider viewports keep the default, which already
// frames both the face and the laptop the play control pins to.
const FACE_CENTRE_MAX_RATIO = 1.2;

// Where the video sits inside the section, and where the frame's points of
// interest land on screen. Shared by the initial state and every resize so the
// object-position and the pinned control can never disagree.
const coverGeometry = (width, height, videoAspect) => {
  let renderedW, renderedH;

  if (width / height > videoAspect) {
    renderedW = width;
    renderedH = width / videoAspect;
  } else {
    renderedH = height;
    renderedW = height * videoAspect;
  }

  // Centre the face horizontally only when the crop is severe enough to have
  // shoved it aside, and only when there is slack to shift it with.
  const slackX = width - renderedW;
  const objectX =
    width / height < FACE_CENTRE_MAX_RATIO && slackX < -40
      ? Math.min(Math.max((width / 2 - FACE_FOCUS.x * renderedW) / slackX, 0), 1)
      : 0.5;

  const offsetX = slackX * objectX;
  const offsetY = (height - renderedH) / 2;

  return {
    objectPosition: `${(objectX * 100).toFixed(2)}% 50%`,
    laptop: {
      left: offsetX + LAPTOP_FOCUS.x * renderedW,
      top: offsetY + LAPTOP_FOCUS.y * renderedH,
    },
  };
};

// Room the pinned control needs to keep clear of each edge: half the 80px
// circle, plus the "Play" label below and the hint pill above.
const SAFE = { x: 104, top: 116, bottom: 124 };

// The play control sits on the laptop lid in the footage — a light, busy
// backdrop that swallowed the old translucent button. Until the reel has been
// played it wears brand red, a pulsing ring and a pointer label so it reads as
// the one thing to click; afterwards it settles back to a quiet glass button.
const PlayControl = ({ isPlaying, hasPlayed, onToggle, layout, style, hintAlign = 'center' }) => (
  <div
    style={style}
    className={`cursor-pointer group motion-safe:animate-fade-in ${layout}`}
    onClick={onToggle}
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onToggle(e);
      }
    }}
    role="button"
    tabIndex={0}
    aria-label={isPlaying ? 'Pause the intro reel' : 'Play the intro reel'}
  >
    {!hasPlayed && (
      <div
        className={`absolute bottom-full mb-2 flex flex-col gap-1 pointer-events-none ${
          hintAlign === 'left'
            ? 'left-0 items-start'
            : 'left-1/2 -translate-x-1/2 items-center'
        }`}
      >
        <span className="whitespace-nowrap rounded-full bg-[#ff2a2a] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-white shadow-lg shadow-black/50">
          Watch my intro
        </span>
        <svg
          className={`w-5 h-5 text-[#ff2a2a] motion-safe:animate-nudge-down drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)] ${
            hintAlign === 'left' ? 'ml-[18px] md:ml-[30px]' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 4v15m0 0l-6-6m6 6l6-6" />
        </svg>
      </div>
    )}

    <div className="relative">
      {/* Pulsing ring — only before the first play, so it never nags. */}
      {!hasPlayed && (
        <span className="absolute inset-0 rounded-full bg-[#ff2a2a] opacity-60 motion-safe:animate-ping" />
      )}
      <div
        className={`relative w-14 h-14 md:w-20 md:h-20 rounded-full flex justify-center items-center backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:bg-[#ff2a2a] group-hover:border-[#ff2a2a] group-hover:shadow-[0_0_40px_rgba(255,42,42,0.6)] ${
          hasPlayed
            ? 'border border-white/40 bg-black/40 shadow-[0_0_30px_rgba(0,0,0,0.45)]'
            : 'border-2 border-white/70 bg-[#ff2a2a] shadow-[0_0_40px_rgba(255,42,42,0.55)]'
        }`}
      >
        {!isPlaying ? (
          // Play Icon
          <svg className="w-6 h-6 md:w-8 md:h-8 text-white ml-0.5 md:ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        ) : (
          // Pause Icon
          <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
          </svg>
        )}
      </div>
    </div>

    <span className="text-white text-[10px] md:text-xs font-bold tracking-widest uppercase opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
      {!isPlaying ? 'Play' : 'Pause'}
    </span>
  </div>
);

const Hero = () => {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [reelPos, setReelPos] = useState(null);
  const [objectPosition, setObjectPosition] = useState(
    () => coverGeometry(window.innerWidth, window.innerHeight, VIDEO_ASPECT).objectPosition
  );

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out'
    });
    // Video does NOT autoplay anymore
  }, []);

  // The video is object-cover, so the laptop drifts as the viewport aspect
  // changes. Recompute the cover transform instead of hard-coding an offset.
  //
  // On a tall viewport, cover crops the sides so hard that the laptop sits
  // hundreds of pixels outside the frame — every tablet in portrait, for
  // instance. There is nothing to pin the control to there, so it falls back to
  // sitting in the content flow instead of being positioned off-screen.
  useEffect(() => {
    const video = videoRef.current;

    const update = () => {
      const section = sectionRef.current;
      if (!section) return;

      const { width, height } = section.getBoundingClientRect();
      const videoAspect = video?.videoWidth
        ? video.videoWidth / video.videoHeight
        : VIDEO_ASPECT;

      const geometry = coverGeometry(width, height, videoAspect);
      setObjectPosition(geometry.objectPosition);

      const { left, top } = geometry.laptop;

      // Pin only when the laptop is genuinely in frame and clear of the copy on
      // the left. A near miss is nudged back inside; a wild miss falls back.
      const inFrame =
        left <= width - 40 &&
        left >= width * 0.56 &&
        top >= 100 &&
        top <= height - 60;

      if (width < 768 || !inFrame) {
        setReelPos(null);
        return;
      }

      setReelPos({
        left: Math.min(left, width - SAFE.x),
        top: Math.min(Math.max(top, SAFE.top), height - SAFE.bottom),
      });
    };

    update();
    video?.addEventListener('loadedmetadata', update);
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);
    return () => {
      video?.removeEventListener('loadedmetadata', update);
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
    };
  }, []);

  const handleEnded = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  const toggleVideo = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <section ref={sectionRef} id="home" className="relative w-full h-screen overflow-hidden bg-black">
      {/* Background Video */}
      <video
        ref={videoRef}
        playsInline
        onPlay={() => {
          setIsPlaying(true);
          setHasPlayed(true);
        }}
        onPause={() => setIsPlaying(false)}
        onEnded={handleEnded}
        style={{ objectPosition }}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={heroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Legibility scrims — the hero footage is light-backed, so the white nav and
          overlay copy need a gradient behind them. Sits above the video, below content. */}
      <div className="absolute top-0 left-0 w-full h-32 md:h-40 bg-gradient-to-b from-black/65 via-black/25 to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-2/5 bg-gradient-to-t from-black/80 via-black/35 to-transparent z-10 pointer-events-none" />

      {/* Left Floating Social Bar for Large Screens */}
      <div className="hidden lg:flex flex-col gap-6 fixed left-6 top-1/2 -translate-y-1/2 z-50 mix-blend-difference">
        <a 
          href={socialLinks.github} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-white/60 hover:text-white transition-all duration-300 transform hover:scale-125"
          aria-label="GitHub"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
        </a>
        <a 
          href={socialLinks.linkedin} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-white/60 hover:text-white transition-all duration-300 transform hover:scale-125"
          aria-label="LinkedIn"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </a>
        <a 
          href={socialLinks.email} 
          className="text-white/60 hover:text-[#ff2a2a] transition-all duration-300 transform hover:scale-125"
          aria-label="Email"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67zM22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
          </svg>
        </a>
      </div>

      {/* Content Container */}
      <div className="absolute inset-0 z-20 px-6 pb-20 md:pb-[8%] md:px-12 max-w-7xl mx-auto flex flex-col md:flex-row justify-end md:justify-between items-start md:items-end text-left w-full">
        
        {/* Left Side: Text and Buttons */}
        <div className="flex flex-col items-start text-left max-w-2xl w-full">
          {/* Mobile / Hero inline socials */}
          <div 
            data-aos="fade-up"
            data-aos-offset="0"
            data-aos-delay="100"
            className="flex items-center gap-4 mb-5 lg:hidden drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]"
          >
            <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white" aria-label="GitHub">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
            </a>
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white" aria-label="LinkedIn">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
            </a>
            <a href={socialLinks.email} className="text-white/60 hover:text-[#ff2a2a]" aria-label="Email">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67zM22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" /></svg>
            </a>
          </div>

          {/* Availability pill */}
          <div
            data-aos="fade-up"
            data-aos-offset="0"
            data-aos-delay="50"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-3 py-1.5 backdrop-blur-md mb-5"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff2a2a] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff2a2a]" />
            </span>
            <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.18em] text-white/85">
              Available for opportunities
            </span>
          </div>

          {/* Main Heading */}
          <h1
            data-aos="fade-up"
            data-aos-offset="0"
            className="text-white text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.05] mb-5"
          >
            {heroContent.greeting},
            <span className="block text-[#ff2a2a] drop-shadow-[0_2px_12px_rgba(0,0,0,0.5)]">
              {heroContent.titleHighlight}
            </span>
          </h1>

          {/* Subheading */}
          <p
            data-aos="fade-up"
            data-aos-offset="0"
            data-aos-delay="200"
            className="text-white/85 text-sm md:text-lg font-medium leading-relaxed mb-9 max-w-lg"
          >
            {heroContent.subtitle}
          </p>

          {/* Buttons */}
          <div
            data-aos="fade-up"
            data-aos-offset="0"
            data-aos-delay="400"
            className="flex flex-row flex-wrap items-center gap-3 w-full"
          >
            {/* Primary */}
            <a
              href={heroContent.ctaPrimary.href}
              className="px-5 py-2.5 md:px-7 md:py-3 text-xs md:text-sm font-bold rounded-full bg-white text-black hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg shadow-black/30"
            >
              {heroContent.ctaPrimary.text}
            </a>

            {/* Secondary — brand accent */}
            <a
              href={heroContent.ctaSecondary.href}
              className="px-5 py-2.5 md:px-7 md:py-3 text-xs md:text-sm font-bold rounded-full bg-[#ff2a2a] text-white hover:bg-[#e01f1f] transition-all duration-300 hover:scale-105 shadow-lg shadow-[#ff2a2a]/25"
            >
              {heroContent.ctaSecondary.text}
            </a>

            {/* Resume — ghost */}
            <a
              href={heroContent.ctaResume.href}
              download
              className="px-5 py-2.5 md:px-7 md:py-3 text-xs md:text-sm font-bold rounded-full bg-white/5 border border-white/30 text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 backdrop-blur-md flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {heroContent.ctaResume.text}
            </a>
          </div>
        </div>

        {/* Play Video Button — in the flow whenever the laptop is cropped out of
            frame (phones, and any tablet held in portrait). */}
        {!reelPos && (
          <PlayControl
            isPlaying={isPlaying}
            hasPlayed={hasPlayed}
            onToggle={toggleVideo}
            hintAlign="left"
            layout="relative mt-20 md:mt-0 md:ml-8 flex flex-row items-center gap-3 self-start md:self-end shrink-0"
          />
        )}
      </div>

      {/* Play Video Button — pinned to the laptop whenever it is in frame. */}
      {reelPos && (
        <PlayControl
          isPlaying={isPlaying}
          hasPlayed={hasPlayed}
          onToggle={toggleVideo}
          style={{ left: reelPos.left, top: reelPos.top }}
          layout="absolute -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-3"
        />
      )}

      {/* Scroll Indicator */}
      <div 
        data-aos="fade-up"
            data-aos-offset="0"
        data-aos-delay="800"
        className="hidden md:block absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none"
      >
        <div className="animate-bounce">
          <svg 
            className="w-6 h-6 text-white/70 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="3" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
