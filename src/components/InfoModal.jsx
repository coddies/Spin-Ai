import React from 'react';
import { X, User, Heart, Shield, Mail } from 'lucide-react';

const InfoModal = ({ type, onClose }) => {
  const content = {
    about: {
      title: 'About SpinAI',
      icon: <User className="text-violet-500" size={24} />,
      body: (
        <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
          <p>
            SpinAI was built by <strong className="text-gray-900">Muhammad Burhan</strong>, a developer passionate about making everyday decisions fun and effortless.
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
        <ul className="space-y-3 text-gray-600 text-sm leading-relaxed list-disc pl-4 marker:text-gray-300">
          <li>We do not collect or store any personal information.</li>
          <li>Daily spin limits are stored locally in your browser (localStorage) and never sent to our servers.</li>
          <li>We use Google AdSense which may use cookies for personalized ads. See Google Privacy Policy for details.</li>
          <li>We use Groq API for AI generation — your prompts are sent to Groq servers for processing only.</li>
          <li>We do not sell any data to third parties.</li>
          <li className="pt-2 list-none -ml-4 font-medium text-gray-900">
            For questions contact: <a href="mailto:youremail@gmail.com" className="text-violet-600 hover:underline">youremail@gmail.com</a>
          </li>
        </ul>
      )
    },
    contact: {
      title: 'Contact Us',
      icon: <Mail className="text-orange-500" size={24} />,
      body: (
        <div className="flex flex-col gap-4 text-gray-600 text-sm">
          <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 flex flex-col gap-1 items-center text-center">
            <span className="text-xs font-bold text-orange-600 uppercase tracking-wide">Email</span>
            <a href="mailto:youremail@gmail.com" className="text-base font-medium text-gray-900 hover:text-orange-600 transition-colors">
              youremail@gmail.com
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
    }
  };

  const { title, icon, body } = content[type] || content.about;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative z-10 bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-fade-in">
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
        
        <div className="p-6">
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
