import { ProviderItem } from '../types';

// Nomor WhatsApp resmi Danara Cell
export const DEFAULT_WHATSAPP_NUMBER = '62895357701152';

// Profil Informasi Toko Danara Cell
export const STORE_INFO = {
  name: 'Danara Cell',
  tagline: 'Solusi Pulsa, Paket Data, Token Listrik PLN & E-Wallet Terpercaya',
  description: 'Danara Cell melayani berbagai kebutuhan digital harian Anda dengan proses kilat 1-3 menit, harga bersahabat, dan langsung terhubung secara otomatis ke WhatsApp.',
  onlineHours: '24 Jam Nonstop (Layanan WhatsApp)',
  address: 'JP3H+XXQ, Kalibenda II, Kalibenda, Kec. Sigaluh, Kab. Banjarnegara, Jawa Tengah 53481',
  plusCode: 'JP3H+XXQ',
};

export const CELLULAR_PROVIDERS: ProviderItem[] = [
  { id: 'telkomsel', name: 'Telkomsel', shortName: 'Telkomsel', imageSrc: 'file/telkomsel.jpg' },
  { id: 'xl', name: 'XL Axiata', shortName: 'XL', imageSrc: 'file/xl.jpg' },
  { id: 'tri', name: 'Tri (3)', shortName: 'Tri', imageSrc: 'file/tri.jpg' },
  { id: 'axis', name: 'AXIS', shortName: 'AXIS', imageSrc: 'file/axis.jpg' },
  { id: 'indosat', name: 'Indosat IM3', shortName: 'IM3', imageSrc: 'file/im3.jpg' },
  { id: 'smartfren', name: 'Smartfren', shortName: 'Smartfren', imageSrc: 'file/smartfren.jpg' },
];

export const EWALLET_PROVIDERS: ProviderItem[] = [
  { id: 'dana', name: 'DANA', shortName: 'DANA', imageSrc: 'file/dana.jpg' },
  { id: 'gopay', name: 'GoPay', shortName: 'GoPay', imageSrc: 'file/gopay.jpg' },
  { id: 'ovo', name: 'OVO', shortName: 'OVO', imageSrc: 'file/ovo.jpg' },
  { id: 'shopeepay', name: 'ShopeePay', shortName: 'ShopeePay', imageSrc: 'file/shopeepay.jpg' },
];

export const PLN_PROVIDER: ProviderItem = {
  id: 'pln',
  name: 'PLN Prabayar',
  shortName: 'PLN Token',
  imageSrc: 'file/pln.jpg',
};

export const PULSA_NOMINALS = [
  '5.000',
  '10.000',
  '15.000',
  '20.000',
  '25.000',
  '30.000',
  '50.000',
  '100.000',
];

export const TOKEN_NOMINALS = [
  '20.000',
  '50.000',
  '100.000',
  '200.000',
  '500.000',
  '1.000.000',
];

export const EWALLET_NOMINALS = [
  '10.000',
  '20.000',
  '25.000',
  '50.000',
  '100.000',
  '150.000',
  '200.000',
];

export const DATA_PACKAGE_PRESETS = [
  'Paket Kuota Bulanan (30 Hari)',
  'Paket Mingguan (7 Hari)',
  'Paket Harian (1 - 3 Hari)',
  'Paket Unlimited Malam / Sosmed',
  'Tanya Rekomendasi Promo ke Admin',
];
