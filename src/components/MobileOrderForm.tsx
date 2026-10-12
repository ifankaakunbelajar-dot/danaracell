import React, { useState, useEffect } from 'react';
import { ServiceType, ProviderItem, SimpleOrderData } from '../types';
import { 
  CELLULAR_PROVIDERS, 
  EWALLET_PROVIDERS, 
  PLN_PROVIDER, 
  PULSA_NOMINALS, 
  TOKEN_NOMINALS, 
  EWALLET_NOMINALS, 
  DATA_PACKAGE_PRESETS 
} from '../data/mockProducts';
import { detectCellularOperator } from '../utils/operatorDetector';
import { generateOrderId, generateOrderWhatsAppMessage, createWhatsAppUrl } from '../utils/whatsappHelper';
import { ProviderLogo } from './ProviderLogo';
import { 
  Smartphone, 
  Wifi, 
  Zap, 
  Wallet, 
  Send, 
  Check, 
  Sparkles
} from 'lucide-react';

interface MobileOrderFormProps {
  whatsappNumber: string;
  onOrderSubmitted: (order: SimpleOrderData) => void;
}

export const MobileOrderForm: React.FC<MobileOrderFormProps> = ({
  whatsappNumber,
  onOrderSubmitted,
}) => {
  // Service category: pulsa | paket_data | token_pln | ewallet
  const [activeTab, setActiveTab] = useState<ServiceType>('pulsa');

  // Form inputs
  const [targetNumber, setTargetNumber] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<ProviderItem>(CELLULAR_PROVIDERS[0]);
  const [customerName, setCustomerName] = useState('');
  const [note, setNote] = useState('');

  // Pulsa, Token PLN, E-Wallet nominal
  const [selectedNominal, setSelectedNominal] = useState<string>('50.000');
  const [customNominal, setCustomNominal] = useState<string>('');
  const [isCustomNominal, setIsCustomNominal] = useState(false);

  // Paket Data request (tanpa nominal)
  const [dataPackageRequest, setDataPackageRequest] = useState<string>(DATA_PACKAGE_PRESETS[0]);
  const [customDataRequest, setCustomDataRequest] = useState<string>('');

  // Switch tab resets
  useEffect(() => {
    if (activeTab === 'pulsa' || activeTab === 'paket_data') {
      setSelectedProvider(CELLULAR_PROVIDERS[0]);
      if (activeTab === 'pulsa') {
        setSelectedNominal('50.000');
      }
    } else if (activeTab === 'token_pln') {
      setSelectedProvider(PLN_PROVIDER);
      setSelectedNominal('50.000');
    } else if (activeTab === 'ewallet') {
      setSelectedProvider(EWALLET_PROVIDERS[0]);
      setSelectedNominal('50.000');
    }
    setIsCustomNominal(false);
    setCustomNominal('');
  }, [activeTab]);

  // Auto-detect provider from phone number input
  useEffect(() => {
    if (activeTab === 'pulsa' || activeTab === 'paket_data') {
      const detected = detectCellularOperator(targetNumber);
      if (detected) {
        const found = CELLULAR_PROVIDERS.find((p) => p.id === detected);
        if (found) {
          setSelectedProvider(found);
        }
      }
    }
  }, [targetNumber, activeTab]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!targetNumber.trim()) {
      alert(
        activeTab === 'token_pln'
          ? 'Silakan masukkan Nomor Meter atau ID Pelanggan PLN.'
          : 'Silakan masukkan Nomor HP tujuan.'
      );
      return;
    }

    let finalNominal: string | undefined = undefined;
    let finalPackageRequest: string | undefined = undefined;

    if (activeTab === 'pulsa' || activeTab === 'token_pln' || activeTab === 'ewallet') {
      finalNominal = isCustomNominal && customNominal.trim()
        ? `Rp ${customNominal.trim()}`
        : `Rp ${selectedNominal}`;
    } else if (activeTab === 'paket_data') {
      finalPackageRequest = customDataRequest.trim() || dataPackageRequest;
    }

    const orderId = generateOrderId();
    const now = new Date();
    const timestampStr = now.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }) + ' WIB';

    const orderData: SimpleOrderData = {
      orderId,
      serviceType: activeTab,
      provider: selectedProvider,
      targetNumber: targetNumber.trim(),
      customerName: customerName.trim() || undefined,
      nominal: finalNominal,
      packageRequest: finalPackageRequest,
      note: note.trim() || undefined,
      timestamp: timestampStr,
    };

    // Open WhatsApp
    const message = generateOrderWhatsAppMessage(orderData);
    const waUrl = createWhatsAppUrl(whatsappNumber, message);
    window.open(waUrl, '_blank');

    onOrderSubmitted(orderData);
  };

  const tabs: { id: ServiceType; label: string; icon: React.ReactNode }[] = [
    { id: 'pulsa', label: 'Pulsa', icon: <Smartphone className="w-4 h-4 mb-0.5" /> },
    { id: 'paket_data', label: 'Paket Data', icon: <Wifi className="w-4 h-4 mb-0.5" /> },
    { id: 'token_pln', label: 'Token PLN', icon: <Zap className="w-4 h-4 mb-0.5" /> },
    { id: 'ewallet', label: 'E-Wallet', icon: <Wallet className="w-4 h-4 mb-0.5" /> },
  ];

  return (
    <div className="px-4 py-2 space-y-4">
      
      {/* 4 SERVICE TABS WITH BIRU KALEM - KUNING CERAH GRADIENT ACTIVE HIGHLIGHT */}
      <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-100/90 rounded-2xl border border-slate-200">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              type="button"
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-sky-600 via-sky-500 to-yellow-400 text-slate-950 font-black shadow-xs scale-102'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.icon}
              <span className="text-[11px] leading-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* WHITE ORDER FORM CARD */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-5 space-y-4 shadow-sm relative overflow-hidden">
        
        {/* Soft Biru Kalem - Kuning Cerah Top Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-sky-400 to-yellow-400" />

        {/* Header label */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 pt-1">
          <div>
            <h3 className="text-sm font-black text-slate-900">
              {activeTab === 'pulsa' && 'Isi Pulsa Reguler'}
              {activeTab === 'paket_data' && 'Beli Paket Kuota Data'}
              {activeTab === 'token_pln' && 'Beli Token Listrik PLN'}
              {activeTab === 'ewallet' && 'Top Up Saldo E-Wallet'}
            </h3>
            <p className="text-[11px] text-slate-500">
              {activeTab === 'paket_data'
                ? 'Pilih provider & request jenis kuota'
                : 'Pilih provider & tentukan nominal'}
            </p>
          </div>
          <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-800 border border-sky-200">
            Lapor ke WA
          </span>
        </div>

        {/* 1. PROVIDER SELECTOR */}
        {activeTab !== 'token_pln' && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700">
                Pilih Provider / Dompet:
              </label>
              {(activeTab === 'pulsa' || activeTab === 'paket_data') && (
                <span className="text-[10px] text-sky-700 flex items-center gap-1 font-semibold">
                  <Sparkles className="w-3 h-3 text-yellow-500" /> Auto-Deteksi Nomor
                </span>
              )}
            </div>

            <div
              className={`grid gap-2 ${
                activeTab === 'ewallet' ? 'grid-cols-2' : 'grid-cols-3'
              }`}
            >
              {(activeTab === 'ewallet' ? EWALLET_PROVIDERS : CELLULAR_PROVIDERS).map((p) => {
                const isSelected = selectedProvider.id === p.id;
                const isEwallet = activeTab === 'ewallet';
                return (
                  <button
                    type="button"
                    key={p.id}
                    onClick={() => setSelectedProvider(p)}
                    className={`rounded-2xl border text-center transition-all cursor-pointer ${
                      isEwallet
                        ? 'p-2.5 flex items-center justify-center gap-2.5'
                        : 'p-2 flex flex-col items-center justify-center gap-1.5'
                    } ${
                      isSelected
                        ? 'bg-sky-50/90 border-sky-500 ring-2 ring-sky-400/20 text-slate-950 font-bold shadow-xs'
                        : 'bg-slate-50/80 border-slate-200/90 text-slate-700 hover:border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    <ProviderLogo
                      id={p.id}
                      name={p.name}
                      imageSrc={p.imageSrc}
                      size="md"
                    />
                    <span className="text-xs font-bold truncate">
                      {isEwallet ? p.name : p.shortName}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* If PLN Token, Show PLN Logo Banner */}
        {activeTab === 'token_pln' && (
          <div className="bg-yellow-50/60 border border-yellow-200/80 p-3 rounded-2xl flex items-center gap-3">
            <ProviderLogo
              id="pln"
              name={PLN_PROVIDER.name}
              imageSrc={PLN_PROVIDER.imageSrc}
              size="lg"
            />
            <div>
              <div className="text-xs font-black text-slate-900">PLN Prabayar (Token Listrik)</div>
              <p className="text-[11px] text-slate-600">
                Kode 20 digit token listrik akan langsung dikirimkan via WhatsApp.
              </p>
            </div>
          </div>
        )}

        {/* 2. TARGET NUMBER / ID PELANGGAN */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            {activeTab === 'token_pln'
              ? 'Nomor Meter / ID Pelanggan PLN (11-12 digit):'
              : activeTab === 'ewallet'
              ? `Nomor HP Akun ${selectedProvider.name}:`
              : `Nomor HP Tujuan (${selectedProvider.name}):`}
          </label>
          <input
            type="text"
            value={targetNumber}
            onChange={(e) => setTargetNumber(e.target.value)}
            placeholder={
              activeTab === 'token_pln'
                ? 'Contoh: 14285910291'
                : 'Contoh: 081234567890'
            }
            required
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 font-mono text-sm focus:outline-none focus:border-sky-500 focus:bg-white placeholder:text-slate-400 transition-colors"
          />
        </div>

        {/* 3. NOMINAL (UNTUK PULSA, TOKEN PLN, E-WALLET) */}
        {activeTab !== 'paket_data' && (
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              {activeTab === 'pulsa' && 'Sebutkan / Pilih Nominal Pulsa:'}
              {activeTab === 'token_pln' && 'Sebutkan / Pilih Nominal Token PLN:'}
              {activeTab === 'ewallet' && 'Sebutkan / Pilih Nominal Top Up:'}
            </label>

            {/* Nominal Chips (Biru Kalem - Kuning Cerah Active) */}
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-2">
              {(activeTab === 'token_pln'
                ? TOKEN_NOMINALS
                : activeTab === 'ewallet'
                ? EWALLET_NOMINALS
                : PULSA_NOMINALS
              ).map((nom) => {
                const isSelected = !isCustomNominal && selectedNominal === nom;
                return (
                  <button
                    type="button"
                    key={nom}
                    onClick={() => {
                      setSelectedNominal(nom);
                      setIsCustomNominal(false);
                    }}
                    className={`py-2 px-1 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-sky-600 via-sky-500 to-yellow-400 text-slate-950 font-black border-transparent shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {nom}
                  </button>
                );
              })}
            </div>

            {/* Custom Nominal Toggle */}
            <div className="pt-1">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsCustomNominal(!isCustomNominal)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border font-semibold transition-colors cursor-pointer ${
                    isCustomNominal
                      ? 'bg-sky-50 text-sky-800 border-sky-300 font-bold'
                      : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}
                >
                  {isCustomNominal ? '✓ Nominal Bebas' : '+ Ketik Nominal Lain'}
                </button>
                {isCustomNominal && (
                  <input
                    type="text"
                    value={customNominal}
                    onChange={(e) => setCustomNominal(e.target.value)}
                    placeholder="Contoh: 75.000 atau 150.000"
                    className="flex-1 px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {/* 4. KHUSUS PAKET DATA: GAUSAH NOMINAL */}
        {activeTab === 'paket_data' && (
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold text-slate-800">
                Pilih Kebutuhan Kuota:
              </label>
              <span className="text-[10px] text-sky-800 font-bold bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
                (Tanpa Nominal)
              </span>
            </div>

            <div className="space-y-1.5">
              {DATA_PACKAGE_PRESETS.map((preset) => {
                const isSelected = dataPackageRequest === preset && !customDataRequest;
                return (
                  <button
                    type="button"
                    key={preset}
                    onClick={() => {
                      setDataPackageRequest(preset);
                      setCustomDataRequest('');
                    }}
                    className={`w-full text-left py-2 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-sky-600 via-sky-500 to-yellow-400 text-slate-950 font-black border-transparent shadow-2xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{preset}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-slate-950 stroke-[3]" />}
                  </button>
                );
              })}
            </div>

            <div className="pt-1">
              <input
                type="text"
                value={customDataRequest}
                onChange={(e) => setCustomDataRequest(e.target.value)}
                placeholder="Atau ketik sendiri (misal: mau kuota 15gb sebulan)..."
                className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>
        )}

        {/* 5. NAMA PEMESAN & CATATAN */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            placeholder="Nama Pemesan"
            className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white"
          />
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Catatan (opsional)"
            className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-sky-500 focus:bg-white"
          />
        </div>

        {/* 6. SUBMIT BUTTON DENGAN GRADIENT BIRU KALEM - KUNING CERAH */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-sky-600 via-sky-500 to-yellow-400 hover:opacity-95 text-slate-950 font-black text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
          >
            <Send className="w-4 h-4 fill-slate-950" />
            <span>LAPOR PESANAN KE WHATSAPP 🚀</span>
          </button>
        </div>

        <p className="text-[10px] text-center text-slate-500">
          *Pesan otomatis akan langsung terbuka di WhatsApp Danara Cell
        </p>

      </form>
    </div>
  );
};
