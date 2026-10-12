import React, { useState } from 'react';
import { SimpleOrderData } from '../types';
import { generateOrderWhatsAppMessage, createWhatsAppUrl } from '../utils/whatsappHelper';
import { CheckCircle2, MessageCircle, Copy, Check, X } from 'lucide-react';

interface MobileSuccessModalProps {
  order: SimpleOrderData;
  whatsappNumber: string;
  onClose: () => void;
}

export const MobileSuccessModal: React.FC<MobileSuccessModalProps> = ({
  order,
  whatsappNumber,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  const rawMessage = generateOrderWhatsAppMessage(order);
  const waUrl = createWhatsAppUrl(whatsappNumber, rawMessage);

  const handleCopy = () => {
    navigator.clipboard.writeText(rawMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-sm bg-white border border-slate-200 rounded-3xl p-5 shadow-2xl space-y-4 overflow-hidden">
        
        {/* Top Accent Biru Kalem - Kuning Cerah Gradient */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-sky-400 to-yellow-400" />
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 bg-slate-100 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Icon & Title */}
        <div className="text-center space-y-1 pt-1">
          <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h3 className="text-base font-black text-slate-900">Format WhatsApp Siap!</h3>
          <p className="text-xs text-slate-500">
            Pesan order telah dibuat untuk dikirimkan ke WhatsApp Danara Cell.
          </p>
        </div>

        {/* Order Details in light box */}
        <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-1.5 text-xs">
          <div className="flex justify-between text-slate-500 pb-1.5 border-b border-slate-200">
            <span>ID Pesanan</span>
            <span className="font-mono font-bold text-slate-900">{order.orderId}</span>
          </div>

          <div className="flex justify-between text-slate-700">
            <span>Layanan</span>
            <span className="font-bold text-sky-800 uppercase">
              {order.serviceType.replace('_', ' ')} ({order.provider.name})
            </span>
          </div>

          <div className="flex justify-between text-slate-700">
            <span>Tujuan</span>
            <span className="font-mono text-slate-900 font-bold">{order.targetNumber}</span>
          </div>

          {order.nominal && (
            <div className="flex justify-between text-slate-700">
              <span>Nominal</span>
              <span className="font-extrabold text-slate-900">{order.nominal}</span>
            </div>
          )}

          {order.packageRequest && (
            <div className="flex justify-between text-slate-700">
              <span>Permintaan Kuota</span>
              <span className="font-bold text-sky-800 truncate max-w-[150px]">
                {order.packageRequest}
              </span>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="space-y-2 pt-1">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-gradient-to-r from-sky-600 via-sky-500 to-yellow-400 hover:opacity-95 text-slate-950 font-black text-xs shadow-md shadow-sky-500/10 active:scale-98 transition-all"
          >
            <MessageCircle className="w-4 h-4 fill-slate-950" />
            <span>BUKA WHATSAPP SEKARANG</span>
          </a>

          <button
            onClick={handleCopy}
            className="w-full py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-sky-600" />
                <span className="text-sky-800 font-bold">Format Chat Berhasil Disalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Salin Teks Pesan</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
