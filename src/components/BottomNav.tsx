import React from 'react';
import { Zap, Store } from 'lucide-react';

export type ActivePage = 'pesan' | 'profil';

interface BottomNavProps {
  activePage: ActivePage;
  onChangePage: (page: ActivePage) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activePage, onChangePage }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 max-w-md mx-auto bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg">
      <div className="grid grid-cols-2 py-2 px-6">
        
        {/* Tab 1: Pesan */}
        <button
          type="button"
          onClick={() => onChangePage('pesan')}
          className={`flex flex-col items-center justify-center py-1 transition-all cursor-pointer ${
            activePage === 'pesan' ? 'text-sky-800' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <div
            className={`p-1.5 rounded-xl transition-all ${
              activePage === 'pesan'
                ? 'bg-gradient-to-r from-sky-500 to-yellow-400 text-slate-950 shadow-xs scale-105'
                : 'bg-transparent text-slate-500'
            }`}
          >
            <Zap className={`w-4 h-4 ${activePage === 'pesan' ? 'fill-slate-950' : ''}`} />
          </div>
          <span
            className={`text-[11px] mt-1 tracking-tight ${
              activePage === 'pesan' ? 'font-black text-sky-900' : 'font-semibold text-slate-500'
            }`}
          >
            Pesan
          </span>
        </button>

        {/* Tab 2: Profil Toko */}
        <button
          type="button"
          onClick={() => onChangePage('profil')}
          className={`flex flex-col items-center justify-center py-1 transition-all cursor-pointer ${
            activePage === 'profil' ? 'text-sky-800' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <div
            className={`p-1.5 rounded-xl transition-all ${
              activePage === 'profil'
                ? 'bg-gradient-to-r from-sky-500 to-yellow-400 text-slate-950 shadow-xs scale-105'
                : 'bg-transparent text-slate-500'
            }`}
          >
            <Store className={`w-4 h-4 ${activePage === 'profil' ? 'stroke-[2.5]' : ''}`} />
          </div>
          <span
            className={`text-[11px] mt-1 tracking-tight ${
              activePage === 'profil' ? 'font-black text-sky-900' : 'font-semibold text-slate-500'
            }`}
          >
            Profil Toko
          </span>
        </button>

      </div>
    </nav>
  );
};
