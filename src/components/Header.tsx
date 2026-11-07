'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { getWhatsAppUrl } from '@/lib/constants';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="nav-wrap">
      <div className={`glass-nav ${isScrolled ? 'scrolled' : ''}`} id="nav">
        <a href="#top" className="brand" aria-label="NEXA Digital Início">
          <div className="relative w-[130px] h-[32px]">
            <Image
              src="/logo.png"
              alt="NEXA Digital Logo"
              fill
              sizes="130px"
              priority
              className="object-contain"
            />
          </div>
        </a>

        <nav className={`links ${isMenuOpen ? 'open' : ''}`} id="links">
          <a href="#metodo" onClick={closeMenu}>
            <i>01</i> Método
          </a>
          <a href="#simulador" onClick={closeMenu}>
            <i>02</i> Simulador
          </a>
          <a href="#roi" onClick={closeMenu}>
            <i>03</i> Calculadora ROI
          </a>
          <a href="#planos" onClick={closeMenu}>
            <i>04</i> Planos
          </a>
          <a href="#faq" onClick={closeMenu}>
            <i>05</i> FAQ
          </a>
        </nav>

        <a
          className="nav-cta"
          href={getWhatsAppUrl('Olá! Gostaria de conversar com a equipe da NEXA Digital.')}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Falar agora</span>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </a>

        <button
          className={`burger ${isMenuOpen ? 'active' : ''}`}
          id="burger"
          aria-label="Abrir menu de navegação"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}

