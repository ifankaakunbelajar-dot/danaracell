import React from 'react';
import { Sparkles } from 'lucide-react';

export const BusinessBioHeader: React.FC = () => {
  return (
    <div className="px-4 pt-3 pb-1">
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-xs space-y-3 relative overflow-hidden">
        
        {/* Decorative Gradient Accent Bar (Biru Kalem - Kuning Cerah) */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-sky-400 to-yellow-400" />

        {/* Welcome Tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-sky-50 border border-sky-200 text-xs font-semibold text-sky-800">
          <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
          <span>Konter Digital Resmi & Terpercaya</span>
        </div>

        {/* Bio Description with Biru Kalem - Kuning Cerah Brand Name */}
        <div className="space-y-1.5">
          <h2 className="text-lg font-black text-slate-900 leading-tight">
            Selamat Datang di{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-500 to-yellow-500">
              Danara Cell
            </span>
            !
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Solusi praktis isi ulang pulsa all operator, paket kuota internet, token listrik PLN, dan saldo e-wallet harian Anda. Layanan siap melayani Anda 24 jam dengan sistem pemesanan mudah yang langsung terhubung dan lapor ke WhatsApp.
          </p>
        </div>

        {/* 3-Pillar Banner with Biru Kalem & Kuning Cerah Background */}
        <div className="p-3 rounded-2xl bg-gradient-to-r from-sky-50/90 via-sky-50/50 to-yellow-50/90 border border-slate-200/90 text-slate-800 flex items-center justify-between text-center px-4 shadow-2xs">
          <div>
            <div className="text-xs font-extrabold text-sky-900 tracking-tight">⚡ 1-3 MENIT</div>
            <div className="text-[10px] text-slate-500 font-medium">Proses Kilat</div>
          </div>
          <div className="h-5 w-px bg-slate-200" />
          <div>
            <div className="text-xs font-extrabold text-yellow-700 tracking-tight">🏷️ TERMURAH</div>
            <div className="text-[10px] text-slate-500 font-medium">Harga Ramah</div>
          </div>
          <div className="h-5 w-px bg-slate-200" />
          <div>
            <div className="text-xs font-extrabold text-sky-900 tracking-tight">💬 CHAT WA</div>
            <div className="text-[10px] text-slate-500 font-medium">Lapor Otomatis</div>
          </div>
        </div>

      </div>
    </div>
  );
};
