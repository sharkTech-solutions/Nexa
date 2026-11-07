'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import { getWhatsAppUrl } from '@/lib/constants';

interface Plan {
  id: string;
  number: string;
  title: string;
  description: string;
  priceLabel: string;
  priceValue: string;
  priceRecurring?: string;
  features: string[];
  ctaLabel: string;
  ctaMsg: string;
  isFeatured?: boolean;
}

const plans: Plan[] = [
  {
    id: 'lp-rapida',
    number: '01',
    title: 'LP Rápida',
    description: 'Landing page profissional de alta conversão para tráfego pago ou orgânico.',
    priceLabel: 'Investimento Único',
    priceValue: 'R$ 497',
    features: [
      'Design corporativo moderno e responsivo',
      'Otimização avançada de velocidade mobile',
      'Botão de WhatsApp com mensagem personalizada',
      'Hospedagem rápida configurada',
    ],
    ctaLabel: 'Escolher Plano',
    ctaMsg: 'Olá! Gostaria de contratar o plano LP Rápida (R$ 497 único).',
  },
  {
    id: 'multiatendimento',
    number: '02',
    title: 'Multiatendimento',
    description: 'Centralize toda a sua equipe em um único número oficial de WhatsApp.',
    priceLabel: 'Configuração Inicial',
    priceValue: 'R$ 697',
    priceRecurring: '+ R$ 127/mês',
    features: [
      'Múltiplos atendentes em simultâneo',
      'Triagem e roteamento por departamento',
      'Histórico compartilhado de conversas',
      'Suporte técnico contínuo sem fidelidade',
    ],
    ctaLabel: 'Escolher Plano',
    ctaMsg: 'Olá! Gostaria de contratar o plano Multiatendimento WhatsApp (R$ 697 + R$ 127/mês).',
  },
  {
    id: 'combo-tracao',
    number: '03',
    title: 'Combo Tração',
    description: 'Landing Page de alta performance integrada ao multiatendimento no WhatsApp.',
    priceLabel: 'Configuração Inicial',
    priceValue: 'R$ 997',
    priceRecurring: '+ R$ 127/mês',
    features: [
      'Landing Page Rápida completa',
      'Central de Multiatendimento no WhatsApp',
      'Rastreamento de conversão (Meta / Google)',
      'Treinamento operacional para a equipe',
    ],
    ctaLabel: 'Escolher Plano',
    ctaMsg: 'Olá! Gostaria de contratar o Combo Tração (R$ 997 + R$ 127/mês).',
  },
  {
    id: 'maquina-de-vendas',
    number: '04',
    title: 'Máquina de Vendas',
    description:
      'O ecossistema definitivo: atração no Google, página de conversão e atendimento integrado.',
    priceLabel: 'Configuração Completa',
    priceValue: 'R$ 1.497',
    priceRecurring: '+ R$ 127/mês',
    features: [
      'Otimização Google Meu Negócio Pro',
      'Landing Page Rápida corporativa',
      'Central de Multiatendimento configurada',
      'Acompanhamento prioritário de métricas',
      'Sem contrato de fidelidade',
    ],
    ctaLabel: 'Contratar Solução Completa ↗',
    ctaMsg:
      'Olá! Quero fechar o Combo Máquina de Vendas (R$ 1.497 + R$ 127/mês). Podem me atender agora?',
    isFeatured: true,
  },
];

// No carrossel mobile, o plano com label "Recomendado" (isFeatured) fica em 1º lugar
const mobilePlans: Plan[] = [
  ...plans.filter((p) => p.isFeatured),
  ...plans.filter((p) => !p.isFeatured),
];

export default function PlansSection() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const startXRef = useRef<number>(0);
  const startYRef = useRef<number>(0);
  const isHorizontalSwipeRef = useRef<boolean | null>(null);

  const goToPlan = useCallback((idx: number) => {
    setActiveIndex(Math.max(0, Math.min(mobilePlans.length - 1, idx)));
    setDragOffset(0);
  }, []);

  // Transição automática a cada 10 segundos no mobile (pausa durante toque manual)
  useEffect(() => {
    if (isDragging) return;

    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % mobilePlans.length);
    }, 10000);

    return () => clearInterval(timer);
  }, [isDragging, activeIndex]);

  // Gestos de Touch (Dedo no celular)
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    startXRef.current = touch.clientX;
    startYRef.current = touch.clientY;
    isHorizontalSwipeRef.current = null;
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - startXRef.current;
    const deltaY = touch.clientY - startYRef.current;

    if (isHorizontalSwipeRef.current === null) {
      if (Math.abs(deltaX) > 8 || Math.abs(deltaY) > 8) {
        isHorizontalSwipeRef.current = Math.abs(deltaX) > Math.abs(deltaY);
      }
    }

    if (isHorizontalSwipeRef.current) {
      let offset = deltaX;
      if (
        (activeIndex === 0 && deltaX > 0) ||
        (activeIndex === mobilePlans.length - 1 && deltaX < 0)
      ) {
        offset = deltaX * 0.35;
      }
      setDragOffset(offset);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (isHorizontalSwipeRef.current) {
      const threshold = 40;
      if (dragOffset < -threshold && activeIndex < mobilePlans.length - 1) {
        goToPlan(activeIndex + 1);
      } else if (dragOffset > threshold && activeIndex > 0) {
        goToPlan(activeIndex - 1);
      } else {
        setDragOffset(0);
      }
    } else {
      setDragOffset(0);
    }
    isHorizontalSwipeRef.current = null;
  };

  // Gestos de Mouse (Arrastar no computador / emulador)
  const handleMouseDown = (e: React.MouseEvent) => {
    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    isHorizontalSwipeRef.current = true;
    setIsDragging(true);
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startXRef.current;
    let offset = deltaX;
    if (
      (activeIndex === 0 && deltaX > 0) ||
      (activeIndex === mobilePlans.length - 1 && deltaX < 0)
    ) {
      offset = deltaX * 0.35;
    }
    setDragOffset(offset);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const threshold = 40;
    if (dragOffset < -threshold && activeIndex < mobilePlans.length - 1) {
      goToPlan(activeIndex + 1);
    } else if (dragOffset > threshold && activeIndex > 0) {
      goToPlan(activeIndex - 1);
    } else {
      setDragOffset(0);
    }
  };

  return (
    <section id="planos" className="section wrap px-4 sm:px-6 py-6 md:py-20" aria-labelledby="plans-heading">
      <div className="sec-head">
        <span className="eyebrow">04 — Planos Corporativos</span>
        <h2 id="plans-heading">
          Escolha a estrutura adequada
          <br />
          <span className="grad">para a escala do seu negócio.</span>
        </h2>
        <p className="muted">
          Condições transparentes, suporte técnico especializado e sem fidelidade contratual.
        </p>
      </div>

      {/* Versão Mobile: Carrossel Exclusivo de 1 Card por vez */}
      <div className="block md:hidden select-none">
        <div className="flex items-center justify-end text-xs text-slate-400 mb-2 px-3">
          <span className="font-mono text-slate-400 text-[11px] bg-slate-900/70 px-2.5 py-0.5 rounded-full border border-white/5">
            {activeIndex + 1} de {mobilePlans.length}
          </span>
        </div>

        <div
          className="relative w-full overflow-hidden touch-pan-y cursor-grab active:cursor-grabbing py-2"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            className="flex w-full will-change-transform"
            style={{
              transform: isDragging
                ? `translateX(calc(-${activeIndex * 100}% + ${dragOffset}px))`
                : `translateX(-${activeIndex * 100}%)`,
              transition: isDragging ? 'none' : 'transform 320ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            {mobilePlans.map((p) => (
              <div
                key={p.id}
                className="w-full min-w-full max-w-full flex-shrink-0 flex justify-center px-1 box-border"
              >
                <article
                  className={`plan-compact spot ${p.isFeatured ? 'featured' : ''}`}
                  aria-labelledby={`mobile-plan-${p.id}`}
                >
                  {p.isFeatured && <span className="badge-compact">Recomendado</span>}

                  <div className="flex items-center justify-between mb-1.5">
                    <span className="plan-n-compact font-mono">{p.number}</span>
                    <span className="text-xs font-mono text-sky-400/80 uppercase tracking-wider">
                      Plano {p.number}
                    </span>
                  </div>

                  <h3 id={`mobile-plan-${p.id}`} className="plan-compact-title">
                    {p.title}
                  </h3>
                  <p className="plan-compact-desc">{p.description}</p>

                  <div className="price-compact">
                    <small>{p.priceLabel}</small>
                    <div className="flex items-baseline gap-1.5">
                      <strong>{p.priceValue}</strong>
                      {p.priceRecurring && <span>{p.priceRecurring}</span>}
                    </div>
                  </div>

                  <ul className="ticks-compact">
                    {p.features.map((feat, idx) => (
                      <li key={idx}>
                        <span className="tick-check text-sky-400 font-bold shrink-0">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-2">
                    <a
                      className={`btn w-full text-center text-sm py-3 ${
                        p.isFeatured ? 'btn-primary' : 'btn-ghost'
                      }`}
                      href={getWhatsAppUrl(p.ctaMsg)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>{p.ctaLabel}</span>
                    </a>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>

        {/* Indicadores de Paginação */}
        <div className="flex justify-center items-center gap-2 mt-4">
          {mobilePlans.map((p, idx) => (
            <button
              key={p.id}
              type="button"
              aria-label={`Ver plano ${p.title}`}
              onClick={() => goToPlan(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === idx
                  ? 'w-7 bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.7)]'
                  : 'w-2.5 bg-slate-700 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Versão Desktop: Grid de 4 Colunas */}
      <div className="plans plans-desktop">
        {plans.map((p) => (
          <article
            key={p.id}
            className={`plan spot ${p.isFeatured ? 'featured' : ''}`}
            aria-labelledby={`desk-plan-${p.id}`}
          >
            {p.isFeatured && <span className="badge">Recomendado</span>}
            <span className="plan-n font-mono">{p.number}</span>
            <h3 id={`desk-plan-${p.id}`}>{p.title}</h3>
            <p className="muted">{p.description}</p>

            <div className="price">
              <small>{p.priceLabel}</small>
              <strong>{p.priceValue}</strong>
              {p.priceRecurring && <span>{p.priceRecurring}</span>}
            </div>

            <ul className="ticks">
              {p.features.map((feat, idx) => (
                <li key={idx}>{feat}</li>
              ))}
            </ul>

            <a
              className={`btn ${p.isFeatured ? 'btn-primary' : 'btn-ghost'}`}
              href={getWhatsAppUrl(p.ctaMsg)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{p.ctaLabel}</span>
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
