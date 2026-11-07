import React from 'react';
import { getWhatsAppUrl } from '@/lib/constants';

export default function FinalCta() {
  return (
    <section className="final wrap px-5 md:px-6 py-6 md:py-24" aria-label="Chamada para Ação Final">
      <div className="final-in spot">
        <span className="eyebrow">Próximo Passo</span>
        <h2>Elimine a demora no atendimento e aumente o faturamento da sua operação.</h2>
        <a
          className="btn btn-primary btn-xl"
          href={getWhatsAppUrl(
            'Olá! Gostaria de implementar a estrutura de atendimento da NEXA Digital na minha empresa. Como começamos?'
          )}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Iniciar atendimento no WhatsApp ↗</span>
        </a>
      </div>
    </section>
  );
}

