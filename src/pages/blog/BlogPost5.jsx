import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';

const BlogPost5 = () => {
  useEffect(() => {
    document.title = 'AI Video Generation: How I Built Faceless AI Studio - SpinWheel AI Blog';
    let meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', 'A behind-the-scenes look at how I built an AI video generation tool using AWS Bedrock, won an AWS Hackathon, and what I learned about AI pipelines along the way.');
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
          AI Video Generation: How I Built Faceless AI Studio
        </h1>
        <div className="flex items-center gap-4 text-sm text-gray-400 mb-10 border-b border-gray-100 pb-6">
          <span className="flex items-center gap-1"><Clock size={14} /> 6 min read</span>
          <span className="flex items-center gap-1"><Calendar size={14} /> August 2026</span>
          <span>By Muhammad Burhan</span>
        </div>

        <article className="space-y-6 text-gray-700 leading-relaxed">
          <p className="text-lg font-medium text-gray-800">
            Imagine typing a topic and getting a fully produced video — with script, voiceover, visuals, and music — in minutes. That's the core idea behind <strong>Faceless AI Studio</strong>, an AI video generation tool I built for the AWS Hackathon. Here's the full story of how it was built, what worked, and what I learned.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">The AWS Hackathon Journey</h2>
          <p>
            The challenge was simple: build something impactful using AWS Bedrock within 48 hours. AWS Bedrock is Amazon's managed AI service that gives developers access to foundation models from leading AI companies — Anthropic, Meta, Amazon, Stability AI, and more — all through a unified API.
          </p>
          <p>
            My idea: build a "faceless video" creator. Faceless YouTube channels (channels that produce content without showing a face) have exploded in popularity, but the bottleneck is always content production. What if AI could automate the entire pipeline?
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">What is Faceless AI Studio?</h2>
          <p>Faceless AI Studio is an automated content pipeline that:</p>
          <ol className="list-decimal pl-6 space-y-2">
            <li>Takes a topic from the user (e.g., "Top 5 Historical Mysteries")</li>
            <li>Generates a video script using Claude 3 (via AWS Bedrock)</li>
            <li>Converts the script to voiceover using Amazon Polly (TTS)</li>
            <li>Generates scene images using Stable Diffusion (via Bedrock)</li>
            <li>Assembles everything into a full video with ffmpeg</li>
            <li>Returns a downloadable video file</li>
          </ol>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">AWS Bedrock Overview</h2>
          <p>
            AWS Bedrock is the backbone of this project. Here's why it was the right choice:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Multiple models under one API:</strong> Anthropic's Claude, Meta's Llama, Amazon Titan, and Stable Diffusion — all accessible with the same boto3 calls.</li>
            <li><strong>No infrastructure management:</strong> No GPU servers to manage. AWS handles scaling and availability.</li>
            <li><strong>Serverless integration:</strong> Works natively with Lambda, making it easy to build serverless AI pipelines.</li>
            <li><strong>IAM security:</strong> API keys are managed through AWS IAM, avoiding the exposure of third-party API keys.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">The Script Generation Pipeline</h2>
          <p>The first step is generating a structured video script using Claude 3 via AWS Bedrock:</p>
          <pre className="bg-gray-900 text-green-400 rounded-2xl p-5 overflow-x-auto text-sm">
            <code>{`import boto3
import json

bedrock = boto3.client('bedrock-runtime', region_name='us-east-1')

def generate_script(topic: str) -> dict:
    prompt = f"""Create a 60-second faceless YouTube video script about: {topic}
    
    Return JSON with this structure:
    {{
        "title": "Video title",
        "scenes": [
            {{
                "narration": "Text to speak",
                "visual_prompt": "Image generation prompt",
                "duration": 10
            }}
        ]
    }}"""
    
    response = bedrock.invoke_model(
        modelId='anthropic.claude-3-sonnet-20240229-v1:0',
        body=json.dumps({
            "anthropic_version": "bedrock-2023-05-31",
            "max_tokens": 2000,
            "messages": [{"role": "user", "content": prompt}]
        })
    )
    
    result = json.loads(response['body'].read())
    return json.loads(result['content'][0]['text'])`}</code>
          </pre>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">Voice Synthesis with Amazon Polly</h2>
          <pre className="bg-gray-900 text-green-400 rounded-2xl p-5 overflow-x-auto text-sm">
            <code>{`polly = boto3.client('polly', region_name='us-east-1')

def text_to_speech(text: str, output_path: str):
    response = polly.synthesize_speech(
        Text=text,
        OutputFormat='mp3',
        VoiceId='Matthew',  # Natural-sounding male voice
        Engine='neural'     # Neural TTS for best quality
    )
    
    with open(output_path, 'wb') as f:
        f.write(response['AudioStream'].read())`}</code>
          </pre>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">Scene Image Generation</h2>
          <pre className="bg-gray-900 text-green-400 rounded-2xl p-5 overflow-x-auto text-sm">
            <code>{`def generate_scene_image(visual_prompt: str, output_path: str):
    response = bedrock.invoke_model(
        modelId='stability.stable-diffusion-xl-v1',
        body=json.dumps({
            "text_prompts": [
                {"text": f"Cinematic, 4K, professional: {visual_prompt}"},
                {"text": "blurry, low quality, text, watermark", "weight": -1}
            ],
            "cfg_scale": 8,
            "steps": 30,
            "width": 1920,
            "height": 1080
        })
    )
    
    result = json.loads(response['body'].read())
    import base64
    image_data = base64.b64decode(result['artifacts'][0]['base64'])
    with open(output_path, 'wb') as f:
        f.write(image_data)`}</code>
          </pre>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">Video Assembly with ffmpeg</h2>
          <pre className="bg-gray-900 text-green-400 rounded-2xl p-5 overflow-x-auto text-sm">
            <code>{`import subprocess

def assemble_video(scenes: list, output_path: str):
    # Create video segments from images + audio
    inputs = []
    for i, scene in enumerate(scenes):
        # Duration from audio length
        subprocess.run([
            'ffmpeg', '-loop', '1', '-t', str(scene['duration']),
            '-i', scene['image'], '-i', scene['audio'],
            '-c:v', 'libx264', '-c:a', 'aac', '-shortest',
            f'segment_{i}.mp4'
        ])
        inputs.extend(['-i', f'segment_{i}.mp4'])
    
    # Concatenate all segments
    subprocess.run([
        'ffmpeg', *inputs,
        '-filter_complex', f'concat=n={len(scenes)}:v=1:a=1',
        output_path
    ])`}</code>
          </pre>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">Challenges Faced</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Cost management:</strong> Image generation with Stable Diffusion is expensive at scale. Added caching for similar prompts.</li>
            <li><strong>Processing time:</strong> Generating a 60-second video took 3-5 minutes. Added async processing with SQS queues.</li>
            <li><strong>Audio-video sync:</strong> Getting ffmpeg to precisely sync narration with scene images required careful duration calculation.</li>
            <li><strong>48-hour time pressure:</strong> Scope had to be cut. Dropped background music and subtitle generation for the hackathon demo.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">Lessons Learned</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>AI pipelines are all about glue code.</strong> The hard part isn't the AI — it's connecting all the pieces reliably.</li>
            <li><strong>Always plan for failure.</strong> Every AI call can fail. Build retry logic and graceful fallbacks from day one.</li>
            <li><strong>Start with the demo path.</strong> Get the happy path working first, then add error handling. Time is precious in hackathons.</li>
            <li><strong>AWS Bedrock is genuinely impressive.</strong> Having text, image, and embedding models under one unified API with IAM auth is a real competitive advantage.</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-8">What's Next</h2>
          <p>
            After the hackathon, I'm planning to release Faceless AI Studio as a full product with:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Multiple voice options and languages</li>
            <li>Background music generation using MusicGen</li>
            <li>Automatic subtitle/caption generation with Whisper</li>
            <li>Direct publishing to YouTube via the Data API</li>
          </ul>
          <p className="mt-4">
            Building Faceless AI Studio reinforced my belief that AI app development is about creative problem-solving, not deep ML expertise. The models are already there — your job is to wire them together in useful ways. That's exactly the same principle behind SpinWheel AI. 🎡
          </p>
        </article>

        <div className="mt-12 bg-gradient-to-br from-violet-50 to-pink-50 rounded-3xl p-6 border border-violet-100">
          <p className="font-bold text-gray-900 mb-2">Love AI apps? Try SpinWheel AI!</p>
          <p className="text-sm text-gray-600 mb-4">Another AI-powered tool built with the same "just wire the APIs together" philosophy.</p>
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

export default BlogPost5;
