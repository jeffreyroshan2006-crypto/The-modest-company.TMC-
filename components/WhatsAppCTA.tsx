'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppCTA = () => {
  const phoneNumber = "918939075553";
  const message = "Hi TMC! I'm interested in your luxury modest wear collection.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle size={28} fill="currentColor" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 whitespace-nowrap text-sm font-bold uppercase tracking-widest">
        Chat with us
      </span>
    </a>
  );
};

export default WhatsAppCTA;
