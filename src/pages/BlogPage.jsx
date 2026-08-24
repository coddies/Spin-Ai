import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Clock, Calendar, ChevronRight } from 'lucide-react';

/**
 * Blog Index Page — /blog
 * Lists all blog posts in a card grid
 */

const posts = [
  {
    slug: 'how-to-build-ai-wheel-spinner',
    title: 'How to Build an AI-Powered Wheel Spinner App (Complete 2026 Guide)',
    excerpt: 'Learn how to build a stunning AI-powered spinning wheel from scratch using React, Vite, and the Groq API. Complete code examples included.',
    readTime: '8 min read',
    date: 'August 2026',
    category: 'AI Tutorials',
    emoji: '🎡',
    categoryColor: 'bg-violet-100 text-violet-700',
  },
  {
    slug: 'how-to-make-your-first-ai-app',
    title: "How to Make Your First AI App: Beginner's Guide",
    excerpt: "Never built an AI app before? This step-by-step beginner's guide will take you from zero to a working AI-powered application, no ML degree required.",
    readTime: '6 min read',
    date: 'August 2026',
    category: 'Guides',
    emoji: '🤖',
    categoryColor: 'bg-green-100 text-green-700',
  },
  {
    slug: 'generative-ai-vs-traditional-ai',
    title: "Generative AI vs Traditional AI: What's the Difference?",
    excerpt: "ChatGPT, Midjourney, or classic machine learning? Understand the key differences between generative AI and traditional AI with real-world examples.",
    readTime: '5 min read',
    date: 'August 2026',
    category: 'AI Tutorials',
    emoji: '⚡',
    categoryColor: 'bg-violet-100 text-violet-700',
  },
  {
    slug: 'building-ai-apps-with-fastapi',
    title: 'Building AI Apps with FastAPI: Complete Backend Guide',
    excerpt: 'FastAPI is the go-to framework for building fast, production-ready AI backends in Python. Learn how to build, deploy, and scale your AI API.',
    readTime: '7 min read',
    date: 'August 2026',
    category: 'Development',
    emoji: '🚀',
    categoryColor: 'bg-blue-100 text-blue-700',
  },
  {
    slug: 'ai-video-generation-case-study',
    title: 'AI Video Generation: How I Built Faceless AI Studio',
    excerpt: 'A behind-the-scenes look at how I built an AI video generation tool using AWS Bedrock, won an AWS Hackathon, and what I learned along the way.',
    readTime: '6 min read',
    date: 'August 2026',
    category: 'Development',
    emoji: '🎬',
    categoryColor: 'bg-blue-100 text-blue-700',
  },
];

const BlogPage = () => {
  useEffect(() => {
    document.title = 'Blog - SpinWheel AI | AI Tutorials, Guides & Development Tips';
    let meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'Read the SpinWheel AI blog for tutorials on building AI apps, guides for beginners, generative AI explainers, and developer case studies.');
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-pink-50 font-poppins">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-100 px-4 py-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-violet-600 transition-colors font-medium text-sm">
            <ArrowLeft size={16} />
            Back to SpinWheel AI
          </Link>
          <span className="text-gray-300">|</span>
          <div className="flex items-center gap-2">
            <span className="text-xl">🎡</span>
            <span className="font-black bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent text-sm">SpinWheel AI</span>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-3">
          <div className="p-3 bg-violet-100 rounded-2xl">
            <BookOpen className="text-violet-600" size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-900">Blog & Resources</h1>
            <p className="text-gray-500 text-sm mt-1">AI tutorials, development guides, and product stories</p>
          </div>
        </div>
        <p className="text-gray-500 text-sm mb-10">
          {posts.length} articles · Updated August 2026
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md hover:border-violet-200 transition-all overflow-hidden flex flex-col"
            >
              {/* Card Header Color Band */}
              <div className="h-2 bg-gradient-to-r from-violet-500 to-pink-500" />
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${post.categoryColor}`}>
                    {post.category}
                  </span>
                  <span className="text-2xl">{post.emoji}</span>
                </div>
                <h2 className="text-base font-bold text-gray-900 mb-2 group-hover:text-violet-700 transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 flex-1 leading-relaxed mb-4">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1"><Clock size={12} />{post.readTime}</span>
                    <span className="flex items-center gap-1"><Calendar size={12} />{post.date}</span>
                  </div>
                  <span className="text-violet-600 font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-6 px-4 mt-8 text-center">
        <p className="text-xs text-gray-400">
          © 2026 SpinWheel AI. |{' '}
          <Link to="/" className="hover:text-violet-600 transition-colors">Home</Link>{' | '}
          <Link to="/privacy-policy" className="hover:text-violet-600 transition-colors">Privacy Policy</Link>{' | '}
          <Link to="/contact" className="hover:text-violet-600 transition-colors">Contact</Link>
        </p>
      </footer>
    </div>
  );
};

export default BlogPage;
