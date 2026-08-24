import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage.jsx'
import TermsOfServicePage from './pages/TermsOfServicePage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import FAQPage from './pages/FAQPage.jsx'
import BlogPage from './pages/BlogPage.jsx'
import BlogPost1 from './pages/blog/BlogPost1.jsx'
import BlogPost2 from './pages/blog/BlogPost2.jsx'
import BlogPost3 from './pages/blog/BlogPost3.jsx'
import BlogPost4 from './pages/blog/BlogPost4.jsx'
import BlogPost5 from './pages/blog/BlogPost5.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-of-service" element={<TermsOfServicePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/how-to-build-ai-wheel-spinner" element={<BlogPost1 />} />
        <Route path="/blog/how-to-make-your-first-ai-app" element={<BlogPost2 />} />
        <Route path="/blog/generative-ai-vs-traditional-ai" element={<BlogPost3 />} />
        <Route path="/blog/building-ai-apps-with-fastapi" element={<BlogPost4 />} />
        <Route path="/blog/ai-video-generation-case-study" element={<BlogPost5 />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
