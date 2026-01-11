import React from 'react';

export default function ShippingPolicy() {
  return (
    <div className="pt-20">
      <section className="py-24 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-serif text-white mb-12">Shipping Policy</h1>
        <div className="prose prose-invert max-w-none text-white/70 space-y-6">
          <p>At TMC, we strive to deliver your luxury modest wear as quickly and safely as possible.</p>
          <h3 className="text-white font-serif text-xl mt-8">Processing Times</h3>
          <p>Orders are typically processed within 2-3 business days. During peak seasons or sales, processing may take up to 5 business days.</p>
          <h3 className="text-white font-serif text-xl mt-8">Shipping Rates</h3>
          <p>We offer flat-rate shipping across India. International shipping rates are calculated at checkout based on weight and destination.</p>
          <h3 className="text-white font-serif text-xl mt-8">Delivery Estimates</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Domestic (India): 5-7 business days</li>
            <li>International: 10-15 business days</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
