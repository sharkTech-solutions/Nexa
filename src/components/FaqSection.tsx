'use client';

import React, { useState, useRef } from 'react';

interface FaqItem {
  id: string;
  num: string;
  question: string;
  answer: string;
}

const faqList: FaqItem[] = [
  {
    id: 'faq-1',
    num: '01',
    question: 'Preciso trocar o meu número atual de WhatsApp?',
    answer:
      'Não! Configuramos a plataforma diretamente sobre o número que sua empresa já utiliza e divulga para seus clientes, mantendo todo o seu histórico e reconhecimento de marca.',
  },
  {
    id: 'faq-2',
    num: '02',
    question: 'Quantos atendentes podem responder ao mesmo tempo?',
    answer:
      'Você pode conectar múltiplos atendentes simultâneos de acordo com a sua necessidade operacional, cada um com login individual e distribuídos por setores como Comercial, Atendimento e Financeiro.',
  },
  {
    id: 'faq-3',
    num: '03',
    question: 'Qual o prazo para colocar tudo funcionando?',
    answer:
      'Nossa equipe realiza a entrega e homologação da infraestrutura em poucos dias úteis (geralmente entre 24h e 72h úteis após o alinhamento de acessos e materiais).',
  },
  {
    id: 'faq-4',
    num: '04',
    question: 'O que está incluso na mensalidade de R$ 127/mês?',
    answer:
      'Inclui a infraestrutura da plataforma em nuvem, servidores dedicados de alta estabilidade, suporte técnico especializado e atualizações contínuas de segurança. Sem fidelidade.',
  },
  {
    id: 'faq-5',
    num: '05',
    question: 'Os valores calculados na calculadora de ROI são garantidos?',
    answer:
      'A calculadora apresenta uma projeção matemática baseada nos parâmetros informados por você. O resultado demonstra o poder de não deixar clientes sem resposta rápida, embora cada negócio possua particularidades operacionais.',
  },
];

export default function FaqSection() {
  const [openId, setOpenId] = useState<string | null>(null);
  const answerRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="section wrap faq-wrap px-5 md:px-6 py-6 md:py-20" aria-labelledby="faq-heading">
      <div className="sec-head">
        <span className="eyebrow">05 — Dúvidas Frequentes</span>
        <h2 id="faq-heading">
          Perguntas frequentes.
          <br />
          <span className="grad">Esclarecimentos diretos.</span>
        </h2>
      </div>

      <div className="faq">
        {faqList.map((item) => {
          const isOpen = openId === item.id;
          const currentRef = answerRefs.current[item.id];
          const maxHeight = isOpen && currentRef ? `${currentRef.scrollHeight}px` : '0px';

          return (
            <div key={item.id} className="qa">
              <button
                className="q"
                aria-expanded={isOpen}
                onClick={() => toggle(item.id)}
              >
                <em className="font-mono">{item.num}</em>
                <span>{item.question}</span>
                <i></i>
              </button>
              <div
                className="a"
                ref={(el) => {
                  answerRefs.current[item.id] = el;
                }}
                style={{ maxHeight }}
              >
                <p>{item.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

