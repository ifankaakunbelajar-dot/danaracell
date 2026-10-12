import React from 'react';
import { STORE_INFO } from '../data/mockProducts';
import { StoreLogo } from './StoreLogo';
import { 
  Clock, 
  MapPin, 
  MessageCircle, 
  ShieldCheck, 
  Zap, 
  Store, 
  ArrowRight, 
  Sparkles, 
  ExternalLink,
  Navigation
} from 'lucide-react';

interface MobileStoreProfileProps {
  whatsappNumber: string;
  onGoToOrder: () => void;
}

export const MobileStoreProfile: React.FC<MobileStoreProfileProps> = ({ 
  whatsappNumber,
  onGoToOrder 
}) => {
  const cleanPhone = whatsappNumber.replace(/[^0-9]/g, '');

  const handleChat = () => {
    window.open(`https://wa.me/${cleanPhone}?text=Halo%20Admin%20Danara%20Cell`, '_blank');
  };

  const handleOpenMaps = () => {
    const query = encodeURIComponent(STORE_INFO.address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <div className="px-4 py-3 space-y-4 animate-in fade-in duration-150">
      
      {/* Header Profile Hero Card */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden relative">
        
        {/* Top Gradient Banner (Biru Kalem - Kuning Cerah) */}
        <div className="h-1.5 w-full bg-gradient-to-r from-sky-500 via-sky-400 to-yellow-400" />

        <div className="p-5 space-y-3.5 text-center">
          
          {/* Logo Avatar */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-sky-500 to-yellow-400 p-0.5 mx-auto shadow-xs">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center overflow-hidden">
              <StoreLogo className="w-full h-full" iconClassName="w-8 h-8 text-sky-600" />
            </div>
          </div>

          <div>
            <h2 className="text-lg font-black text-slate-900 leading-tight">
              {STORE_INFO.name}
            </h2>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              {STORE_INFO.tagline}
            </p>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed text-left bg-slate-50 p-3 rounded-2xl border border-slate-200/70">
            {STORE_INFO.description}
          </p>

        </div>
      </div>

      {/* Info Jam Buka & Alamat */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-5 shadow-sm space-y-3">
        
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
          <span>Informasi Layanan & Lokasi</span>
        </h3>

        {/* Jam Operasional (Hanya Online WhatsApp) */}
        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 flex items-start gap-3">
          <Clock className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
          <div className="text-xs">
            <div className="font-bold text-slate-800">Jam Operasional:</div>
            <div className="text-slate-600 mt-1">
              • <strong>Online WhatsApp:</strong> {STORE_INFO.onlineHours}
            </div>
          </div>
        </div>

        {/* Alamat Fisik Banjarnegara & Google Maps */}
        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 flex items-start gap-3">
          <MapPin className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
          <div className="text-xs flex-1 space-y-2">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-slate-800">Alamat Lengkap:</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-yellow-100 text-yellow-800 border border-yellow-300">
                  {STORE_INFO.plusCode}
                </span>
              </div>
              <p className="text-slate-600 mt-1 font-medium leading-relaxed">
                {STORE_INFO.address}
              </p>
            </div>

            {/* Google Maps Action Card / Button */}
            <button
              onClick={handleOpenMaps}
              className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-sky-50 to-yellow-50 border border-sky-200/80 hover:border-sky-300 flex items-center justify-between text-[11px] font-bold text-sky-900 cursor-pointer transition-all active:scale-98 shadow-2xs"
            >
              <div className="flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-sky-600" />
                <span>Buka Rute di Google Maps</span>
              </div>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </button>
          </div>
        </div>

        {/* WhatsApp Kontak */}
        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 flex items-start gap-3">
          <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <div className="text-xs flex-1">
            <div className="font-bold text-slate-800">WhatsApp Pelayanan:</div>
            <p className="text-slate-700 mt-0.5 font-mono text-[11px] font-bold">
              +{whatsappNumber}
            </p>
          </div>
        </div>

      </div>

      {/* Keunggulan Bar dengan Biru Kalem & Kuning Cerah */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-5 shadow-sm space-y-3">
        <h3 className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
          <span>Keunggulan Bertransaksi di Danara Cell</span>
        </h3>

        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-sky-50/90 via-sky-50/40 to-yellow-50/80 border border-slate-200/80 space-y-2">
          <div className="flex items-start gap-2 text-xs text-slate-700">
            <span className="font-bold text-sky-600">⚡</span>
            <span><strong>Proses Cepat 1-3 Menit:</strong> Pesanan langsung diproses otomatis begitu konfirmasi WhatsApp masuk.</span>
          </div>
          <div className="flex items-start gap-2 text-xs text-slate-700">
            <span className="font-bold text-yellow-600">🏷️</span>
            <span><strong>Harga Bersahabat:</strong> Tarif pulsa, kuota, token, dan e-wallet murah tanpa biaya tersembunyi.</span>
          </div>
          <div className="flex items-start gap-2 text-xs text-slate-700">
            <span className="font-bold text-sky-600">🔒</span>
            <span><strong>Garansi 100% Saldo Masuk:</strong> Jaminan pasti terisi atau refund jika terjadi kendala operator.</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2.5 pt-1">
        {/* Switch to Order page button (Biru Kalem - Kuning Cerah) */}
        <button
          onClick={onGoToOrder}
          className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-sky-600 via-sky-500 to-yellow-400 hover:opacity-95 text-slate-950 font-black text-xs shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-98 transition-all"
        >
          <Zap className="w-4 h-4 fill-slate-950" />
          <span>MULAI ORDER SEKARANG</span>
          <ArrowRight className="w-4 h-4 ml-0.5" />
        </button>

        {/* WhatsApp Direct Chat */}
        <button
          onClick={handleChat}
          className="w-full py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
        >
          <MessageCircle className="w-4 h-4 text-emerald-600" />
          <span>TANYA CS VIA WHATSAPP</span>
        </button>
      </div>

    </div>
  );
};
