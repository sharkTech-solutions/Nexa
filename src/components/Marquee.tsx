import React from 'react';

export default function Marquee() {
  const items = [
    'Google Meu Negócio',
    'Landing Pages Corporativas',
    'Multiatendimento Centralizado',
    'WhatsApp Business Oficial',
    'Atração Geolocalizada',
    'Zero Vendas Perdidas',
  ];

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {items.concat(items).map((item, index) => (
          <React.Fragment key={index}>
            <span>{item}</span>
            <em>✦</em>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

