import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle, ArrowLeft, ChevronDown } from 'lucide-react';

/**
 * FAQ Page — /faq
 * Standalone crawlable page with schema markup for Google
 */
const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    document.title = 'FAQ - SpinWheel AI | Frequently Asked Questions';
    let meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Frequently asked questions about SpinWheel AI. Learn how our free AI wheel spinner works, about privacy, usage limits, features, and more.');
    window.scrollTo(0, 0);
  }, []);

  const faqCategories = [
    {
      category: 'General',
      emoji: '🎡',
      faqs: [
        {
          q: 'What is SpinWheel AI?',
          a: 'SpinWheel AI is a free, AI-powered wheel spinner and random picker tool available at spinwheelai.online. You can type any topic and our built-in AI will automatically generate a list of relevant items to populate your spinning wheel. No signup required — just type, spin, and decide!'
        },
        {
          q: 'Is SpinWheel AI free to use?',
          a: 'Yes! SpinWheel AI is completely free to use. You get 10 free AI generations per day. The spinning wheel itself is unlimited — you can spin as many times as you want with no restrictions. You can also earn extra AI credits by watching a short rewarded ad.'
        },
        {
          q: 'Do I need to create an account?',
          a: 'No account or signup is required. SpinWheel AI works instantly in your browser without any registration. Your wheel items are saved locally in your browser using localStorage, so they persist between sessions without needing an account.'
        },
        {
          q: 'How does the AI generation work?',
          a: 'When you type a topic (like "Dinner Ideas" or "Team Names") into the AI Panel, SpinWheel AI sends your prompt to the Groq API — a powerful and fast AI inference service. The AI model generates a relevant list of 4-10 items and automatically populates your wheel, saving you time!'
        },
        {
          q: 'How many free AI generations do I get per day?',
          a: 'You get 10 free AI generations every 24 hours. This limit resets daily and is tracked locally in your browser. You can earn additional generations by watching a short rewarded advertisement within the app.'
        }
      ]
    },
    {
      category: 'Features',
      emoji: '⚡',
      faqs: [
        {
          q: 'Can I customize the wheel?',
          a: 'Yes! You can fully customize the wheel by manually adding, editing, and removing items using the item panel on the right side of the app. You can add as many or as few items as you like. The wheel automatically adjusts its segment sizes and colors based on your item list.'
        },
        {
          q: 'Can I save my wheels?',
          a: 'Your wheel items are automatically saved in your browser\'s localStorage, so they persist across sessions on the same device and browser. However, we don\'t currently have cloud-based saving (which requires no account). To save multiple wheel configurations, you can copy your items as text.'
        },
        {
          q: 'Is there a mobile app?',
          a: 'SpinWheel AI is fully responsive and optimized for mobile browsers. You can use it on your iPhone, Android phone, or tablet directly in your mobile browser without downloading anything. It works just as well on mobile as on desktop!'
        },
        {
          q: 'What is the Elimination Mode?',
          a: 'Elimination Mode (also called "Remove Winner" feature) allows you to automatically remove the winning item from the wheel after each spin. This is great for bracket-style tournaments, drawing names without repeats, or any situation where you don\'t want items to repeat.'
        },
        {
          q: 'Can I use SpinWheel AI for classroom activities?',
          a: 'Absolutely! SpinWheel AI is great for teachers and educators. You can use it to randomly pick students to answer questions, choose classroom activities, create fun decision-making games, or generate topic lists for lessons using the AI feature.'
        }
      ]
    },
    {
      category: 'Technical',
      emoji: '🔧',
      faqs: [
        {
          q: 'What technology powers SpinWheel AI?',
          a: 'SpinWheel AI is built with React and Vite on the frontend, styled with Tailwind CSS. The AI generation is powered by the Groq API, which provides fast inference using models like GPT-compatible LLMs. The spinning wheel is built using the HTML5 Canvas API for smooth animations.'
        },
        {
          q: 'Is the wheel truly random?',
          a: 'Yes! The wheel uses JavaScript\'s Math.random() function combined with a randomized spin duration and landing position to ensure fair and unbiased results. Each spin independently calculates a random stopping angle, making every spin unpredictable and fair.'
        },
        {
          q: 'What happens if the AI generation fails?',
          a: 'If AI generation fails (e.g., due to a network issue or high server load), SpinWheel AI will automatically try alternative AI models before giving up. If all models fail, you\'ll see a friendly error message: "AI is temporarily unavailable. Please try again in a moment!" — no technical details will be shown.'
        },
        {
          q: 'Can I use SpinWheel AI offline?',
          a: 'The spinning wheel works fully offline once the page is loaded, since it only uses your browser\'s built-in capabilities. However, the AI generation feature requires an internet connection to communicate with the Groq API servers.'
        }
      ]
    },
    {
      category: 'Privacy & Security',
      emoji: '🔒',
      faqs: [
        {
          q: 'Is my data safe?',
          a: 'Yes. SpinWheel AI does not collect any personal data. Your wheel items are stored locally in your browser using localStorage and never sent to our servers. The only data that leaves your browser is your AI prompt text, which is sent to Groq API for processing.'
        },
        {
          q: 'Do you store my AI prompts?',
          a: 'No. We do not store, log, or analyze your AI prompts. Your prompt is sent directly to Groq\'s API servers for processing to generate the wheel items, and no copy is kept by SpinWheel AI. Please refer to Groq\'s Privacy Policy for how they handle API requests.'
        },
        {
          q: 'How do you use cookies?',
          a: 'SpinWheel AI itself does not set any first-party cookies. We use localStorage (not cookies) to save your wheel items and usage count locally. However, our advertising partner Google AdSense uses third-party cookies to serve relevant ads. You can control these in your browser settings.'
        },
        {
          q: 'Can I delete my local data?',
          a: 'Yes! To remove all locally stored data from SpinWheel AI, simply clear your browser\'s localStorage and site data. In most browsers, you can do this via Settings → Privacy → Clear Browsing Data, and select "Cookies and site data" or "Cached images and files".'
        }
      ]
    },
    {
      category: 'Ads & Support',
      emoji: '💜',
      faqs: [
        {
          q: 'Why do you show ads?',
          a: 'SpinWheel AI is completely free to use, and ads are how we keep it that way. Advertising revenue helps cover hosting costs, API usage fees, and supports continued development of new features. We appreciate your understanding!'
        },
        {
          q: 'How can I support SpinWheel AI?',
          a: 'You can support SpinWheel AI in several ways: (1) Keep your ad blocker off while using our site, (2) Share SpinWheel AI with friends, teachers, or colleagues, (3) Buy us a coffee via the donate button in the app, (4) Leave a positive review or share on social media.'
        },
        {
          q: 'I found a bug. How do I report it?',
          a: 'We appreciate bug reports! Please email us at spinwheelai@spinwheelai.online with a description of the issue, what you were doing when it happened, and your browser/device information. We aim to fix critical bugs as quickly as possible.'
        }
      ]
    }
  ];

  const toggle = (catIdx, faqIdx) => {
    const key = `${catIdx}-${faqIdx}`;
    setOpenIndex(openIndex === key ? null : key);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-pink-50 font-poppins">
      {/* Top Nav Bar */}
      <nav className="bg-white border-b border-gray-100 px-4 py-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-600 hover:text-violet-600 transition-colors font-medium text-sm"
          >
            <ArrowLeft size={16} />
            Back to SpinWheel AI
          </Link>
          <span className="text-gray-300">|</span>
          <div className="flex items-center gap-2">
            <span className="text-xl">🎡</span>
            <span className="font-black bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent text-sm">
              SpinWheel AI
            </span>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-blue-100 rounded-2xl">
            <HelpCircle className="text-blue-500" size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-900">Frequently Asked Questions</h1>
            <p className="text-gray-500 text-sm mt-1">Everything you need to know about SpinWheel AI</p>
          </div>
        </div>

        <p className="text-gray-500 text-sm mb-10">
          Can't find what you're looking for?{' '}
          <Link to="/contact" className="text-violet-600 hover:underline font-medium">Contact us</Link> and we'll help!
        </p>

        {/* FAQ Categories */}
        <div className="space-y-10">
          {faqCategories.map((category, catIdx) => (
            <div key={catIdx}>
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span>{category.emoji}</span>
                {category.category}
              </h2>
              <div className="space-y-3">
                {category.faqs.map((faq, faqIdx) => {
                  const key = `${catIdx}-${faqIdx}`;
                  const isOpen = openIndex === key;
                  return (
                    <div
                      key={faqIdx}
                      className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:border-violet-200 transition-colors"
                    >
                      <button
                        onClick={() => toggle(catIdx, faqIdx)}
                        className="w-full flex items-center justify-between p-5 text-left cursor-pointer font-semibold text-gray-800 hover:bg-violet-50 transition-colors"
                        aria-expanded={isOpen}
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          size={18}
                          className={`text-gray-400 flex-shrink-0 ml-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-50">
                          <div className="pt-4">{faq.a}</div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-br from-violet-600 to-pink-500 rounded-3xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">Still have questions?</h2>
          <p className="text-white/80 mb-6">Our team is happy to help. Send us a message!</p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-white text-violet-700 font-bold px-6 py-3 rounded-xl hover:bg-violet-50 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-6 px-4 mt-8 text-center">
        <p className="text-xs text-gray-400">
          © 2026 SpinWheel AI. All rights reserved. |{' '}
          <Link to="/" className="hover:text-violet-600 transition-colors">Home</Link>{' | '}
          <Link to="/privacy-policy" className="hover:text-violet-600 transition-colors">Privacy Policy</Link>{' | '}
          <Link to="/terms-of-service" className="hover:text-violet-600 transition-colors">Terms of Service</Link>{' | '}
          <Link to="/contact" className="hover:text-violet-600 transition-colors">Contact</Link>
        </p>
      </footer>
    </div>
  );
};

export default FAQPage;
