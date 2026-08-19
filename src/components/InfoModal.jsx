import React from 'react';
import { X, User, Heart, Shield, Mail } from 'lucide-react';

const InfoModal = ({ type, onClose }) => {
  const content = {
    about: {
      title: 'About SpinWheel AI',
      icon: <User className="text-violet-500" size={24} />,
      body: (
        <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
          <p>
            SpinWheel AI was built by <strong className="text-gray-900">Muhammad Burhan</strong>, a developer passionate about making everyday decisions fun and effortless.
          </p>
          <p>
            This tool was created to eliminate the hassle of manually adding items to a wheel spinner — just type your topic and let AI do the work.
          </p>
          <div className="pt-4 border-t border-gray-100 flex flex-col gap-2">
            <span className="font-semibold text-gray-900 mb-1">Connect with me:</span>
            <a href="https://www.linkedin.com/in/muhammad-burhan-73a81b27b/" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:text-violet-700 underline underline-offset-2">
              LinkedIn
            </a>
            <a href="https://github.com/coddies" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:text-violet-700 underline underline-offset-2">
              GitHub (coddies)
            </a>
          </div>
        </div>
      )
    },
    privacy: {
      title: 'Privacy Policy',
      icon: <Shield className="text-pink-500" size={24} />,
      body: (
        <div className="space-y-4 text-gray-600 text-sm leading-relaxed pr-1">
          <p className="text-xs text-gray-400 font-semibold">Last updated: August 2026</p>
          
          <div>
            <h3 className="font-bold text-gray-900 mb-1">1. Information We Collect</h3>
            <p>We do not collect or store any personal information. No account or signup required.</p>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-900 mb-1">2. Local Storage</h3>
            <p>We store your daily AI usage count (max 10 per day) locally in your browser only. This data never leaves your device.</p>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-900 mb-1">3. Google AdSense</h3>
            <p>We use Google AdSense to display ads. Google may use cookies for personalized ads. See Google Privacy Policy for details:<br />
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline">https://policies.google.com/privacy</a></p>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-900 mb-1">4. Groq API</h3>
            <p>When you use AI generation, your text prompt is sent to Groq API servers for processing only. We do not store prompts.</p>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-900 mb-1">5. Contact</h3>
            <p>Email: <a href="mailto:spinwheelai@spinwheelai.online" className="text-violet-600 hover:underline">spinwheelai@spinwheelai.online</a></p>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-900 mb-1">6. Changes</h3>
            <p>We may update this policy anytime. Continued use means you accept changes.</p>
          </div>
        </div>
      )
    },
    contact: {
      title: 'Contact Us',
      icon: <Mail className="text-orange-500" size={24} />,
      body: (
        <div className="flex flex-col gap-4 text-gray-600 text-sm">
          <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 flex flex-col gap-1 items-center text-center">
            <span className="text-xs font-bold text-orange-600 uppercase tracking-wide">Email</span>
            <a href="mailto:spinwheelai@spinwheelai.online" className="text-base font-medium text-gray-900 hover:text-orange-600 transition-colors">
              spinwheelai@spinwheelai.online
            </a>
            <span className="text-xs text-orange-500 mt-1">Response time: within 24 hours</span>
          </div>
          
          <div className="flex flex-col gap-2 mt-2">
            <h3 className="font-semibold text-gray-900">Social Profiles</h3>
            <a href="https://www.linkedin.com/in/muhammad-burhan-73a81b27b/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-violet-600 transition-colors">
              💼 LinkedIn
            </a>
            <a href="https://github.com/coddies" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-violet-600 transition-colors">
              💻 GitHub
            </a>
          </div>
        </div>
      )
    },
    terms: {
      title: 'Terms of Service',
      icon: <Shield className="text-violet-500" size={24} />,
      body: (
        <div className="space-y-4 text-gray-600 text-sm leading-relaxed pr-1">
          <p className="text-xs text-gray-400 font-semibold">Last updated: August 16, 2026</p>
          
          <div>
            <h3 className="font-bold text-gray-900 mb-1">1. Acceptance of Terms</h3>
            <p>By using SpinWheel AI, users agree to these terms.</p>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-900 mb-1">2. Use of Service</h3>
            <p>SpinWheel AI is an AI-powered wheel spinner and random decision tool. Users should not use it for unlawful or harmful activities.</p>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-900 mb-1">3. AI-Generated Content</h3>
            <p>AI-generated results are provided for entertainment and convenience. Results are not guaranteed to be accurate, complete, or suitable for every purpose. Users should review results before relying on them.</p>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-900 mb-1">4. Free Credits and Usage Limits</h3>
            <p>Free AI credits may be limited. Daily limits, rewards, and availability may change at any time.</p>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-900 mb-1">5. Advertisements</h3>
            <p>The app may display third-party advertisements in the future. Third-party ads are subject to their own terms and policies.</p>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-900 mb-1">6. User Data</h3>
            <p>Wheel items and settings may be stored locally in the user's browser (localStorage). Users can clear browser storage to remove this data.</p>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-900 mb-1">7. Intellectual Property</h3>
            <p>The SpinWheel AI name, branding, and interface belong to the project owner. Users may not copy or misuse the product in unauthorized ways.</p>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-900 mb-1">8. Disclaimer</h3>
            <p>The service is provided "as is". No warranty is guaranteed.</p>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-900 mb-1">9. Limitation of Liability</h3>
            <p>The project owner is not responsible for any loss caused by using the tool.</p>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-900 mb-1">10. Changes to Terms</h3>
            <p>Terms may be updated at any time. Continued use means acceptance of updated terms.</p>
          </div>
          
          <div>
            <h3 className="font-bold text-gray-900 mb-1">11. Contact</h3>
            <p>For questions regarding these terms, please contact:<br />
            <a href="mailto:spinwheelai@spinwheelai.online" className="text-violet-600 hover:underline">spinwheelai@spinwheelai.online</a></p>
          </div>
        </div>
      )
    }
  };

  const { title, icon, body } = content[type] || content.about;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative z-10 bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-fade-in mx-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white rounded-xl shadow-sm border border-gray-100">
              {icon}
            </div>
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white border border-gray-200 hover:bg-gray-100 flex items-center justify-center transition-colors text-gray-500 shadow-sm"
          >
            <X size={16} />
          </button>
        </div>
        
        <div className="p-6 max-h-[65vh] overflow-y-auto">
          {body}
        </div>
        
        <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
          <button onClick={onClose} className="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
