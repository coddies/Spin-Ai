import React from 'react';
import { HelpCircle, Zap, ShieldCheck, ChevronDown } from 'lucide-react';

/**
 * SEOSection - A rich, semantic content section for SEO and User Guidance.
 * Contains How to Use, Key Features, and FAQ with optimized keywords.
 */
const SEOSection = () => {
  const faqs = [
    {
      q: "What is Spin AI?",
      a: "Spin AI is an advanced AI-powered wheel spinner and random picker tool. It allows you to instantly generate categories or item lists using AI, saving you time and making decision-making fun and effortless."
    },
    {
      q: "How does the AI Random Picker work?",
      a: "Simply enter a topic (like 'Dinner Ideas' or 'Team Names') into the AI Panel. Our integrated AI model will generate a high-quality list of options and automatically populate the wheel for you."
    },
    {
      q: "Is Spin AI free to use?",
      a: "Yes! Spin AI is completely free. We provide a daily baseline of AI generations, and you can unlock even more uses by watching a short rewarded ad."
    },
    {
      q: "Can I use Spin AI on mobile?",
      a: "Absolutely. Spin AI is fully responsive and optimized for all devices, including iPhones, Android phones, tablets, and desktops."
    }
  ];

  return (
    <section className="mt-16 w-full max-w-4xl mx-auto px-4 pb-12 space-y-16">
      
      {/* 1. How to Use Section */}
      <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 border border-white/40 shadow-sm">
        <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
          <HelpCircle className="text-violet-600" size={28} />
          How to Use Spin AI
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: "1", title: "Enter Topic", desc: "Type a theme or use our AI Panel to generate ideas instantly." },
            { step: "2", title: "Customize", desc: "Add, remove, or edit items manually to get your wheel just right." },
            { step: "3", title: "Spin to Pick", desc: "Click 'SPIN' and let our random picker decide for you!" }
          ].map((item) => (
            <div key={item.step} className="relative">
              <span className="absolute -top-4 -left-2 text-6xl font-black text-violet-100/50 -z-10">{item.step}</span>
              <h3 className="font-bold text-gray-800 text-lg mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Key Features */}
      <div>
        <h2 className="text-2xl font-black text-gray-900 mb-8 text-center uppercase tracking-tight">
          Why Choose Spin AI?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: <Zap />, title: "AI-Powered", desc: "The first random picker that thinks for you." },
            { icon: <ShieldCheck />, title: "Fair & Random", desc: "Advanced algorithms ensure 100% unbiased results." },
            { icon: <ShieldCheck />, title: "No Sign-up", desc: "Start spinning immediately without any registration." }
          ].map((feature, i) => (
             <div key={i} className="p-6 rounded-2xl bg-gradient-to-br from-white to-violet-50 border border-violet-100 transition-transform hover:scale-[1.02]">
                <div className="text-violet-600 mb-3">{feature.icon}</div>
                <h3 className="font-bold text-gray-800 mb-1">{feature.title}</h3>
                <p className="text-xs text-gray-500">{feature.desc}</p>
             </div>
          ))}
        </div>
      </div>

      {/* 3. FAQ Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-gray-900 text-center">Frequently Asked Questions</h2>
        <dl className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="group bg-white border border-gray-100 rounded-2xl overflow-hidden transition-all">
              <summary className="flex items-center justify-between p-5 cursor-pointer list-none font-bold text-gray-800 hover:bg-violet-50 transition-colors">
                {faq.q}
                <ChevronDown size={18} className="text-gray-400 transition-transform group-open:rotate-180" />
              </summary>
              <div className="px-5 pb-5 text-sm text-gray-500 leading-relaxed animate-fade-in">
                {faq.a}
              </div>
            </details>
          ))}
        </dl>
      </div>

    </section>
  );
};

export default SEOSection;
