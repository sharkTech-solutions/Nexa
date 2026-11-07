export const WA_CONFIG = {
  phone: '5522988353084', // Altere facilmente para o número de WhatsApp corporativo
  defaultMsg: 'Olá! Gostaria de entender como a NEXA Digital pode ajudar a minha empresa a vender mais no WhatsApp.',
};

export function getWhatsAppUrl(customMsg?: string): string {
  const msg = customMsg || WA_CONFIG.defaultMsg;
  return `https://wa.me/${WA_CONFIG.phone}?text=${encodeURIComponent(msg)}`;
}

export const SITE_METADATA = {
  title: 'NEXA Digital — Atração Local, Conversão & Multiatendimento no WhatsApp',
  description:
    'A NEXA Digital atrai clientes qualificados da sua região no Google, converte com landing pages ultra-rápidas e centraliza o multiatendimento no WhatsApp em um único número corporativo.',
  siteUrl: 'https://nexadigital.com.br',
  author: 'NEXA Digital',
  keywords: [
    'atendimento whatsapp',
    'multiatendimento whatsapp',
    'vendas whatsapp',
    'landing page alta conversão',
    'google meu negócio',
    'atração local google',
    'atendimento centralizado',
    'automação de atendimento comercial',
    'nexa digital',
  ],
};

