import { SimpleOrderData } from '../types';

export function generateOrderWhatsAppMessage(order: SimpleOrderData): string {
  const lineBreak = '\n';
  const divider = '━━━━━━━━━━━━━━━━━━━━━━';

  let greeting = `Halo *Danara Cell*, saya mau pesan via website:`;
  let details: string[] = [];

  if (order.serviceType === 'pulsa') {
    greeting = `Halo *Danara Cell*, saya mau beli *PULSA*:`;
    details = [
      `📱 *Provider:* ${order.provider.name}`,
      `🎯 *No. HP:* ${order.targetNumber}`,
      `💰 *Nominal Pulsa:* ${order.nominal || '-'}`,
    ];
  } else if (order.serviceType === 'paket_data') {
    greeting = `Halo *Danara Cell*, saya mau beli *PAKET DATA*:`;
    details = [
      `🌐 *Provider:* ${order.provider.name}`,
      `🎯 *No. HP:* ${order.targetNumber}`,
      `📦 *Permintaan Kuota:* ${order.packageRequest || 'Tanya rekomendasi paket'}`,
    ];
  } else if (order.serviceType === 'token_pln') {
    greeting = `Halo *Danara Cell*, saya mau beli *TOKEN LISTRIK PLN*:`;
    details = [
      `⚡ *Layanan:* Token Listrik PLN Prabayar`,
      `🎯 *No. Meter / ID Pelanggan:* ${order.targetNumber}`,
      `💰 *Nominal Token:* ${order.nominal || '-'}`,
    ];
  } else if (order.serviceType === 'ewallet') {
    greeting = `Halo *Danara Cell*, saya mau *TOP UP E-WALLET*:`;
    details = [
      `💳 *E-Wallet:* ${order.provider.name}`,
      `🎯 *No. HP Akun:* ${order.targetNumber}`,
      `💰 *Nominal Saldo:* ${order.nominal || '-'}`,
    ];
  }

  const messageLines = [
    greeting,
    divider,
    `🆔 *ID Pesanan:* ${order.orderId}`,
    ...details,
    ...(order.customerName ? [`👤 *Nama Pemesan:* ${order.customerName}`] : []),
    ...(order.note ? [`📝 *Catatan:* ${order.note}`] : []),
    divider,
    `⏰ *Waktu:* ${order.timestamp}`,
    ``,
    order.serviceType === 'paket_data'
      ? `Mohon info pilihan paket dan total harganya ya kak, terima kasih! 🙏`
      : `Mohon segera diproses ya kak. Terima kasih! 🙏`,
  ];

  return messageLines.join(lineBreak);
}

export function createWhatsAppUrl(phone: string, text: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${cleanPhone}?text=${encodedText}`;
}

export function generateOrderId(): string {
  const now = new Date();
  const dateStr = now.getFullYear().toString().slice(-2) +
    String(now.getMonth() + 1).padStart(2, '0') +
    String(now.getDate()).padStart(2, '0');
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `DNR-${dateStr}-${randomNum}`;
}
