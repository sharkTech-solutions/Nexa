/**
 * NEXA Digital — Interactive Script (Awwwards Grade)
 * Performance, microinterações, simulação em tempo real e calculadora de ROI
 */

(function () {
  'use strict';

  // Configuração Global do WhatsApp
  const WA_CONFIG = {
    phone: '5522988353084', // Altere facilmente para o número de WhatsApp desejado (DDI + DDD + Número)
    defaultMsg: 'Olá! Gostaria de entender como a NEXA Digital pode ajudar a minha empresa a vender mais no WhatsApp.'
  };

  /* ==========================================================================
     01. Preloader de Alta Performance
     ========================================================================== */
  const preloader = document.getElementById('preloader');
  const preNum = document.getElementById('preNum');
  const preBar = document.getElementById('preBar');

  let loadProgress = 0;
  const loadInterval = setInterval(() => {
    loadProgress += Math.floor(Math.random() * 12) + 6;
    if (loadProgress >= 100) {
      loadProgress = 100;
      clearInterval(loadInterval);
      if (preNum) preNum.textContent = '100';
      if (preBar) preBar.style.width = '100%';

      setTimeout(() => {
        if (preloader) preloader.classList.add('fade-out');
        document.body.classList.remove('loading');
      }, 350);
    } else {
      if (preNum) preNum.textContent = loadProgress;
      if (preBar) preBar.style.width = loadProgress + '%';
    }
  }, 35);

  /* ==========================================================================
     02. Links Dinâmicos do WhatsApp
     ========================================================================== */
  function setupWhatsAppLinks() {
    const waLinks = document.querySelectorAll('.wa-link');
    waLinks.forEach(link => {
      const customMsg = link.getAttribute('data-msg') || WA_CONFIG.defaultMsg;
      const targetUrl = `https://wa.me/${WA_CONFIG.phone}?text=${encodeURIComponent(customMsg)}`;
      link.setAttribute('href', targetUrl);
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    });
  }
  setupWhatsAppLinks();

  /* ==========================================================================
     03. Barra de Progresso de Scroll & Navbar Scrolled State
     ========================================================================== */
  const progressBar = document.getElementById('progress');
  const nav = document.getElementById('nav');
  const burger = document.getElementById('burger');
  const links = document.getElementById('links');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollTop / docHeight) * 100;

    if (progressBar) {
      progressBar.style.width = `${scrolled}%`;
    }

    if (nav) {
      if (scrollTop > 40) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }
  }, { passive: true });

  // Mobile Menu Toggle
  if (burger && links) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('active');
      links.classList.toggle('open');
    });

    links.querySelectorAll('a').forEach(anchor => {
      anchor.addEventListener('click', () => {
        burger.classList.remove('active');
        links.classList.remove('open');
      });
    });
  }

  /* ==========================================================================
     04. Spotlight Hover Effect nos Cards
     ========================================================================== */
  const spotCards = document.querySelectorAll('.spot');
  spotCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  /* ==========================================================================
     05. Canvas Cibernético no Hero (Interativo & Otimizado)
     ========================================================================== */
  const canvas = document.getElementById('net');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouse = { x: width / 2, y: height / 2, active: false };
    const numPoints = Math.min(Math.floor((width * height) / 16000), 55);
    const points = [];

    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.75,
        vy: (Math.random() - 0.5) * 0.75,
        radius: Math.random() * 2 + 1
      });
    }

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    });

    document.addEventListener('mouseleave', () => {
      mouse.active = false;
    });

    function drawNetwork() {
      ctx.clearRect(0, 0, width, height);

      // Atualiza e desenha pontos
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

        // Conexões com outros pontos
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

      requestAnimationFrame(drawNetwork);
    }

    drawNetwork();
  }

  /* ==========================================================================
     06. Relógio em Tempo Real & Gráfico Vivo no Painel do Hero
     ========================================================================== */
  const clockEl = document.getElementById('clock');
  function updateClock() {
    if (!clockEl) return;
    const now = new Date();
    clockEl.textContent = now.toTimeString().split(' ')[0];
  }
  updateClock();
  setInterval(updateClock, 1000);

  // Gerar barras do gráfico do Hero
  const barsContainer = document.getElementById('bars');
  if (barsContainer) {
    const barHeights = [40, 65, 50, 80, 95, 70, 85, 100, 75, 90, 80, 95];
    barHeights.forEach((h, idx) => {
      const col = document.createElement('div');
      col.className = 'bars-col';
      col.style.height = `${h}%`;
      barsContainer.appendChild(col);
    });

    // Animação periódica suave nas barras
    setInterval(() => {
      const cols = barsContainer.querySelectorAll('.bars-col');
      cols.forEach(col => {
        const randVariation = Math.min(100, Math.max(25, parseInt(col.style.height) + (Math.floor(Math.random() * 21) - 10)));
        col.style.height = `${randVariation}%`;
      });
    }, 2800);
  }

  // Tilt 3D suave no painel
  const panel = document.getElementById('panel');
  if (panel) {
    panel.addEventListener('mousemove', (e) => {
      const rect = panel.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      panel.style.transform = `rotateY(${x * 0.04}deg) rotateX(${-y * 0.04}deg)`;
    });

    panel.addEventListener('mouseleave', () => {
      panel.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
  }

  /* ==========================================================================
     07. Simulador Interativo de WhatsApp
     ========================================================================== */
  const chat = document.getElementById('chat');
  const opts = document.getElementById('opts');
  const stepsList = document.getElementById('steps');
  const simReset = document.getElementById('simReset');
  const simStatus = document.getElementById('simStatus');

  const sectorResponses = {
    Comercial: {
      agent: 'Ana · Comercial',
      avatar: 'AM',
      msg: 'Olá! Me chamo Ana do setor Comercial. Vi que você busca acelerar suas vendas. Em média, nossos clientes reduzem o tempo de resposta para menos de 1 minuto e aumentam o fechamento em 35%. Qual o segmento da sua empresa?'
    },
    Suporte: {
      agent: 'Rui · Suporte Técnico',
      avatar: 'RS',
      msg: 'Olá! Sou o Rui do suporte. Atendimento assumido em tempo recorde! Nosso sistema distribui os chamados automaticamente para evitar filas. Como posso te auxiliar agora?'
    },
    Financeiro: {
      agent: 'Carla · Financeiro',
      avatar: 'CF',
      msg: 'Olá! Carla falando. Localizei sua solicitação imediatamente. Deseja 2ª via de boleto, nota fiscal ou consultar faturas em aberto? Já estou pronta para emitir.'
    }
  };

  function highlightStep(stepIndex) {
    if (!stepsList) return;
    const items = stepsList.querySelectorAll('li');
    items.forEach((item, idx) => {
      if (idx <= stepIndex) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  if (opts && chat) {
    const buttons = opts.querySelectorAll('button');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const sector = btn.getAttribute('data-sector');
        if (!sector || !sectorResponses[sector]) return;

        // Desabilita botões temporariamente
        buttons.forEach(b => (b.disabled = true));
        highlightStep(0);

        // 1. Mensagem de saída do usuário
        const userMsg = document.createElement('div');
        userMsg.className = 'msg out';
        userMsg.textContent = `${btn.textContent.trim()}`;
        chat.appendChild(userMsg);
        chat.scrollTop = chat.scrollHeight;

        // 2. Transição para Step 2 (Triagem)
        setTimeout(() => {
          highlightStep(1);
          if (simStatus) simStatus.textContent = 'triando setor...';

          // Balão de digitação
          const typingMsg = document.createElement('div');
          typingMsg.className = 'msg typing';
          typingMsg.id = 'typingBubble';
          typingMsg.innerHTML = '<span></span><span></span><span></span>';
          chat.appendChild(typingMsg);
          chat.scrollTop = chat.scrollHeight;
        }, 500);

        // 3. Step 3 (Atribuindo atendente) & Step 4 (Conversa Assumida)
        setTimeout(() => {
          highlightStep(2);
          const data = sectorResponses[sector];
          if (simStatus) simStatus.textContent = `${data.agent} online`;

          setTimeout(() => {
            highlightStep(3);
            const typingBubble = document.getElementById('typingBubble');
            if (typingBubble) typingBubble.remove();

            // Mensagem do atendente assumindo
            const botMsg = document.createElement('div');
            botMsg.className = 'msg in';
            botMsg.innerHTML = `<strong>${data.agent}:</strong><br>${data.msg}`;
            chat.appendChild(botMsg);
            chat.scrollTop = chat.scrollHeight;
          }, 800);
        }, 1400);
      });
    });

    if (simReset) {
      simReset.addEventListener('click', () => {
        chat.innerHTML = '<div class="msg in">Olá! 👋 Seja bem-vindo(a). Escolha o setor para ser atendido:</div>';
        buttons.forEach(b => (b.disabled = false));
        if (simStatus) simStatus.textContent = 'online';
        if (stepsList) {
          const items = stepsList.querySelectorAll('li');
          items.forEach(item => item.classList.remove('active'));
        }
      });
    }
  }

  /* ==========================================================================
     08. Calculadora de ROI Interativa com Animação Fluida
     ========================================================================== */
  const rVol = document.getElementById('rVol');
  const rTicket = document.getElementById('rTicket');
  const rLoss = document.getElementById('rLoss');
  const rClose = document.getElementById('rClose');

  const oVol = document.getElementById('oVol');
  const oTicket = document.getElementById('oTicket');
  const oLoss = document.getElementById('oLoss');
  const oClose = document.getElementById('oClose');

  const roiValue = document.getElementById('roiValue');
  const roiYear = document.getElementById('roiYear');
  const roiX = document.getElementById('roiX');
  const roiCta = document.getElementById('roiCta');

  let currentAnimValue = 0;
  let animFrameId = null;

  function updateRangeBackground(input) {
    if (!input) return;
    const min = parseFloat(input.min) || 0;
    const max = parseFloat(input.max) || 100;
    const val = parseFloat(input.value) || 0;
    const pct = ((val - min) / (max - min)) * 100;
    input.style.setProperty('--pct', `${pct}%`);
  }

  function formatBRL(val) {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
  }

  function calculateROI() {
    if (!rVol || !rTicket || !rLoss || !rClose) return;

    const vol = parseInt(rVol.value, 10);
    const ticket = parseFloat(rTicket.value);
    const lossPct = parseFloat(rLoss.value) / 100;
    const closePct = parseFloat(rClose.value) / 100;

    // Atualiza labels dos sliders
    if (oVol) oVol.textContent = `${vol} atendimentos`;
    if (oTicket) oTicket.textContent = formatBRL(ticket);
    if (oLoss) oLoss.textContent = `${rLoss.value}%`;
    if (oClose) oClose.textContent = `${rClose.value}%`;

    [rVol, rTicket, rLoss, rClose].forEach(updateRangeBackground);

    // Contatos mensais (22 dias úteis)
    const monthlyLeads = vol * 22;
    // Contatos perdidos hoje por falta de agilidade
    const lostLeads = monthlyLeads * lossPct;
    // O sistema recupera 80% desses contatos com resposta imediata e triagem
    const recoveredLeads = lostLeads * 0.8;
    // Vendas fechadas
    const recoveredSales = recoveredLeads * closePct;
    // Faturamento mensal recuperado
    const targetMonthly = Math.round(recoveredSales * ticket);
    const targetYearly = targetMonthly * 12;
    const multiplier = Math.max(1, Math.round(targetMonthly / 127));

    // Animação de contagem numérica
    if (animFrameId) cancelAnimationFrame(animFrameId);
    const startValue = currentAnimValue;
    const diff = targetMonthly - startValue;
    const duration = 400;
    const startTime = performance.now();

    function stepAnim(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      currentAnimValue = startValue + diff * ease;

      if (roiValue) roiValue.textContent = formatBRL(currentAnimValue);

      if (progress < 1) {
        animFrameId = requestAnimationFrame(stepAnim);
      } else {
        currentAnimValue = targetMonthly;
        if (roiValue) roiValue.textContent = formatBRL(targetMonthly);
      }
    }
    animFrameId = requestAnimationFrame(stepAnim);

    if (roiYear) roiYear.textContent = formatBRL(targetYearly);
    if (roiX) roiX.textContent = `${multiplier}x`;

    if (roiCta) {
      const customMsg = `Olá! Calculei no site que posso recuperar cerca de ${formatBRL(targetMonthly)}/mês com a NEXA. Gostaria de agendar uma demonstração.`;
      roiCta.setAttribute('data-msg', customMsg);
      roiCta.setAttribute('href', `https://wa.me/${WA_CONFIG.phone}?text=${encodeURIComponent(customMsg)}`);
    }
  }

  [rVol, rTicket, rLoss, rClose].forEach(slider => {
    if (slider) {
      slider.addEventListener('input', calculateROI);
      updateRangeBackground(slider);
    }
  });
  calculateROI();

  /* ==========================================================================
     09. FAQ Accordion Fluido
     ========================================================================== */
  const faqButtons = document.querySelectorAll('.qa .q');
  faqButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';
      const answer = btn.nextElementSibling;

      // Fecha outros itens
      faqButtons.forEach(otherBtn => {
        if (otherBtn !== btn) {
          otherBtn.setAttribute('aria-expanded', 'false');
          if (otherBtn.nextElementSibling) {
            otherBtn.nextElementSibling.style.maxHeight = null;
          }
        }
      });

      // Alterna o atual
      if (isExpanded) {
        btn.setAttribute('aria-expanded', 'false');
        if (answer) answer.style.maxHeight = null;
      } else {
        btn.setAttribute('aria-expanded', 'true');
        if (answer) answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ==========================================================================
     10. Ano Corrente no Rodapé
     ========================================================================== */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

})();

