import React from 'react';

export default function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': 'https://nexadigital.com.br/#organization',
        name: 'NEXA Digital',
        url: 'https://nexadigital.com.br',
        logo: {
          '@type': 'ImageObject',
          url: 'https://nexadigital.com.br/logo.png',
        },
        description:
          'Atração local geolocalizada, landing pages corporativas e atendimento centralizado no WhatsApp para empresas que buscam escala comercial.',
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: '+55-11-99999-9999',
          contactType: 'sales',
          availableLanguage: ['Portuguese'],
        },
      },
      {
        '@type': 'WebSite',
        '@id': 'https://nexadigital.com.br/#website',
        url: 'https://nexadigital.com.br',
        name: 'NEXA Digital',
        publisher: {
          '@id': 'https://nexadigital.com.br/#organization',
        },
        inLanguage: 'pt-BR',
      },
      {
        '@type': 'ProfessionalService',
        '@id': 'https://nexadigital.com.br/#service',
        name: 'NEXA Digital — Atração Local & Multiatendimento WhatsApp',
        url: 'https://nexadigital.com.br',
        image: 'https://nexadigital.com.br/logo.png',
        priceRange: 'R$ 497 - R$ 1497',
        telephone: '+55-11-99999-9999',
        areaServed: 'BR',
        serviceType: [
          'Otimização Google Meu Negócio',
          'Desenvolvimento de Landing Pages Rápidas',
          'Central de Multiatendimento no WhatsApp',
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://nexadigital.com.br/#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Preciso trocar o meu número atual de WhatsApp?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Não! Configuramos a plataforma diretamente sobre o número que sua empresa já utiliza e divulga para seus clientes, mantendo todo o seu histórico e reconhecimento de marca.',
            },
          },
          {
            '@type': 'Question',
            name: 'Quantos atendentes podem responder ao mesmo tempo?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Você pode conectar múltiplos atendentes simultâneos de acordo com a sua necessidade operacional, cada um com login individual e distribuídos por setores como Comercial, Atendimento e Financeiro.',
            },
          },
          {
            '@type': 'Question',
            name: 'Qual o prazo para colocar tudo funcionando?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Nossa equipe realiza a entrega e homologação da infraestrutura em poucos dias úteis (geralmente entre 24h e 72h úteis após o alinhamento de acessos e materiais).',
            },
          },
          {
            '@type': 'Question',
            name: 'O que está incluso na mensalidade de R$ 127/mês?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Inclui a infraestrutura da plataforma em nuvem, servidores dedicados de alta estabilidade, suporte técnico especializado e atualizações contínuas de segurança. Sem fidelidade.',
            },
          },
          {
            '@type': 'Question',
            name: 'Os valores calculados na calculadora de ROI são garantidos?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'A calculadora apresenta uma projeção matemática baseada nos parâmetros informados por você. O resultado demonstra o poder de não deixar clientes sem resposta rápida, embora cada negócio possua particularidades operacionais.',
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

