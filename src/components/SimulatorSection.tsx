'use client';

import React, { useState, useRef, useEffect } from 'react';

interface ChatMessage {
  id: string;
  type: 'in' | 'out' | 'typing';
  author?: string;
  text?: string;
}

interface SectorInfo {
  agent: string;
  avatar: string;
  msg: string;
}

const sectorResponses: Record<string, SectorInfo> = {
  Comercial: {
    agent: 'Ana · Comercial',
    avatar: 'AM',
    msg: 'Olá! Me chamo Ana do setor Comercial. Vi que você busca acelerar suas vendas. Em média, nossos clientes reduzem o tempo de resposta para menos de 1 minuto e aumentam o fechamento em 35%. Qual o segmento da sua empresa?',
  },
  Suporte: {
    agent: 'Rui · Suporte Técnico',
    avatar: 'RS',
    msg: 'Olá! Sou o Rui do suporte. Atendimento assumido em tempo recorde! Nosso sistema distribui os chamados automaticamente para evitar filas. Como posso te auxiliar agora?',
  },
  Financeiro: {
    agent: 'Carla · Financeiro',
    avatar: 'CF',
    msg: 'Olá! Carla falando. Localizei sua solicitação imediatamente. Deseja 2ª via de boleto, nota fiscal ou consultar faturas em aberto? Já estou pronta para emitir.',
  },
};

export default function SimulatorSection() {
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [status, setStatus] = useState<string>('online');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      type: 'in',
      text: 'Olá! 👋 Bem-vindo(a) à central de atendimento. Por favor, escolha o departamento desejado para iniciarmos o seu atendimento imediato:',
    },
  ]);

  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSelectSector = (sector: string, label: string) => {
    if (isProcessing) return;
    const sectorData = sectorResponses[sector];
    if (!sectorData) return;

    setIsProcessing(true);
    setActiveStep(0);

    // 1. Mensagem de saída do usuário
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        type: 'out',
        text: label,
      },
    ]);

    // 2. Transição para Step 2 (Triagem e digitação)
    setTimeout(() => {
      setActiveStep(1);
      setStatus('triando setor...');
      setMessages((prev) => [
        ...prev,
        {
          id: 'typing',
          type: 'typing',
        },
      ]);
    }, 500);

    // 3. Step 3 (Atribuindo atendente) & Step 4 (Conversa assumida)
    setTimeout(() => {
      setActiveStep(2);
      setStatus(`${sectorData.agent} online`);

      setTimeout(() => {
        setActiveStep(3);
        setMessages((prev) => {
          const filtered = prev.filter((m) => m.type !== 'typing');
          return [
            ...filtered,
            {
              id: `agent-${Date.now()}`,
              type: 'in',
              author: sectorData.agent,
              text: sectorData.msg,
            },
          ];
        });
        setIsProcessing(false);
      }, 800);
    }, 1400);
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'init-1',
        type: 'in',
        text: 'Olá! 👋 Bem-vindo(a) à central de atendimento. Por favor, escolha o departamento desejado para iniciarmos o seu atendimento imediato:',
      },
    ]);
    setActiveStep(-1);
    setStatus('online');
    setIsProcessing(false);
  };

  return (
    <section id="simulador" className="section wrap px-5 md:px-6 py-6 md:py-20" aria-labelledby="sim-heading">
      <div className="sec-head">
        <span className="eyebrow">02 — Demonstração Interativa</span>
        <h2 id="sim-heading">
          Veja a triagem corporativa
          <br />
          <span className="grad">em operação em tempo real.</span>
        </h2>
        <p className="muted">
          Simule o fluxo do seu cliente: selecione um departamento abaixo e observe o encaminhamento
          instantâneo para o atendente correto.
        </p>
      </div>

      <div className="sim">
        {/* Mockup do Celular */}
        <div className="phone-shell">
          <div className="phone">
            <div className="notch"></div>
            <div className="phone-top">
              <span className="av sm">N</span>
              <div>
                <b>NEXA · Central Corporativa</b>
                <small id="simStatus">{status}</small>
              </div>
            </div>

            <div className="chat" id="chat" ref={chatRef} aria-live="polite">
              {messages.map((m) => {
                if (m.type === 'typing') {
                  return (
                    <div key={m.id} className="msg typing" id="typingBubble">
                      <span></span>
                      <span></span>
                      <span></span>
                    </div>
                  );
                }
                return (
                  <div key={m.id} className={`msg ${m.type}`}>
                    {m.author && (
                      <>
                        <strong>{m.author}:</strong>
                        <br />
                      </>
                    )}
                    {m.text}
                  </div>
                );
              })}
            </div>

            <div className="opts" id="opts">
              <button
                disabled={isProcessing}
                className="py-3 px-4 text-[13.5px] font-medium"
                onClick={() =>
                  handleSelectSector('Comercial', '🛒 1. Departamento Comercial')
                }
              >
                🛒 1. Departamento Comercial
              </button>
              <button
                disabled={isProcessing}
                className="py-3 px-4 text-[13.5px] font-medium"
                onClick={() =>
                  handleSelectSector('Suporte', '🛠️ 2. Suporte & Dúvidas')
                }
              >
                🛠️ 2. Suporte &amp; Dúvidas
              </button>
              <button
                disabled={isProcessing}
                className="py-3 px-4 text-[13.5px] font-medium"
                onClick={() =>
                  handleSelectSector('Financeiro', '💳 3. Setor Financeiro')
                }
              >
                💳 3. Setor Financeiro
              </button>
            </div>
          </div>
        </div>

        {/* Bastidores / Step Tracker */}
        <div className="sim-side mt-1 md:mt-0">
          <h3 className="text-[1.22rem] md:text-[1.8rem] mb-2.5 md:mb-6">O que acontece nos bastidores</h3>
          <ol className="steps mb-3.5 md:mb-8" id="steps">
            <li className={activeStep >= 0 ? 'active' : ''}>
              <b>1. Cliente escolhe o departamento</b>
              <small>Menu corporativo direto, eliminando filas de espera e confusão.</small>
            </li>
            <li className={activeStep >= 1 ? 'active' : ''}>
              <b>2. Triagem e direcionamento automático</b>
              <small>O sistema identifica a demanda e encaminha para a fila correta.</small>
            </li>
            <li className={activeStep >= 2 ? 'active' : ''}>
              <b>3. Atendente livre recebe a conversa</b>
              <small>Notificação em tempo real no painel do operador com histórico do lead.</small>
            </li>
            <li className={activeStep >= 3 ? 'active' : ''}>
              <b>4. Atendimento humanizado iniciado</b>
              <small>Primeira resposta em menos de 1 minuto, maximizando a retenção.</small>
            </li>
          </ol>
          <button className="btn btn-ghost mb-2 md:mb-0" id="simReset" onClick={handleReset}>
            ↺ Reiniciar demonstração
          </button>
        </div>
      </div>
    </section>
  );
}

