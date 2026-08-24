import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';

/**
 * Privacy Policy Page — /privacy-policy
 * Standalone crawlable page for Google AdSense approval
 */
const PrivacyPolicyPage = () => {
  useEffect(() => {
    document.title = 'Privacy Policy - SpinWheel AI | How We Protect Your Data';
    // Update meta description dynamically
    let meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Privacy Policy for SpinWheel AI. We don\'t collect personal data. Learn how we use local storage, AdSense, and protect your privacy.');
    window.scrollTo(0, 0);
  }, []);

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

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-pink-100 rounded-2xl">
            <Shield className="text-pink-500" size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-900">Privacy Policy</h1>
            <p className="text-gray-500 text-sm mt-1">Last updated: August 2026</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-8 leading-relaxed">

          {/* Intro */}
          <p className="text-gray-600 text-base">
            Welcome to <strong>SpinWheel AI</strong> (<a href="https://spinwheelai.online" className="text-violet-600 hover:underline">spinwheelai.online</a>). 
            We are committed to protecting your privacy. This Privacy Policy explains how we handle information when you use our free AI-powered wheel spinner tool. 
            We believe in full transparency — and our core principle is simple: <strong>we do not collect or store your personal data.</strong>
          </p>

          {/* Section 1 */}
          <section aria-labelledby="section-1">
            <h2 id="section-1" className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-violet-100 text-violet-700 text-sm font-black flex items-center justify-center">1</span>
              Information We Collect
            </h2>
            <p className="text-gray-600 mb-3">
              <strong>SpinWheel AI does not collect, store, or sell any personal information.</strong> You are not required to create an account, provide your name, email address, or any other identifying information to use our service.
            </p>
            <p className="text-gray-600">
              We do not use any backend user database. There is no sign-up, no login, and no profile system. Your experience on SpinWheel AI is entirely anonymous.
            </p>
          </section>

          {/* Section 2 */}
          <section aria-labelledby="section-2">
            <h2 id="section-2" className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-violet-100 text-violet-700 text-sm font-black flex items-center justify-center">2</span>
              Local Storage (Browser Data)
            </h2>
            <p className="text-gray-600 mb-3">
              To provide a better user experience, SpinWheel AI uses your browser's <strong>localStorage</strong> (a built-in browser feature) to save certain data <em>only on your device</em>:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><strong>Wheel items:</strong> The items you add to your spin wheel are saved locally so they persist between sessions.</li>
              <li><strong>Daily AI usage count:</strong> We track your daily AI generation count (maximum 10 per day) locally in your browser to enforce fair usage limits.</li>
            </ul>
            <p className="text-gray-600 mt-3">
              <strong>This data never leaves your device.</strong> It is never transmitted to our servers or any third party. You can clear this data at any time by clearing your browser's localStorage or cache.
            </p>
          </section>

          {/* Section 3 */}
          <section aria-labelledby="section-3">
            <h2 id="section-3" className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-violet-100 text-violet-700 text-sm font-black flex items-center justify-center">3</span>
              Google AdSense & Advertising
            </h2>
            <p className="text-gray-600 mb-3">
              SpinWheel AI uses <strong>Google AdSense</strong> to display advertisements. This helps us keep the service free for everyone. Google AdSense is a third-party service provided by Google LLC.
            </p>
            <p className="text-gray-600 mb-3">
              As part of this service, Google may:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Use cookies and similar tracking technologies to serve personalized advertisements based on your browsing history.</li>
              <li>Collect information about your visits to this and other websites to provide relevant advertisements.</li>
              <li>Use the DoubleClick cookie to serve ads across the web.</li>
            </ul>
            <p className="text-gray-600 mt-3">
              We do not control Google's data collection or use practices. For more information, please review Google's Privacy Policy at:{' '}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">
                https://policies.google.com/privacy
              </a>
            </p>
            <p className="text-gray-600 mt-3">
              You can opt out of personalized advertising by visiting:{' '}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">
                Google Ad Settings
              </a>
            </p>
          </section>

          {/* Section 4 */}
          <section aria-labelledby="section-4">
            <h2 id="section-4" className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-violet-100 text-violet-700 text-sm font-black flex items-center justify-center">4</span>
              Groq API & AI Generation
            </h2>
            <p className="text-gray-600 mb-3">
              When you use the AI generation feature, the text prompt you enter is sent to <strong>Groq API</strong> servers for processing. This is necessary to generate the AI-powered list of wheel items.
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>We do <strong>not</strong> store your prompts on our servers.</li>
              <li>We do <strong>not</strong> log or analyze your input text.</li>
              <li>Prompts are sent to Groq's servers solely for the purpose of generating a response and are subject to <a href="https://groq.com/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">Groq's Privacy Policy</a>.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section aria-labelledby="section-5">
            <h2 id="section-5" className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-violet-100 text-violet-700 text-sm font-black flex items-center justify-center">5</span>
              Cookies
            </h2>
            <p className="text-gray-600 mb-3">
              SpinWheel AI itself does not set any first-party cookies. However, our advertising partner Google AdSense uses cookies as described in Section 3. Most browsers allow you to control cookies through their settings.
            </p>
            <p className="text-gray-600">
              You can choose to disable cookies in your browser settings, but please note that disabling cookies may affect some functionality of the website and may result in less relevant advertisements.
            </p>
          </section>

          {/* Section 6 */}
          <section aria-labelledby="section-6">
            <h2 id="section-6" className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-violet-100 text-violet-700 text-sm font-black flex items-center justify-center">6</span>
              Third-Party Services
            </h2>
            <p className="text-gray-600 mb-3">Our website uses the following third-party services:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><strong>Google AdSense</strong> — Advertising platform. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">Privacy Policy</a></li>
              <li><strong>Groq API</strong> — AI text generation. <a href="https://groq.com/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">Privacy Policy</a></li>
              <li><strong>Google Fonts</strong> — Web font delivery. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">Privacy Policy</a></li>
            </ul>
          </section>

          {/* Section 7 */}
          <section aria-labelledby="section-7">
            <h2 id="section-7" className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-violet-100 text-violet-700 text-sm font-black flex items-center justify-center">7</span>
              Your Rights
            </h2>
            <p className="text-gray-600 mb-3">Since we don't collect personal data, there is very little data to exercise rights over. However, you have the right to:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><strong>Clear your local data</strong> — Clear your browser's localStorage and cookies at any time to remove all locally stored preferences.</li>
              <li><strong>Opt out of personalized ads</strong> — Adjust your Google Ad Settings to disable personalized advertising.</li>
              <li><strong>Contact us</strong> — Reach out if you have any privacy concerns or questions.</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section aria-labelledby="section-8">
            <h2 id="section-8" className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-violet-100 text-violet-700 text-sm font-black flex items-center justify-center">8</span>
              Children's Privacy
            </h2>
            <p className="text-gray-600">
              SpinWheel AI is not directed to children under the age of 13. We do not knowingly collect any personal information from children. Since we do not collect personal data from any users, our service is safe for all age groups to use under parental supervision.
            </p>
          </section>

          {/* Section 9 */}
          <section aria-labelledby="section-9">
            <h2 id="section-9" className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-violet-100 text-violet-700 text-sm font-black flex items-center justify-center">9</span>
              Changes to This Policy
            </h2>
            <p className="text-gray-600">
              We may update this Privacy Policy from time to time. We will notify you of any significant changes by updating the "Last updated" date at the top of this page. Continued use of SpinWheel AI after changes are posted constitutes your acceptance of the updated policy.
            </p>
          </section>

          {/* Section 10 - Contact */}
          <section aria-labelledby="section-10" className="bg-gradient-to-br from-violet-50 to-pink-50 rounded-2xl p-6 border border-violet-100">
            <h2 id="section-10" className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-violet-100 text-violet-700 text-sm font-black flex items-center justify-center">10</span>
              Contact Us
            </h2>
            <p className="text-gray-600 mb-3">
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:
            </p>
            <p className="text-gray-700 font-medium">
              📧 Email:{' '}
              <a href="mailto:spinwheelai@spinwheelai.online" className="text-violet-600 hover:underline">
                spinwheelai@spinwheelai.online
              </a>
            </p>
            <p className="text-gray-500 text-sm mt-2">We aim to respond within 24–48 business hours.</p>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-6 px-4 mt-8 text-center">
        <p className="text-xs text-gray-400">
          © 2026 SpinWheel AI. All rights reserved. |{' '}
          <Link to="/" className="hover:text-violet-600 transition-colors">Home</Link>{' | '}
          <Link to="/terms-of-service" className="hover:text-violet-600 transition-colors">Terms of Service</Link>{' | '}
          <Link to="/contact" className="hover:text-violet-600 transition-colors">Contact</Link>
        </p>
      </footer>
    </div>
  );
};

export default PrivacyPolicyPage;
