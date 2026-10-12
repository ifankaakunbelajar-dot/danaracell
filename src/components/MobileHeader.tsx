import React from 'react';
import { MessageCircle } from 'lucide-react';
import { StoreLogo } from './StoreLogo';

interface MobileHeaderProps {
  whatsappNumber: string;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({ whatsappNumber }) => {
  const handleChatCs = () => {
    const cleanPhone = whatsappNumber.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=Halo%20Admin%20Danara%20Cell`, '_blank');
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-3 shadow-xs">
      <div className="flex items-center justify-between">
        
        {/* Brand & Biru Kalem - Kuning Cerah Accent */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-sky-500 to-yellow-400 p-0.5 shadow-sm shadow-sky-500/10">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center overflow-hidden">
              <StoreLogo className="w-full h-full" iconClassName="w-5 h-5 text-sky-600" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base font-black text-slate-900 tracking-tight leading-tight">
                Danara Cell
              </h1>
              {/* Biru Kalem & Kuning Cerah dots */}
              <div className="flex items-center gap-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
              </div>
            </div>
            {/* Online 24 Jam */}
            <p className="text-[11px] font-semibold text-sky-700 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse"></span>
              <span>Online 24 Jam • Langsung WA</span>
            </p>
          </div>
        </div>

        {/* WhatsApp CS Button in Biru Kalem & Kuning Cerah */}
        <button
          onClick={handleChatCs}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-sky-600 to-yellow-400 hover:opacity-95 text-slate-950 text-xs font-black shadow-xs transition-all active:scale-95 cursor-pointer"
        >
          <MessageCircle className="w-3.5 h-3.5 fill-slate-950" />
          <span>Chat CS</span>
        </button>

      </div>
    </header>
  );
};
