'use client';

import { useEffect } from 'react';

export default function SpotlightEffect() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const spotCards = document.querySelectorAll<HTMLElement>('.spot');
      spotCards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        // Apenas calcula se o mouse estiver relativamente próximo para máxima performance
        const isNear =
          e.clientX >= rect.left - 100 &&
          e.clientX <= rect.right + 100 &&
          e.clientY >= rect.top - 100 &&
          e.clientY <= rect.bottom + 100;

        if (isNear) {
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty('--mouse-x', `${x}px`);
          card.style.setProperty('--mouse-y', `${y}px`);
        }
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return null;
}

