import React from 'react';
import Image from 'next/image';
import { getWhatsAppUrl } from '@/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer px-5 sm:px-6 md:px-0" role="contentinfo">
      <div className="wrap foot-grid">
        <div className="foot-brand">
          <div className="relative w-[130px] h-[32px] mb-4">
            <Image
              src="/logo.png"
              alt="NEXA Digital"
              fill
              sizes="130px"
              className="object-contain"
            />
          </div>
          <p>
            Atração local geolocalizada, landing pages corporativas e atendimento centralizado no
            WhatsApp para empresas que buscam escala comercial.
          </p>
        </div>

        <div>
          <h4>Navegação</h4>
          <a href="#metodo">O Método</a>
          <a href="#simulador">Simulador</a>
          <a href="#roi">Calculadora ROI</a>
          <a href="#planos">Planos</a>
        </div>

        <div>
          <h4>Soluções</h4>
          <a href="#planos">Landing Pages</a>
          <a href="#planos">Multiatendimento</a>
          <a href="#metodo">Google Meu Negócio</a>
        </div>

        <div>
          <h4>Contato</h4>
          <a
            href={getWhatsAppUrl('Olá! Gostaria de falar com o time da NEXA Digital.')}
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp Oficial
          </a>
          <a href="#faq">Perguntas Frequentes</a>
        </div>
      </div>

      {/* Watermark Tipográfica */}
      <div className="giant" aria-hidden="true">
        NEXA
      </div>

      <div className="wrap copy pb-14 md:pb-0">
        <span>© <span id="year">{currentYear}</span> NEXA Digital. Todos os direitos reservados.</span>
        <a href="#top">Voltar ao topo ↑</a>
      </div>
    </footer>
  );
}

