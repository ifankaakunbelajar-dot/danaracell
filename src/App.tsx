import React, { useState } from 'react';
import { SimpleOrderData } from './types';
import { DEFAULT_WHATSAPP_NUMBER } from './data/mockProducts';

// Components
import { MobileHeader } from './components/MobileHeader';
import { BottomNav, ActivePage } from './components/BottomNav';
import { BusinessBioHeader } from './components/BusinessBioHeader';
import { MobileOrderForm } from './components/MobileOrderForm';
import { MobileStoreProfile } from './components/MobileStoreProfile';
import { MobileSuccessModal } from './components/MobileSuccessModal';

export default function App() {
  // Nomor WhatsApp resmi Danara Cell (+62895357701152)
  const whatsappNumber = DEFAULT_WHATSAPP_NUMBER;

  // Active page state: 'pesan' atau 'profil' (dikontrol dari bottom navigation bar)
  const [activePage, setActivePage] = useState<ActivePage>('pesan');

  // Modal State
  const [activeOrder, setActiveOrder] = useState<SimpleOrderData | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleOrderSubmitted = (order: SimpleOrderData) => {
    setActiveOrder(order);
    setShowSuccessModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex justify-center selection:bg-sky-500 selection:text-white">
      
      {/* Mobile Screen Container (Background Putih, Smartphone View) */}
      <div className="w-full max-w-md min-h-screen bg-white flex flex-col relative shadow-xl border-x border-slate-200/80 pb-20">
        
        {/* 1. Header Ringkas Danara Cell */}
        <MobileHeader whatsappNumber={whatsappNumber} />

        {/* 2. Konten Sesuai Halaman yang Dipilih */}
        <main className="flex-1">
          {activePage === 'pesan' ? (
            <div className="space-y-1 animate-in fade-in duration-150">
              {/* Bio Usaha di Paling Atas */}
              <BusinessBioHeader />

              {/* Form Order Kilat & Lapor WA (Pulsa, Paket Data, Token Listrik, E-Wallet) */}
              <MobileOrderForm
                whatsappNumber={whatsappNumber}
                onOrderSubmitted={handleOrderSubmitted}
              />
            </div>
          ) : (
            /* Halaman Khusus Profil Toko */
            <div className="animate-in fade-in duration-150">
              <MobileStoreProfile
                whatsappNumber={whatsappNumber}
                onGoToOrder={() => setActivePage('pesan')}
              />
            </div>
          )}
        </main>

        {/* Minimal Footer (Konter Pulsa & PPOB telah dihapus) */}
        <footer className="py-4 text-center text-[11px] text-slate-400 border-t border-slate-100 bg-slate-50/50 mt-auto">
          <p className="font-semibold text-slate-700">Danara Cell</p>
          <p className="text-[10px] text-slate-400 mt-0.5">
            Layanan Otomatis Siap 24 Jam Langsung ke WhatsApp
          </p>
        </footer>

        {/* 3. Bottom Navigation Bar: Pesan & Profil Toko (Icon Di Atas, Tulisan Di Bawah) */}
        <BottomNav
          activePage={activePage}
          onChangePage={(page) => setActivePage(page)}
        />

        {/* 4. Modal Konfirmasi Lapor WhatsApp */}
        {showSuccessModal && activeOrder && (
          <MobileSuccessModal
            order={activeOrder}
            whatsappNumber={whatsappNumber}
            onClose={() => setShowSuccessModal(false)}
          />
        )}

      </div>

    </div>
  );
}
