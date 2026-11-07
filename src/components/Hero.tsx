'use client';

import React, { useEffect, useRef, useState } from 'react';
import { getWhatsAppUrl } from '@/lib/constants';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [clock, setClock] = useState('--:--:--');
  const [barHeights, setBarHeights] = useState([40, 65, 50, 80, 95, 70, 85, 100, 75, 90, 80, 95]);

  // Relógio em tempo real
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setClock(now.toTimeString().split(' ')[0]);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Animação suave periódica das barras
  useEffect(() => {
    const barTimer = setInterval(() => {
      setBarHeights((prev) =>
        prev.map((h) => {
          const randVariation = Math.floor(Math.random() * 21) - 10;
          return Math.min(100, Math.max(25, h + randVariation));
        })
      );
    }, 2800);
    return () => clearInterval(barTimer);
  }, []);

  // Efeito 3D Tilt suave no painel
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = panel.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      panel.style.transform = `rotateY(${x * 0.04}deg) rotateX(${-y * 0.04}deg)`;
    };

    const handleMouseLeave = () => {
      panel.style.transform = 'rotateY(0deg) rotateX(0deg)';
    };

    panel.addEventListener('mousemove', handleMouseMove);
    panel.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      panel.removeEventListener('mousemove', handleMouseMove);
      panel.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Canvas Cibernético Interativo
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = { x: width / 2, y: height / 2, active: false };
    const numPoints = Math.min(Math.floor((width * height) / 16000), 55);
    const points: Point[] = [];

    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.75,
        vy: (Math.random() - 0.5) * 0.75,
        radius: Math.random() * 2 + 1,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const drawNetwork = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 240, 255, 0.45)';
        ctx.fill();

        // Conexão entre pontos
        for (let j = i + 1; j < points.length; j++) {
          const p2 = points[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 102, 255, ${0.35 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // Conexão com mouse
        if (mouse.active) {
          const mdx = p.x - mouse.x;
          const mdy = p.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 160) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(0, 240, 255, ${0.45 * (1 - mdist / 160)})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(drawNetwork);
    };

    drawNetwork();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="hero" id="hero">
      <canvas id="net" ref={canvasRef} aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true"></div>

      <div className="wrap hero-grid">
        <h1 className="hero-title text-[32px] sm:text-[36px] md:text-[2.8rem] lg:text-[4rem] leading-[1.15] md:leading-[1.18] tracking-[-0.03em] mb-5 md:mb-8" id="heroTitle">
          A sua equipe ainda divide <span className="grad">um único celular</span> para atender
          clientes no WhatsApp?
        </h1>

        <div className="hero-bottom">
          <div className="hero-copy">
            <p className="lead text-[1rem] sm:text-[1.02rem] md:text-[1.15rem] leading-relaxed mb-0 md:mb-9">
              Atraia clientes da sua região no Google, converta com páginas de resposta instantânea e
              atenda todas as conversas em um único número corporativo com vários atendentes
              simultâneos. Menos tempo de espera, mais contratos fechados.
            </p>

            <div className="cta-row flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-5 mt-8 md:mt-0 mb-9 md:mb-11">
              <a
                className="btn btn-primary btn-xl w-full sm:w-auto justify-center text-center"
                href={getWhatsAppUrl(
                  'Olá! Quero um diagnóstico gratuito do atendimento da minha empresa.'
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.5 3.5A11.8 11.8 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.6 4.1 1.6 5.9L0 24l6.4-1.7a11.9 11.9 0 0 0 5.6 1.4c6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.4-8.3zM12 21.7c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.8 9.8 0 0 1-1.5-5.1C2.1 6.5 6.5 2.1 12 2.1c2.6 0 5.1 1 6.9 2.9a9.7 9.7 0 0 1 2.9 6.9c0 5.4-4.4 9.8-9.8 9.8zm5.4-7.3c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1l-.9 1.1c-.2.2-.3.2-.6.1a8 8 0 0 1-4-3.5c-.3-.5.3-.5.9-1.6.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5 1.9.8 2.6.9 3.5.8.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.3z" />
                </svg>
                <span>Quero atender sem perder vendas</span>
              </a>

              <a className="link-arrow justify-center py-2 sm:py-0" href="#simulador">
                <span>Ver demonstração ao vivo</span>
                <i>→</i>
              </a>
            </div>

            <ul className="trust flex flex-col md:flex-row gap-6 md:gap-8 w-full">
              <li>
                <b>3x</b>
                <span>mais respostas rápidas</span>
              </li>
              <li>
                <b>24h</b>
                <span>para entrar no ar</span>
              </li>
              <li>
                <b>0</b>
                <span>multa de fidelidade</span>
              </li>
            </ul>
          </div>

          {/* Mockup do Painel de Atendimento em Tempo Real */}
          <aside className="panel-wrap mt-9 md:mt-0 mb-9 md:mb-0 pb-4 md:pb-0" aria-label="Painel demonstrativo em tempo real">
            <div className="panel spot" id="panel" ref={panelRef}>
              <div className="panel-head">
                <span className="live">
                  <i className="pulse-dot green"></i> CENTRAL AO VIVO
                </span>
                <small id="clock" className="font-mono">
                  {clock}
                </small>
              </div>

              <div className="kpis">
                <div className="kpi">
                  <small>Tempo Médio de Resposta</small>
                  <strong>00:42</strong>
                  <em className="up">▼ 87% vs. modelo antigo</em>
                </div>
                <div className="kpi">
                  <small>Conversas Simultâneas</small>
                  <strong>18</strong>
                  <em>neste momento</em>
                </div>
              </div>

              <div
                className="bars"
                id="bars"
                aria-label="Gráfico de fluxo de mensagens por hora"
                aria-hidden="true"
              >
                {barHeights.map((h, i) => (
                  <div key={i} className="bars-col" style={{ height: `${h}%` }} />
                ))}
              </div>

              <ul className="agents">
                <li>
                  <div>
                    <span className="av">AM</span>
                    <div>
                      <b>Ana · Comercial</b>
                      <small>Atendendo Lead Google</small>
                    </div>
                  </div>
                  <i className="st on" title="Online e respondendo"></i>
                </li>
                <li>
                  <div>
                    <span className="av">RS</span>
                    <div>
                      <b>Rui · Suporte Técnico</b>
                      <small>Disponível para chamada</small>
                    </div>
                  </div>
                  <i className="st on" title="Disponível"></i>
                </li>
                <li>
                  <div>
                    <span className="av">CF</span>
                    <div>
                      <b>Carla · Financeiro</b>
                      <small>Emitindo 2ª via PIX</small>
                    </div>
                  </div>
                  <i className="st busy" title="Em atendimento"></i>
                </li>
                <li>
                  <div>
                    <span className="av">PL</span>
                    <div>
                      <b>Paulo · Comercial</b>
                      <small>Em pausa programada</small>
                    </div>
                  </div>
                  <i className="st off" title="Offline temporário"></i>
                </li>
              </ul>
            </div>

            {/* Chips Flutuantes de Conversão */}
            <div className="float-chip c1">
              <i>★</i> Novo lead via Google Meu Negócio
            </div>
            <div className="float-chip c2">
              <i>✓</i> Venda confirmada · R$ 680,00
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

