import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import "./GeneratingOverlay.css";

const messages = [
  "Analyzing your goals...",
  "Selecting exercises...",
  "Optimizing sets & reps...",
  "Building your workout...",
  "Almost there...",
];

export const GeneratingOverlay = ({ isOpen }: { isOpen: boolean }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const robotRef = useRef<SVGSVGElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLSpanElement>(null);
  const barsRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!isOpen || !overlayRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });

      const robotTl = gsap.timeline();
      robotTl
        .fromTo(
          robotRef.current,
          { scale: 0, rotation: -15 },
          { scale: 1, rotation: 0, duration: 0.6, ease: "back.out(1.7)" },
        )
        .to(robotRef.current, {
          y: -8,
          duration: 1.2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

      const eyes = robotRef.current?.querySelectorAll(".robot-eye");
      if (eyes) {
        gsap.to(eyes, {
          scaleY: 0.1,
          duration: 0.12,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
          repeatDelay: 2.5,
          transformOrigin: "center center",
        });
      }

      const antenna = robotRef.current?.querySelector(".robot-antenna");
      if (antenna) {
        gsap.to(antenna, {
          fill: "#f3ff96",
          duration: 0.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (dotsRef.current) {
        const dotSpans = dotsRef.current.querySelectorAll("span");
        gsap.to(dotSpans, {
          opacity: 1,
          stagger: { each: 0.4, repeat: -1, repeatDelay: 0.4 },
          duration: 0.3,
        });
      }

      let msgIndex = 0;
      const rotateMsgs = () => {
        if (!messageRef.current) return;
        gsap.to(messageRef.current, {
          opacity: 0,
          y: -10,
          duration: 0.3,
          onComplete: () => {
            msgIndex = (msgIndex + 1) % messages.length;
            if (messageRef.current) {
              messageRef.current.textContent = messages[msgIndex];
              gsap.fromTo(messageRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3 });
            }
          },
        });
      };
      const msgInterval = setInterval(rotateMsgs, 2800);

      if (barsRef.current) {
        const bars = barsRef.current.querySelectorAll(".eq-bar");
        bars.forEach((bar, i) => {
          gsap.to(bar, {
            scaleY: gsap.utils.random(0.3, 1),
            duration: gsap.utils.random(0.3, 0.6),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.1,
            transformOrigin: "bottom center",
          });
        });
      }

      tlRef.current = robotTl;

      return () => {
        clearInterval(msgInterval);
      };
    }, overlayRef);

    return () => ctx.revert();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div ref={overlayRef} className="generating-overlay">
      <div className="generating-content">
        <svg ref={robotRef} className="robot-svg" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle className="robot-antenna" cx="60" cy="16" r="5" fill="#a0a0a0" />
          <rect x="58" y="20" width="4" height="12" rx="2" fill="#666" />

          <rect x="30" y="32" width="60" height="44" rx="10" fill="#2a2a2a" stroke="#444" strokeWidth="2" />

          <circle className="robot-eye" cx="45" cy="54" r="7" fill="#f3ff96" />
          <circle className="robot-eye" cx="75" cy="54" r="7" fill="#f3ff96" />

          <rect x="42" y="64" width="36" height="4" rx="2" fill="#555" />

          <rect x="36" y="80" width="48" height="30" rx="6" fill="#2a2a2a" stroke="#444" strokeWidth="2" />

          <circle cx="60" cy="95" r="4" fill="#f3ff96" opacity="0.6" />
        </svg>

        <div className="generating-text">
          <div ref={messageRef} className="generating-message">
            {messages[0]}
          </div>
          <span ref={dotsRef} className="generating-dots">
            <span>.</span>
            <span>.</span>
            <span>.</span>
          </span>
        </div>

        <div ref={barsRef} className="generating-eq">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="eq-bar" />
          ))}
        </div>
      </div>
    </div>
  );
};
