import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Send, CheckCircle } from 'lucide-react';

/**
 * Contact Page — /contact
 * Standalone crawlable page for Google AdSense approval
 */
const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    document.title = 'Contact Us - SpinWheel AI | Get in Touch';
    let meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Contact SpinWheel AI team. Have questions about our free AI wheel spinner? We respond within 24-48 hours. Reach us at spinwheelai@spinwheelai.online');
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Formspree endpoint — replace YOUR_FORM_ID with actual id from formspree.io
    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } catch {
      // Fallback: open mailto
      window.location.href = `mailto:spinwheelai@spinwheelai.online?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(formData.message)}`;
    }
    setSubmitting(false);
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
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-orange-100 rounded-2xl">
            <Mail className="text-orange-500" size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-900">Contact Us</h1>
            <p className="text-gray-500 text-sm mt-1">We'd love to hear from you!</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Left: Contact Info */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 space-y-5">
              <h2 className="font-bold text-gray-900 text-lg">Get in Touch</h2>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-orange-50 rounded-xl mt-0.5">
                  <Mail size={18} className="text-orange-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">Email</p>
                  <a href="mailto:spinwheelai@spinwheelai.online" className="text-violet-600 hover:underline text-sm break-all">
                    spinwheelai@spinwheelai.online
                  </a>
                  <p className="text-xs text-gray-400 mt-1">Response within 24–48 hours</p>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100">
                <p className="font-semibold text-gray-800 text-sm mb-3">Social Profiles</p>
                <div className="flex flex-col gap-2">
                  <a
                    href="https://www.linkedin.com/in/muhammad-burhan-73a81b27b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    💼 <span>LinkedIn</span>
                  </a>
                  <a
                    href="https://github.com/coddies"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    💻 <span>GitHub</span>
                  </a>
                  <a
                    href="https://muhammad-burhan.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-violet-600 transition-colors"
                  >
                    🌍 <span>Portfolio</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-gradient-to-br from-violet-50 to-pink-50 rounded-3xl border border-violet-100 p-6">
              <h2 className="font-bold text-gray-900 text-sm mb-3">Quick Links</h2>
              <div className="flex flex-col gap-2 text-sm">
                <Link to="/faq" className="text-violet-600 hover:underline">❓ FAQs</Link>
                <Link to="/privacy-policy" className="text-violet-600 hover:underline">🔒 Privacy Policy</Link>
                <Link to="/terms-of-service" className="text-violet-600 hover:underline">📄 Terms of Service</Link>
                <Link to="/" className="text-violet-600 hover:underline">🎡 Back to Spinner</Link>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="md:col-span-3">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                  <CheckCircle size={56} className="text-green-500" />
                  <h2 className="text-2xl font-bold text-gray-900">Message Sent!</h2>
                  <p className="text-gray-500">Thanks for reaching out. We'll get back to you within 24–48 hours.</p>
                  <button
                    onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', subject: '', message: '' }); }}
                    className="mt-4 px-6 py-2 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Send a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="contact-name" className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Your Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Muhammad Burhan"
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all"
                        />
                      </div>
                      <div>
                        <label htmlFor="contact-email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Email Address <span className="text-red-400">*</span>
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="you@example.com"
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="contact-subject" className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Subject <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="contact-subject"
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="e.g. Bug Report, Feature Request, General Question"
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-message" className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Message <span className="text-red-400">*</span>
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        placeholder="Write your message here..."
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full flex items-center justify-center gap-2 py-3.5 px-6 bg-gradient-to-r from-violet-600 to-pink-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <span>Sending...</span>
                      ) : (
                        <>
                          <Send size={16} />
                          Send Message
                        </>
                      )}
                    </button>
                    <p className="text-xs text-gray-400 text-center">
                      Or email us directly at{' '}
                      <a href="mailto:spinwheelai@spinwheelai.online" className="text-violet-600 hover:underline">
                        spinwheelai@spinwheelai.online
                      </a>
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-6 px-4 mt-8 text-center">
        <p className="text-xs text-gray-400">
          © 2026 SpinWheel AI. All rights reserved. |{' '}
          <Link to="/" className="hover:text-violet-600 transition-colors">Home</Link>{' | '}
          <Link to="/privacy-policy" className="hover:text-violet-600 transition-colors">Privacy Policy</Link>{' | '}
          <Link to="/terms-of-service" className="hover:text-violet-600 transition-colors">Terms of Service</Link>
        </p>
      </footer>
    </div>
  );
};

export default ContactPage;
