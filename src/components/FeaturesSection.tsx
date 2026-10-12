import React from 'react';
import { 
  Zap, 
  ShieldCheck, 
  Clock, 
  Wallet, 
  HeadphonesIcon, 
  FileCheck2,
  CheckCircle2
} from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Zap className="w-6 h-6 text-emerald-400" />,
      title: 'Proses Kilat 1-3 Menit',
      description: 'Didukung sistem rekap otomatis via WhatsApp, pesanan langsung masuk ke antrean pemrosesan instan kami.',
    },
    {
      icon: <Clock className="w-6 h-6 text-cyan-400" />,
      title: 'Layanan 24 Jam Nonstop',
      description: 'Kebutuhan mendesak di tengah malam? Token listrik habis atau kuota habis tengah malam tetap kami layani cepat.',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-teal-400" />,
      title: 'Garansi 100% Saldo Masuk',
      description: 'Jaminan saldo atau pulsa masuk ke nomor tujuan. Jika ada kendala jaringan operator, garansi dana kembali (refund) 100%.',
    },
    {
      icon: <Wallet className="w-6 h-6 text-amber-400" />,
      title: 'Harga Murah & Bebas Biaya Admin',
      description: 'Harga terjangkau setara harga grosir konter. Khusus pembayaran QRIS bebas biaya admin tambahan.',
    },
    {
      icon: <HeadphonesIcon className="w-6 h-6 text-purple-400" />,
      title: 'Customer Service Ramah & Siaga',
      description: 'CS manusia asli yang siap mendampingi proses transaksi Anda via WhatsApp dengan ramah dan solutif.',
    },
    {
      icon: <FileCheck2 className="w-6 h-6 text-rose-400" />,
      title: 'Struk Digital Resmi & Rapi',
      description: 'Setiap transaksi memiliki ID pesanan resmi dan bukti struk digital yang bisa dicetak langsung atau disimpan sebagai PDF.',
    },
  ];

  return (
    <section id="features-section" className="py-12 sm:py-20 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold mb-3">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Keunggulan Layanan</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Kenapa Memilih Danara Cell?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            Kami berkomitmen memberikan pengalaman isi ulang digital yang paling mudah, aman, dan memuaskan bagi seluruh pelanggan.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 hover:bg-slate-900 transition-all duration-300 group shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  {feat.icon}
                </div>
                <h3 className="text-base font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
