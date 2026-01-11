import React from 'react';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';

const events = [
  {
    id: 1,
    title: "The Modest Showcase - Chennai",
    date: "October 15-16, 2024",
    time: "11:00 AM - 8:00 PM",
    location: "The Park Hotel, Nungambakkam",
    description: "Join us for an exclusive physical showcase of our latest OG Imported collection. Experience the fabrics in person.",
    image: "https://images.unsplash.com/photo-1564113808230-e8b2e544aa0e?q=80&w=800"
  },
  {
    id: 2,
    title: "Luxury Modest Wear Pop-up - Bangalore",
    date: "November 05, 2024",
    time: "10:00 AM - 9:00 PM",
    location: "JW Marriott, Lavelle Road",
    description: "A one-day special event featuring our best-selling Abayas and Pakistani Suits.",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800"
  }
];

export default function EventsPage() {
  return (
    <div className="pt-20 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="py-16 text-center">
          <span className="text-[#D4AF37] uppercase tracking-[0.4em] text-xs mb-4 block">Physical Showcases</span>
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">Pop-up Events</h1>
          <p className="text-white/50 max-w-2xl mx-auto">
            Meet us in person and experience the luxury of TMC fabrics. Join our upcoming events across India.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {events.map((event) => (
            <div key={event.id} className="bg-[#171717] border border-white/5 overflow-hidden group">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8 md:p-12">
                <h3 className="text-2xl md:text-3xl font-serif text-white mb-6">{event.title}</h3>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-4 text-white/60">
                    <Calendar size={18} className="text-[#D4AF37]" />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-white/60">
                    <Clock size={18} className="text-[#D4AF37]" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-white/60">
                    <MapPin size={18} className="text-[#D4AF37]" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                </div>

                <p className="text-white/50 text-sm leading-relaxed mb-10">
                  {event.description}
                </p>

                <button className="w-full bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest py-4 hover:bg-[#D4AF37] hover:text-black transition-all duration-300 flex items-center justify-center space-x-3">
                  <span>RSVP for Event</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
