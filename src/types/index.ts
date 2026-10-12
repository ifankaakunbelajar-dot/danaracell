export type ServiceType = 'pulsa' | 'paket_data' | 'token_pln' | 'ewallet';

export interface ProviderItem {
  id: string;
  name: string;
  shortName: string;
  imageSrc?: string; // Path file gambar, contoh: '/images/telkomsel.png' atau 'file/gambar1.png'
  prefixes?: string[];
}

export interface SimpleOrderData {
  orderId: string;
  serviceType: ServiceType;
  provider: ProviderItem;
  targetNumber: string; // Nomor HP atau No. Meter PLN
  customerName?: string;
  nominal?: string; // Khusus Pulsa, Token PLN, E-Wallet
  packageRequest?: string; // Khusus Paket Data
  note?: string;
  timestamp: string;
}
