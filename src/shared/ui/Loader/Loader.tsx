import { useEffect, useRef, useState } from "react";
import "./Loader.css";

const PHRASES = [
  "Preparing your space...",
  "Loading your data...",
  "Almost ready...",
  "One last touch of magic...",
  "We're almost there...",
];
const DURATION_MS = 4000;
const PHRASE_INTERVAL = DURATION_MS / PHRASES.length;

interface LoaderProps {
  onDone: () => void;
}

export const Loader = ({ onDone }: LoaderProps) => {
  const [fadeClass, setFadeClass] = useState("phrase-enter");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const startRef = useRef(0);
  const rafIdRef = useRef(0);

  useEffect(() => {
    startRef.current = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      const pct = Math.min((elapsed / DURATION_MS) * 100, 100);
      setProgress(pct);

      if (pct < 100) {
        rafIdRef.current = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setDone(true);
          setTimeout(onDone, 250); // dopo il fade-out
        }, 250);
      }
    };

    rafIdRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafIdRef.current);
  }, []);

  useEffect(() => {
    if (phraseIndex >= PHRASES.length - 1) return;

    const timeout = setTimeout(() => {
      setFadeClass("phrase-exit");
      setTimeout(() => {
        setPhraseIndex((i) => Math.min(i + 1, PHRASES.length - 1));
        setFadeClass("phrase-enter");
      }, 300);
    }, PHRASE_INTERVAL);

    return () => clearTimeout(timeout);
  }, [phraseIndex]);

  return (
    <div
      className={`loader fixed top-0 left-0 z-50 w-screen h-screen transition-opacity bg-c-light-gray duration-250 ease-elastic ${done ? "opacity-0 -z-30" : "opacity-100"}`}>
      <div className="max-w-56 mx-auto flex flex-col items-center justify-center h-full ">
        <div className="loader-text-area mb-3 text-c-dark-gray text-xl text-nowrap">
          <span className={`loader-phrase transition-all duration-250 ease-elastic ${fadeClass}`}>
            {PHRASES[phraseIndex]}
          </span>
        </div>
        <div className="loader-bar relative h-1.5 rounded-xl bg-c-dark border border-c-gray w-full">
          <div className="increment-bar absolute h-full bg-c-yellow rounded-xl" style={{ width: `${progress}%` }} />
        </div>
        <div className="text-c-gray  w-full mt-2.5">{Math.round(progress)}%</div>
      </div>
    </div>
  );
};
