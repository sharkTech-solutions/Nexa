import React from 'react';

export default function MethodSection() {
  return (
    <section id="metodo" className="method wrap px-5 md:px-6 pt-5 pb-20 md:py-24" aria-labelledby="method-heading">
      <div className="sec-head px-4 sm:px-5 md:px-0 mb-8 md:mb-14">
        <span className="eyebrow">01 — Metodologia Integrada</span>
        <h2 id="method-heading" className="text-[1.5rem] sm:text-[1.75rem] md:text-[2.6rem] leading-tight md:leading-tight mb-3.5">
          Três etapas estratégicas.
          <br />
          <span className="grad">Zero clientes perdidos.</span>
        </h2>
        <p className="muted text-[0.95rem] md:text-[1.05rem] leading-relaxed">
          Estruturamos sua operação para captar demanda qualificada da sua região, filtrar
          visitantes e converter atendimentos em faturamento.
        </p>
      </div>

      <div className="stack flex flex-col gap-6 md:gap-7">
        {/* Etapa 1: Atração Local */}
        <article className="layer spot mx-3 sm:mx-5 md:mx-0 p-[20px] sm:p-[28px] md:p-[44px] pb-[16px] sm:pb-[24px] md:pb-[44px] mb-0">
          <div className="layer-text px-[2px]">
            <span className="big-num font-mono">01</span>
            <h3 className="text-[1.55rem] md:text-[1.9rem] mb-3">Atração Local</h3>
            <p className="hidden md:block text-[0.95rem] md:text-[1rem] leading-relaxed mb-5">
              Otimizamos o seu perfil no Google Meu Negócio com técnicas avançadas de SEO local para
              colocar sua empresa no topo das buscas regionais. Fotos profissionais, gestão ativa
              de avaliações e canal direto para contato.
            </p>
            <ul className="ticks">
              <li>Perfil 100% verificado, catalogado e otimizado</li>
              <li>Estratégia para captação contínua de avaliações positivas</li>
              <li>Destaque geolocalizado em &quot;perto de mim&quot; e no Google Maps</li>
            </ul>
          </div>
          <div className="layer-visual">
            <div className="map">
              <span className="pin p1"></span>
              <span className="pin p2"></span>
              <span className="pin p3"></span>
              <div className="gcard">
                <b>Sua Empresa Local em Destaque</b>
                <div className="stars">
                  4,9 <i>★★★★★</i> <small>(284 avaliações)</small>
                </div>
                <small className="open">● Aberto agora · Atendimento Imediato</small>
                <div className="gbtns">
                  <span>Ligar</span>
                  <span className="wa">WhatsApp ↗</span>
                  <span>Rotas</span>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Etapa 2: Conversão Rápida */}
        <article className="layer spot mx-3 sm:mx-5 md:mx-0 p-[20px] sm:p-[28px] md:p-[44px] pb-[16px] sm:pb-[24px] md:pb-[44px] mb-0">
          <div className="layer-text px-[2px]">
            <span className="big-num font-mono">02</span>
            <h3 className="text-[1.55rem] md:text-[1.9rem] mb-3">Conversão Rápida</h3>
            <p className="hidden md:block text-[0.95rem] md:text-[1rem] leading-relaxed mb-5">
              Landing pages ultra-leves desenvolvidas para alta taxa de conversão em dispositivos
              móveis. Sem distrações, com carregamento em menos de 2 segundos e foco em levar o lead
              qualificado direto ao WhatsApp.
            </p>
            <ul className="ticks">
              <li>Score 95+ de performance e velocidade no Google PageSpeed</li>
              <li>Arquitetura pensada para tomada rápida de decisão</li>
              <li>Chamadas para ação integradas e com rastreamento de métricas</li>
            </ul>
          </div>
          <div className="layer-visual">
            <div className="browser">
              <div className="bar">
                <i></i>
                <i></i>
                <i></i>
                <span className="font-mono">suaempresa.com.br/atendimento</span>
              </div>
              <div className="bbody">
                <div className="ring" style={{ ['--v' as string]: 98 }}>
                  <b>98</b>
                  <small>Score</small>
                </div>
                <div className="lines">
                  <span></span>
                  <span></span>
                  <span className="s"></span>
                  <em>Chamar no WhatsApp (1 clique)</em>
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Etapa 3: Fechamento & Retenção */}
        <article className="layer spot mx-3 sm:mx-5 md:mx-0 p-[20px] sm:p-[28px] md:p-[44px] pb-[16px] sm:pb-[24px] md:pb-[44px]">
          <div className="layer-text px-[2px]">
            <span className="big-num font-mono">03</span>
            <h3 className="text-[1.55rem] md:text-[1.9rem] mb-3">Fechamento &amp; Retenção</h3>
            <p className="hidden md:block text-[0.95rem] md:text-[1rem] leading-relaxed mb-5">
              Plataforma de multiatendimento corporativo: 5, 10 ou mais atendentes operando no mesmo
              número de WhatsApp, com triagem inteligente, filas organizadas por setor e histórico
              centralizado.
            </p>
            <ul className="ticks">
              <li>Distribuição automática de clientes por departamento</li>
              <li>Histórico unificado da conversa para toda a equipe</li>
              <li>Métricas em tempo real de tempo de resposta e produtividade</li>
            </ul>
          </div>
          <div className="layer-visual mb-0">
            <div className="mini-list">
              <div className="row">
                <span className="av">AM</span>
                <div>
                  <b>Mariana Silveira</b>
                  <small>Quero proposta de contratação...</small>
                </div>
                <em>Comercial</em>
              </div>
              <div className="row">
                <span className="av">RS</span>
                <div>
                  <b>Lucas Andrade</b>
                  <small>Dúvida sobre entrega em domicílio</small>
                </div>
                <em>Suporte</em>
              </div>
              <div className="row">
                <span className="av">CF</span>
                <div>
                  <b>Studio Arquitetura</b>
                  <small>Comprovante de pagamento enviado</small>
                </div>
                <em>Financeiro</em>
              </div>
              <div className="row">
                <span className="av">AM</span>
                <div>
                  <b>Carlos Eduardo</b>
                  <small>Contrato assinado, vamos iniciar!</small>
                </div>
                <em>Comercial</em>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
