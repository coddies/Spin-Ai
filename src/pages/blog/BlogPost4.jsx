import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';

const BlogPost4 = () => {
  useEffect(() => {
    document.title = 'Building AI Apps with FastAPI: Complete Backend Guide - SpinWheel AI Blog';
    let meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'FastAPI is the fastest way to build AI backends in Python. This complete guide covers setup, REST APIs, auth, AI model integration, and deployment.');
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-pink-50 font-poppins">
      <nav className="bg-white border-b border-gray-100 px-4 py-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <Link to="/blog" className="flex items-center gap-2 text-gray-600 hover:text-violet-600 transition-colors font-medium text-sm">
            <ArrowLeft size={16} /> Blog
          </Link>
          <span className="text-gray-300">|</span>
          <Link to="/" className="flex items-center gap-2">
            <span className="text-lg">🎡</span>
            <span className="font-black bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent text-sm">SpinWheel AI</span>
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-3">
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-100 text-blue-700">Development</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4 leading-tight">
          Building AI Apps with FastAPI: Complete Backend Guide
        </h1>
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-10 border-b border-gray-100 pb-6">
          <span className="flex items-center gap-1"><Clock size={14} /> 7 min read</span>
          <span className="flex items-center gap-1"><Calendar size={14} /> August 2026</span>
          <span>By Muhammad Burhan</span>
        </div>

        <article className="space-y-6 text-gray-700 leading-relaxed">
          <p className="text-lg font-medium text-gray-800">
            When it comes to building AI app backends in Python, FastAPI has emerged as the clear winner. It's fast, modern, has automatic API documentation, and integrates beautifully with AI libraries. In this guide, you'll learn everything you need to build production-ready AI backends with FastAPI.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">Why FastAPI for AI Apps?</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Performance:</strong> FastAPI is one of the fastest Python frameworks, built on top of Starlette and Pydantic.</li>
            <li><strong>Async support:</strong> Native async/await means you can handle multiple AI API calls concurrently without blocking.</li>
            <li><strong>Automatic docs:</strong> Swagger UI is auto-generated — perfect for API testing during development.</li>
            <li><strong>Type safety:</strong> Pydantic models give you request/response validation out of the box.</li>
            <li><strong>Python ecosystem:</strong> Works seamlessly with scikit-learn, PyTorch, transformers, and any AI library.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">Installation and Setup</h2>
          <pre className="bg-gray-900 text-green-400 rounded-2xl p-5 overflow-x-auto text-sm">
            <code>{`# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\\Scripts\\activate

# Install FastAPI and dependencies
pip install fastapi uvicorn python-dotenv httpx groq

# Create project structure
mkdir ai-backend && cd ai-backend
touch main.py .env requirements.txt`}</code>
          </pre>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">Building Your First AI Endpoint</h2>
          <p>Let's create a FastAPI backend that proxies requests to the Groq AI API:</p>
          <pre className="bg-gray-900 text-green-400 rounded-2xl p-5 overflow-x-auto text-sm">
            <code>{`# main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="AI Wheel Spinner API", version="1.0.0")

# CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://spinwheelai.online"],
    allow_methods=["POST"],
    allow_headers=["*"],
)

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

class GenerateRequest(BaseModel):
    topic: str
    max_items: int = 8

class GenerateResponse(BaseModel):
    items: list[str]

@app.post("/api/generate", response_model=GenerateResponse)
async def generate_items(request: GenerateRequest):
    """Generate wheel items from a topic using Groq AI."""
    try:
        completion = client.chat.completions.create(
            model="openai/gpt-oss-20b",
            messages=[
                {
                    "role": "system",
                    "content": f"Return ONLY a JSON array of {request.max_items} short items. No explanation."
                },
                {"role": "user", "content": request.topic}
            ],
            temperature=0.8
        )
        
        import json
        content = completion.choices[0].message.content.strip()
        items = json.loads(content)
        return GenerateResponse(items=items)
        
    except Exception as e:
        raise HTTPException(status_code=502, detail="AI temporarily unavailable")

@app.get("/health")
async def health_check():
    return {"status": "ok"}`}</code>
          </pre>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">Running the Server</h2>
          <pre className="bg-gray-900 text-green-400 rounded-2xl p-5 overflow-x-auto text-sm">
            <code>{`# Development mode with auto-reload
uvicorn main:app --reload --port 8000

# Visit http://localhost:8000/docs for auto-generated Swagger UI
# Visit http://localhost:8000/redoc for ReDoc documentation`}</code>
          </pre>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">Adding Authentication with API Keys</h2>
          <p>Protect your AI endpoint from unauthorized access with API key authentication:</p>
          <pre className="bg-gray-900 text-green-400 rounded-2xl p-5 overflow-x-auto text-sm">
            <code>{`from fastapi import Security
from fastapi.security import APIKeyHeader

api_key_header = APIKeyHeader(name="X-API-Key", auto_error=False)

async def verify_api_key(api_key: str = Security(api_key_header)):
    if api_key != os.getenv("APP_API_KEY"):
        raise HTTPException(status_code=403, detail="Invalid API Key")
    return api_key

@app.post("/api/generate", response_model=GenerateResponse)
async def generate_items(
    request: GenerateRequest,
    _: str = Depends(verify_api_key)  # Require auth
):
    # ... rest of your endpoint`}</code>
          </pre>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">Rate Limiting</h2>
          <p>Add rate limiting to prevent API abuse:</p>
          <pre className="bg-gray-900 text-green-400 rounded-2xl p-5 overflow-x-auto text-sm">
            <code>{`pip install slowapi

from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter

@app.post("/api/generate")
@limiter.limit("10/day")  # 10 requests per day per IP
async def generate_items(request: Request, body: GenerateRequest):
    ...`}</code>
          </pre>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">Deploying to Production</h2>
          <p>FastAPI apps can be deployed on several platforms:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Railway:</strong> Simple Git-based deployment, free tier available</li>
            <li><strong>Fly.io:</strong> Great for containerized FastAPI apps</li>
            <li><strong>DigitalOcean App Platform:</strong> Easy, scalable, affordable</li>
            <li><strong>AWS/GCP:</strong> Full control, higher complexity, but infinitely scalable</li>
          </ul>

          <p>Sample Dockerfile for production:</p>
          <pre className="bg-gray-900 text-green-400 rounded-2xl p-5 overflow-x-auto text-sm">
            <code>{`FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]`}</code>
          </pre>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">Performance Tips</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Use <code className="bg-gray-100 px-1 rounded">async</code> functions wherever possible — especially for I/O-heavy operations like API calls</li>
            <li>Cache AI responses for identical requests using Redis or simple in-memory dicts</li>
            <li>Use connection pooling for database connections</li>
            <li>Add response compression with GZip middleware for large payloads</li>
            <li>Use Gunicorn + Uvicorn workers in production for multi-core support</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">Conclusion</h2>
          <p>
            FastAPI is the ideal framework for AI backends in Python. Its async support, auto-generated documentation, type safety, and performance make it the go-to choice for production AI APIs. Start with the simple example above, add authentication and rate limiting, and you'll have a robust, secure AI backend ready for thousands of users.
          </p>
        </article>

        <div className="mt-12 bg-gradient-to-br from-violet-50 to-pink-50 rounded-3xl p-6 border border-violet-100">
          <p className="font-bold text-gray-900 mb-2">Want to see the frontend that pairs with this backend?</p>
          <p className="text-sm text-gray-600 mb-4">SpinWheel AI is a real-world example of an AI app with a similar architecture.</p>
          <Link to="/" className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-pink-500 text-white font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity text-sm">
            🎡 Try SpinWheel AI Free
          </Link>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <Link to="/blog" className="flex items-center gap-2 text-violet-600 hover:underline font-medium text-sm">
            <ArrowLeft size={14} /> Back to all articles
          </Link>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-100 py-6 px-4 mt-8 text-center">
        <p className="text-xs text-gray-400">
          © 2026 SpinWheel AI. |{' '}
          <Link to="/" className="hover:text-violet-600">Home</Link>{' | '}
          <Link to="/blog" className="hover:text-violet-600">Blog</Link>
        </p>
      </footer>
    </div>
  );
};

export default BlogPost4;
