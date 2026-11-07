'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isFaded, setIsFaded] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 12) + 6;
      if (current >= 100) {
        current = 100;
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => {
          setIsFaded(true);
          document.body.classList.remove('loading');
          setTimeout(() => {
            setIsDone(true);
          }, 500);
        }, 350);
      } else {
        setProgress(current);
      }
    }, 35);

    return () => clearInterval(interval);
  }, []);

  if (isDone) return null;

  return (
    <div
      className={`preloader ${isFaded ? 'fade-out' : ''}`}
      id="preloader"
      aria-hidden="true"
    >
      <div className="pre-logo relative w-[180px] h-[44px]">
        <Image
          src="/logo.png"
          alt="NEXA Digital"
          fill
          priority
          sizes="180px"
          className="object-contain"
        />
      </div>
      <div className="pre-count">
        <span id="preNum">{progress}</span>
        <i>%</i>
      </div>
      <div className="pre-bar">
        <span id="preBar" style={{ width: `${progress}%` }}></span>
      </div>
    </div>
  );
}

