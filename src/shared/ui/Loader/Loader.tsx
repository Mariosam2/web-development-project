import { useEffect, useRef, useState } from "react";
import "./Loader.css";
import gsap from "gsap";

const PHRASES = ["Preparing your space...", "Loading your data...", "One last touch of magic..."];
const DURATION_MS = 4000;
const PHRASE_INTERVAL = DURATION_MS / PHRASES.length;

interface LoaderProps {
  onDone: () => void;
}

export const Loader = ({ onDone }: LoaderProps) => {
  const phraseRef = useRef<HTMLSpanElement>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const gsapContext = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          console.log("animation complete");
          setDone(true);
          onDone();
        },
      });

      tl.fromTo(
        ".increment-bar",
        { width: 0 },
        { width: "100%", duration: DURATION_MS / 1000, ease: "power2.inOut" },
        0,
      );

      tl.to(
        ".loader-progress",
        {
          innerText: 100,
          duration: DURATION_MS / 1000,
          snap: { innerText: 1 },
          modifiers: {
            innerText: (value: number) => `${Math.round(value)}%`,
          },
        },
        0,
      );

      const phrases = gsap.timeline();
      PHRASES.forEach((phrase, i) => {
        if (i > 0) {
          phrases.to(
            phraseRef.current,
            {
              opacity: 0,
              y: -10,
              duration: 0.2,
              onComplete: () => {
                if (phraseRef.current) phraseRef.current.textContent = phrase;
              },
            },
            `+=${PHRASE_INTERVAL / 1000 - 0.4}`,
          );

          phrases.to(phraseRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.2,
          });
        }
      });
    });

    return () => {
      gsapContext.revert();
    };
  }, [onDone]);

  return (
    <div
      className={`loader fixed top-0 left-0 z-50 w-full h-screen transition-opacity bg-c-light-gray duration-250 ease-elastic ${done ? "opacity-0 -z-30" : "opacity-100"}`}>
      <div className="max-w-56 mx-auto flex flex-col items-center justify-center h-full ">
        <div className="loader-text-area mb-3 text-c-dark-gray text-base xs:text-lg text-nowrap">
          <span ref={phraseRef} className="loader-phrase opacity-100 inline-block">
            {PHRASES[0]}
          </span>
        </div>
        <div className="loader-bar relative h-1.5 rounded-xl bg-c-dark border border-c-gray w-full">
          <div className="increment-bar absolute h-full bg-c-yellow rounded-xl" />
        </div>
        <div className="loader-progress  text-c-gray  w-full mt-2.5"></div>
      </div>
    </div>
  );
};
