import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, ArrowLeft } from 'lucide-react';

/**
 * Terms of Service Page — /terms-of-service
 * Standalone crawlable page for Google AdSense approval
 */
const TermsOfServicePage = () => {
  useEffect(() => {
    document.title = 'Terms of Service - SpinWheel AI | Usage Terms & Conditions';
    let meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Read the Terms of Service for SpinWheel AI. Understand how to use our free AI wheel spinner tool, usage limits, AI content disclaimers, and governing policies.');
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
          <div className="p-3 bg-violet-100 rounded-2xl">
            <FileText className="text-violet-600" size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-900">Terms of Service</h1>
            <p className="text-gray-500 text-sm mt-1">Last updated: August 2026</p>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 space-y-8 leading-relaxed">

          {/* Intro */}
          <p className="text-gray-600 text-base">
            Welcome to <strong>SpinWheel AI</strong>. By accessing or using our website at{' '}
            <a href="https://spinwheelai.online" className="text-violet-600 hover:underline">spinwheelai.online</a>,
            you agree to be bound by these Terms of Service. Please read them carefully before using our service. 
            If you do not agree to these terms, please do not use SpinWheel AI.
          </p>

          {/* Section 1 */}
          <section aria-labelledby="tos-1">
            <h2 id="tos-1" className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-violet-100 text-violet-700 text-sm font-black flex items-center justify-center">1</span>
              Acceptance of Terms
            </h2>
            <p className="text-gray-600">
              By using SpinWheel AI, you confirm that you are at least 13 years of age (or the minimum age required in your jurisdiction), 
              and that you have the legal capacity to agree to these Terms. If you are using the service on behalf of an organization, 
              you represent that you have the authority to bind that organization to these Terms.
            </p>
          </section>

          {/* Section 2 */}
          <section aria-labelledby="tos-2">
            <h2 id="tos-2" className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-violet-100 text-violet-700 text-sm font-black flex items-center justify-center">2</span>
              Description of Service
            </h2>
            <p className="text-gray-600 mb-3">
              SpinWheel AI is a free, browser-based tool that provides:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>An <strong>AI-powered wheel spinner</strong> that generates item lists based on user-provided topics using the Groq API.</li>
              <li>A <strong>customizable spinning wheel</strong> for random selection and decision-making.</li>
              <li>Features such as elimination mode, spin history, and item management.</li>
            </ul>
            <p className="text-gray-600 mt-3">
              The service is provided "as-is" and is free to use. We reserve the right to modify, suspend, or discontinue any part of the service at any time without prior notice.
            </p>
          </section>

          {/* Section 3 */}
          <section aria-labelledby="tos-3">
            <h2 id="tos-3" className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-violet-100 text-violet-700 text-sm font-black flex items-center justify-center">3</span>
              Acceptable Use
            </h2>
            <p className="text-gray-600 mb-3">You agree to use SpinWheel AI only for lawful purposes. You must NOT:</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Use the service for any illegal or harmful activity.</li>
              <li>Attempt to circumvent usage limits or exploit the service unfairly.</li>
              <li>Submit prompts that are hateful, abusive, threatening, or violate anyone's rights.</li>
              <li>Use automated bots or scripts to access the service in an unauthorized manner.</li>
              <li>Attempt to reverse-engineer or scrape the service in ways not intended.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section aria-labelledby="tos-4">
            <h2 id="tos-4" className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-violet-100 text-violet-700 text-sm font-black flex items-center justify-center">4</span>
              AI-Generated Content Disclaimer
            </h2>
            <p className="text-gray-600 mb-3">
              SpinWheel AI uses third-party AI models (via Groq API) to generate content. Please be aware:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>AI-generated results are provided for <strong>entertainment and convenience purposes only</strong>.</li>
              <li>Results are not guaranteed to be accurate, complete, or suitable for every purpose.</li>
              <li>We are not responsible for decisions made based on AI-generated wheel content.</li>
              <li>You should always review AI-generated content before relying on it for important decisions.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section aria-labelledby="tos-5">
            <h2 id="tos-5" className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-violet-100 text-violet-700 text-sm font-black flex items-center justify-center">5</span>
              Free Credits and Usage Limits
            </h2>
            <p className="text-gray-600 mb-3">
              SpinWheel AI provides a daily limit of <strong>10 free AI generations</strong> per day per browser. These limits are stored locally in your browser.
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Daily AI generation limits reset every 24 hours.</li>
              <li>You may earn additional AI generations by watching rewarded advertisements.</li>
              <li>We reserve the right to change free credit limits at any time without notice.</li>
              <li>Unlimited spinning of the wheel is always free with no restrictions.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section aria-labelledby="tos-6">
            <h2 id="tos-6" className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-violet-100 text-violet-700 text-sm font-black flex items-center justify-center">6</span>
              Advertisements
            </h2>
            <p className="text-gray-600">
              SpinWheel AI is a free service supported by advertising revenue. We display advertisements from <strong>Google AdSense</strong> and may show interstitial or banner ads within the application. By using SpinWheel AI, you acknowledge and accept that:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mt-3">
              <li>Advertisements may be displayed during your use of the service.</li>
              <li>Ads are served by Google and are subject to Google's own terms and policies.</li>
              <li>We are not responsible for the content of third-party advertisements.</li>
              <li>You can support us by not using ad blockers, which helps keep the service free.</li>
            </ul>
          </section>

          {/* Section 7 */}
          <section aria-labelledby="tos-7">
            <h2 id="tos-7" className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-violet-100 text-violet-700 text-sm font-black flex items-center justify-center">7</span>
              Intellectual Property
            </h2>
            <p className="text-gray-600">
              The SpinWheel AI name, logo, branding, interface design, and all related content are the property of the project creator (<strong>Muhammad Burhan</strong>) and are protected by applicable intellectual property laws. You may not:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mt-3">
              <li>Copy, reproduce, or distribute the SpinWheel AI interface or branding without permission.</li>
              <li>Use our brand name or logo for commercial purposes without written consent.</li>
              <li>Create derivative works based on our proprietary code or design.</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section aria-labelledby="tos-8">
            <h2 id="tos-8" className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-violet-100 text-violet-700 text-sm font-black flex items-center justify-center">8</span>
              Disclaimer of Warranties
            </h2>
            <p className="text-gray-600">
              SpinWheel AI is provided on an <strong>"as is" and "as available" basis</strong> without any warranties of any kind, either express or implied. We do not warrant that:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mt-3">
              <li>The service will be uninterrupted, error-free, or secure at all times.</li>
              <li>AI-generated content will be accurate or meet your specific requirements.</li>
              <li>The wheel's random selection is suitable for use in formal, legal, or binding decisions.</li>
            </ul>
          </section>

          {/* Section 9 */}
          <section aria-labelledby="tos-9">
            <h2 id="tos-9" className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-violet-100 text-violet-700 text-sm font-black flex items-center justify-center">9</span>
              Limitation of Liability
            </h2>
            <p className="text-gray-600">
              To the fullest extent permitted by law, SpinWheel AI and its creator shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the service, including but not limited to loss of data, loss of profits, or damages resulting from decisions made using AI-generated content or the random wheel picker.
            </p>
          </section>

          {/* Section 10 */}
          <section aria-labelledby="tos-10">
            <h2 id="tos-10" className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-violet-100 text-violet-700 text-sm font-black flex items-center justify-center">10</span>
              Governing Law
            </h2>
            <p className="text-gray-600">
              These Terms of Service shall be governed by and construed in accordance with the laws of <strong>Pakistan</strong>, without regard to its conflict of law provisions. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts of Pakistan.
            </p>
          </section>

          {/* Section 11 */}
          <section aria-labelledby="tos-11">
            <h2 id="tos-11" className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-violet-100 text-violet-700 text-sm font-black flex items-center justify-center">11</span>
              Changes to Terms
            </h2>
            <p className="text-gray-600">
              We reserve the right to update or modify these Terms of Service at any time. Changes will be effective immediately upon posting to this page with an updated "Last updated" date. Your continued use of SpinWheel AI after any changes constitutes your acceptance of the revised Terms.
            </p>
          </section>

          {/* Section 12 - Contact */}
          <section aria-labelledby="tos-12" className="bg-gradient-to-br from-violet-50 to-pink-50 rounded-2xl p-6 border border-violet-100">
            <h2 id="tos-12" className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-violet-100 text-violet-700 text-sm font-black flex items-center justify-center">12</span>
              Contact Us
            </h2>
            <p className="text-gray-600 mb-3">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <p className="text-gray-700 font-medium">
              📧 Email:{' '}
              <a href="mailto:spinwheelai@spinwheelai.online" className="text-violet-600 hover:underline">
                spinwheelai@spinwheelai.online
              </a>
            </p>
            <p className="text-gray-500 text-sm mt-2">Response time: within 24–48 business hours.</p>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-6 px-4 mt-8 text-center">
        <p className="text-xs text-gray-400">
          © 2026 SpinWheel AI. All rights reserved. |{' '}
          <Link to="/" className="hover:text-violet-600 transition-colors">Home</Link>{' | '}
          <Link to="/privacy-policy" className="hover:text-violet-600 transition-colors">Privacy Policy</Link>{' | '}
          <Link to="/contact" className="hover:text-violet-600 transition-colors">Contact</Link>
        </p>
      </footer>
    </div>
  );
};

export default TermsOfServicePage;
