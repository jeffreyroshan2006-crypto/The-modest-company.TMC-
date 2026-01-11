import React from 'react';
import Link from 'next/link';
import { Instagram, Facebook, Twitter, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/10 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* Brand Info */}
        <div className="space-y-6">
          <Link href="/" className="flex flex-col">
            <span className="text-2xl font-serif tracking-[0.2em] text-white">TMC</span>
            <span className="text-[10px] tracking-[0.4em] text-[#D4AF37] uppercase">The Modest Company</span>
          </Link>
          <p className="text-white/50 text-sm leading-relaxed max-w-xs">
            Premium OG imported Hijabs, Abayas, and Pakistani Suits. Redefining luxury modest wear for the modern woman.
          </p>
          <div className="flex space-x-4">
            <a href="https://instagram.com/the.modestcompany" target="_blank" className="text-white/70 hover:text-[#D4AF37] transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-white/70 hover:text-[#D4AF37] transition-colors">
              <Facebook size={20} />
            </a>
            <a href="https://wa.me/918939075553" className="text-white/70 hover:text-[#D4AF37] transition-colors">
              <Phone size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-medium uppercase tracking-widest mb-6 text-sm">Shop</h4>
          <ul className="space-y-4 text-sm text-white/50">
            <li><Link href="/category/hijabs" className="hover:text-[#D4AF37] transition-colors">Hijabs</Link></li>
            <li><Link href="/category/abayas" className="hover:text-[#D4AF37] transition-colors">Abayas</Link></li>
            <li><Link href="/category/pakistani-suits" className="hover:text-[#D4AF37] transition-colors">Pakistani Suits</Link></li>
            <li><Link href="/shop" className="hover:text-[#D4AF37] transition-colors">New Arrivals</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-white font-medium uppercase tracking-widest mb-6 text-sm">Support</h4>
          <ul className="space-y-4 text-sm text-white/50">
            <li><Link href="/contact" className="hover:text-[#D4AF37] transition-colors">Contact Us</Link></li>
            <li><Link href="/policies/shipping" className="hover:text-[#D4AF37] transition-colors">Shipping Policy</Link></li>
            <li><Link href="/policies/returns" className="hover:text-[#D4AF37] transition-colors">Returns & Exchange</Link></li>
            <li><Link href="/policies/privacy" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-white font-medium uppercase tracking-widest mb-6 text-sm">Newsletter</h4>
          <p className="text-white/50 text-sm mb-4">Join the TMC family for exclusive drops and styling tips.</p>
          <form className="flex flex-col space-y-2">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="bg-white/5 border border-white/10 px-4 py-2 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
            <button className="bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-widest py-3 hover:bg-[#B8860B] transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="text-white/30 text-[10px] uppercase tracking-widest">
          © {new Date().getFullYear()} TMC - THE MODEST COMPANY. ALL RIGHTS RESERVED.
        </p>
        <p className="text-white/30 text-[10px] uppercase tracking-widest">
          DESIGNED FOR THE SOPHISTICATED
        </p>
      </div>
    </footer>
  );
};

export default Footer;
