'use client';

import React, { useState, useEffect, useRef } from 'react';
import { getWhatsAppUrl } from '@/lib/constants';

function formatBRL(val: number): string {
  return val.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  });
}

export default function RoiCalculator() {
  const [vol, setVol] = useState<number>(30);
  const [ticket, setTicket] = useState<number>(250);
  const [lossPct, setLossPct] = useState<number>(30);
  const [closePct, setClosePct] = useState<number>(25);

  const [displayValue, setDisplayValue] = useState<number>(0);
  const [yearlyValue, setYearlyValue] = useState<number>(0);
  const [multiplier, setMultiplier] = useState<number>(0);
  const [ctaMsg, setCtaMsg] = useState<string>('');

  const animFrameRef = useRef<number | null>(null);
  const currentAnimValRef = useRef<number>(0);

  useEffect(() => {
    // Cálculo conforme regras de negócio do original
    const monthlyLeads = vol * 22; // 22 dias úteis
    const lostLeads = monthlyLeads * (lossPct / 100);
    const recoveredLeads = lostLeads * 0.8; // 80% recuperados
    const recoveredSales = recoveredLeads * (closePct / 100);
    const targetMonthly = Math.round(recoveredSales * ticket);
    const targetYearly = targetMonthly * 12;
    const mult = Math.max(1, Math.round(targetMonthly / 127));

    setYearlyValue(targetYearly);
    setMultiplier(mult);

    const message = `Olá! Calculei no site que posso recuperar cerca de ${formatBRL(
      targetMonthly
    )}/mês com a NEXA. Gostaria de agendar uma demonstração.`;
    setCtaMsg(message);

    // Animação de contagem suave (easeOutCubic)
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    const startValue = currentAnimValRef.current;
    const diff = targetMonthly - startValue;
    const duration = 400;
    const startTime = performance.now();

    function stepAnim(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const val = startValue + diff * ease;
      currentAnimValRef.current = val;
      setDisplayValue(val);

      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(stepAnim);
      } else {
        currentAnimValRef.current = targetMonthly;
        setDisplayValue(targetMonthly);
      }
    }

    animFrameRef.current = requestAnimationFrame(stepAnim);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [vol, ticket, lossPct, closePct]);

  const getSliderStyle = (val: number, min: number, max: number) => {
    const pct = ((val - min) / (max - min)) * 100;
    return {
      ['--pct' as string]: `${pct}%`,
    };
  };

  return (
    <section id="roi" className="section wrap px-5 md:px-6 py-6 md:py-20" aria-labelledby="roi-heading">
      <div className="sec-head">
        <span className="eyebrow">03 — Estimativa Financeira</span>
        <h2 id="roi-heading" className="!text-[22px] sm:!text-[28px] md:!text-[38px] !leading-[1.25]">
          Quanto a sua empresa
          <br />
          <span className="grad">está deixando de faturar?</span>
        </h2>
        <p className="muted">
          Ajuste os indicadores conforme a realidade do seu negócio e veja o impacto financeiro da
          redução no tempo de atendimento.
        </p>
      </div>

      <div className="roi">
        {/* Sliders Interativos (aparecem primeiro no mobile) */}
        <div className="sliders order-1 md:order-2">
          <label>
            <span>Volume de contatos novos por dia</span>
            <output id="oVol">{vol} atendimentos</output>
            <input
              type="range"
              id="rVol"
              min={5}
              max={200}
              value={vol}
              style={getSliderStyle(vol, 5, 200)}
              onChange={(e) => setVol(parseInt(e.target.value, 10))}
            />
          </label>

          <label>
            <span>Ticket médio da sua venda</span>
            <output id="oTicket">{formatBRL(ticket)}</output>
            <input
              type="range"
              id="rTicket"
              min={30}
              max={3000}
              step={10}
              value={ticket}
              style={getSliderStyle(ticket, 30, 3000)}
              onChange={(e) => setTicket(parseFloat(e.target.value))}
            />
          </label>

          <label>
            <span>Contatos perdidos hoje por demora</span>
            <output id="oLoss">{lossPct}%</output>
            <input
              type="range"
              id="rLoss"
              min={5}
              max={70}
              value={lossPct}
              style={getSliderStyle(lossPct, 5, 70)}
              onChange={(e) => setLossPct(parseInt(e.target.value, 10))}
            />
          </label>

          <label>
            <span>Sua taxa média de conversão / fechamento</span>
            <output id="oClose">{closePct}%</output>
            <input
              type="range"
              id="rClose"
              min={5}
              max={60}
              value={closePct}
              style={getSliderStyle(closePct, 5, 60)}
              onChange={(e) => setClosePct(parseInt(e.target.value, 10))}
            />
          </label>
        </div>

        {/* Resultado / Destaque (aparece por último no mobile, abaixo dos ajustes) */}
        <div className="roi-result spot order-2 md:order-1">
          <small>Faturamento Mensal Recuperado (Estimativa)</small>
          <strong id="roiValue">{formatBRL(displayValue)}</strong>

          <div className="roi-meta">
            <div>
              <small>Projeção Anual Recuperada</small>
              <b id="roiYear">{formatBRL(yearlyValue)}</b>
            </div>
            <div>
              <small>Retorno sobre R$ 127/mês</small>
              <b id="roiX">{multiplier}x</b>
            </div>
          </div>

          <a
            className="btn btn-primary"
            href={getWhatsAppUrl(ctaMsg)}
            id="roiCta"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Quero recuperar esse valor ↗</span>
          </a>

          <p className="fine text-slate-400">
            *Cálculo estimativo considerando 22 dias úteis/mês e recuperação média de 80% dos
            contatos que hoje desistem devido ao tempo de espera.
          </p>
        </div>
      </div>
    </section>
  );
}

