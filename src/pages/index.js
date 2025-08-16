import { useState } from "react";
import Head from "next/head";

export default function Home() {
  const [transcript, setTranscript] = useState("");
  const [instruction, setInstruction] = useState("");
  const [summary, setSummary] = useState("");
  const [recipients, setRecipients] = useState("");
  const [subject, setSubject] = useState("Meeting Summary");
  const [msg, setMsg] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [activeTab, setActiveTab] = useState("transcript");

  async function generateSummary() {
    if (!transcript.trim()) {
      setMsg("❌ Please enter a transcript first");
      return;
    }
    
    setIsGenerating(true);
    setMsg("🤖 AI is analyzing your transcript...");
    
    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript, instruction }),
      });
      const data = await res.json();
      
      if (data.error) {
        setMsg(`❌ ${data.error}`);
      } else {
        setSummary(data.summary || "");
        setMsg("✨ Summary generated successfully!");
        setActiveTab("summary");
      }
    } catch (error) {
      setMsg("❌ Failed to generate summary");
    } finally {
      setIsGenerating(false);
    }
  }

  async function sendEmail() {
    if (!recipients.trim() || !summary.trim()) {
      setMsg("❌ Please provide recipients and summary");
      return;
    }
    
    setIsSending(true);
    setMsg("📧 Sending email...");
    
    try {
      const res = await fetch("/api/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipients, subject, summary }),
      });
      const data = await res.json();
      
      if (data.ok) {
        setMsg("✅ Email sent successfully!");
        setRecipients("");
        setSubject("Meeting Summary");
      } else {
        setMsg(`❌ ${data.error || "Failed to send email"}`);
      }
    } catch (error) {
      setMsg("❌ Error sending email");
    } finally {
      setIsSending(false);
    }
  }

  const clearAll = () => {
    setTranscript("");
    setInstruction("");
    setSummary("");
    setRecipients("");
    setSubject("Meeting Summary");
    setMsg("");
    setActiveTab("transcript");
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setMsg("📋 Copied to clipboard!");
    setTimeout(() => setMsg(""), 2000);
  };

  return (
    <>
      <Head>
        <title>Meeting Summarizer - AI Meeting Summarizer</title>
        <meta name="description" content="Transform meeting transcripts into structured notes with AI-powered intelligence" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Navigation Bar */}
        <nav className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl font-bold">M</span>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                    Meeting Summarizer
                  </h1>
                  <p className="text-xs text-gray-500 -mt-1">AI Summarizer</p>
                </div>
              </div>

              {/* Navigation Links */}
              <div className="hidden md:flex items-center space-x-8">
                <a href="#features" className="text-gray-700 hover:text-orange-600 transition-colors duration-200 font-medium">
                  Features
                </a>
              
                <a href="#contact" className="text-gray-700 hover:text-orange-600 transition-colors duration-200 font-medium">
                  Contact
                </a>
              </div>

              {/* Action Button */}
              <div className="flex items-center space-x-4">
                
                <button className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-4 py-2 rounded-lg font-medium hover:from-orange-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Start Summarizing
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="bg-gradient-to-r from-orange-50 to-red-50 py-16 border-b border-orange-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Transform Your
                <span className="block bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                  Meeting Notes
                </span>
                with AI Intelligence
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Instantly convert meeting transcripts into structured, actionable summaries. 
                Powered by advanced AI to capture key insights, action items, and decisions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => document.getElementById('transcript-section').scrollIntoView({ behavior: 'smooth' })}
                  className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  🚀 Start Summarizing
                </button>
              
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Progress Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-center space-x-4 mb-8">
              {[
                { id: "transcript", label: "1. Transcript", icon: "📝" },
                { id: "summary", label: "2. AI Summary", icon: "🤖" },
                { id: "share", label: "3. Share", icon: "📤" }
              ].map((step) => (
                <div key={step.id} className="flex items-center space-x-2">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-300 ${
                    activeTab === step.id 
                      ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg' 
                      : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step.icon}
                  </div>
                  <span className={`hidden sm:block font-medium ${
                    activeTab === step.id ? 'text-orange-600' : 'text-gray-500'
                  }`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Left Column - Input */}
            <div className="space-y-6">
              {/* Transcript Input */}
              <div id="transcript-section" className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <span className="text-white text-2xl">📝</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Meeting Transcript</h2>
                    <p className="text-gray-600 text-sm">Paste your meeting content here</p>
                  </div>
                </div>
                <textarea
                  placeholder="Paste your meeting transcript here...\n\nExample: Meeting started at 10:00 AM. John discussed Q1 sales results showing 15% growth. Sarah mentioned the new product launch timeline..."
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                  rows={10}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200 text-gray-800 placeholder-gray-400"
                />
                <div className="mt-3 flex justify-between items-center text-sm text-gray-500">
                  <span>{transcript.length} characters</span>
                  <span className="text-blue-600 font-medium">AI will analyze this content</span>
                </div>
              </div>

              {/* Custom Instructions */}
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <span className="text-white text-2xl">⚡</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Custom Instructions</h2>
                    <p className="text-gray-600 text-sm">Guide the AI on what to focus on</p>
                  </div>
                </div>
                <input
                  placeholder="e.g., Focus on action items, key decisions, deadlines, and next steps. Include budget implications and resource requirements."
                  value={instruction}
                  onChange={(e) => setInstruction(e.target.value)}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-400"
                />
                <div className="mt-3 text-sm text-gray-500">
                  <span className="text-green-600 font-medium">💡 Leave empty for default summary format</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={generateSummary}
                  disabled={isGenerating || !transcript.trim()}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <span className="text-2xl">🤖</span>
                      <span>Generate AI Summary</span>
                    </>
                  )}
                </button>
                
                <button
                  onClick={clearAll}
                  className="px-8 py-4 border-2 border-gray-300 text-gray-600 rounded-xl hover:bg-gray-50 transition-all duration-200 flex items-center justify-center space-x-2 font-medium"
                >
                  <span>🗑️</span>
                  <span>Clear All</span>
                </button>
              </div>
            </div>

            {/* Right Column - Output */}
            <div className="space-y-6">
              {/* Summary Output */}
              <div id="summary-section" className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                      <span className="text-white text-2xl">🤖</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">AI Summary</h2>
                      <p className="text-gray-600 text-sm">Your intelligent meeting summary</p>
                    </div>
                  </div>
                  {summary && (
                    <button
                      onClick={() => copyToClipboard(summary)}
                      className="p-2 text-gray-500 hover:text-purple-600 transition-colors duration-200"
                      title="Copy to clipboard"
                    >
                      📋
                    </button>
                  )}
                </div>
                <textarea
                  placeholder="Your AI-generated summary will appear here...\n\nThe AI will structure your meeting content into:\n• Key Points & Decisions\n• Action Items & Deadlines\n• Next Steps\n• Important Notes"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  rows={10}
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all duration-200 text-gray-800 placeholder-gray-400"
                />
                {summary && (
                  <div className="mt-3 flex justify-between items-center text-sm text-gray-500">
                    <span>{summary.length} characters</span>
                    <span className="text-purple-600 font-medium">✨ AI-generated content</span>
                  </div>
                )}
              </div>

              {/* Email Sharing */}
              <div id="share-section" className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
                    <span className="text-white text-2xl">📤</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">Share via Email</h2>
                    <p className="text-gray-600 text-sm">Send summary to your team</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Recipients</label>
                    <input
                      placeholder="john@company.com, sarah@company.com"
                      value={recipients}
                      onChange={(e) => setRecipients(e.target.value)}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <input
                      placeholder="Meeting Summary - Q1 Review"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 text-gray-800 placeholder-gray-400"
                    />
                  </div>
                  
                  <button
                    onClick={sendEmail}
                    disabled={isSending || !recipients.trim() || !summary.trim()}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:from-emerald-600 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    {isSending ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span className="text-2xl">📤</span>
                        <span>Send Email Summary</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Status Message */}
          {msg && (
            <div className="mt-12 text-center">
              <div className={`inline-flex items-center space-x-3 px-8 py-4 rounded-full shadow-lg ${
                msg.includes('✅') ? 'bg-green-100 text-green-800 border border-green-200' :
                msg.includes('❌') ? 'bg-red-100 text-red-800 border border-red-200' :
                msg.includes('✨') ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                msg.includes('📋') ? 'bg-purple-100 text-purple-800 border border-purple-200' :
                'bg-gray-100 text-gray-800 border border-gray-200'
              }`}>
                <span className="text-xl">{msg}</span>
              </div>
            </div>
          )}

          {/* Features Section */}
          <div id="features" className="mt-24">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose MangoDesk?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experience the future of meeting documentation with our AI-powered platform
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-3xl">🧠</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">AI-Powered Intelligence</h3>
                <p className="text-gray-600 leading-relaxed">
                  Advanced language models understand context, extract key insights, and create structured summaries that capture the essence of your meetings.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-3xl">⚡</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Lightning Fast</h3>
                <p className="text-gray-600 leading-relaxed">
                  Generate comprehensive summaries in seconds, not minutes. Get your meeting notes ready while the meeting is still fresh in everyone&apos;s mind.
                </p>
              </div>
              
              <div className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 text-center group">
                <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-3xl">🔒</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Secure & Private</h3>
                <p className="text-gray-600 leading-relaxed">
                  Your meeting content is processed securely with enterprise-grade encryption. Your data privacy is our top priority.
                </p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-24 bg-gradient-to-r from-orange-50 to-red-50 rounded-3xl p-12 border border-orange-100">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-orange-600 mb-2">10K+</div>
                <div className="text-gray-600">Meetings Summarized</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-600 mb-2">99.9%</div>
                <div className="text-gray-600">Accuracy Rate</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-600 mb-2">5min</div>
                <div className="text-gray-600">Average Time Saved</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
                <div className="text-gray-600">AI Availability</div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer id="contact" className="bg-gray-900 text-white mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-xl flex items-center justify-center">
                    <span className="text-white text-xl font-bold">M</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">MangoDesk</h3>
                    <p className="text-gray-400">AI-Powered Meeting Summarizer</p>
                  </div>
                </div>
                <p className="text-gray-400 mb-6 max-w-md">
                  Transform your meeting productivity with intelligent AI summarization. 
                  Capture key insights, action items, and decisions automatically.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                    <span className="sr-only">Twitter</span>
                    
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                    <span className="sr-only">LinkedIn</span>
                    
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                    <span className="sr-only">GitHub</span>
                    
                  </a>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Product</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors duration-200">Features</a></li>
                  <li><a href="#" className="hover:text-white transition-colors duration-200">Pricing</a></li>
                  <li><a href="#" className="hover:text-white transition-colors duration-200">API</a></li>
                  <li><a href="#" className="hover:text-white transition-colors duration-200">Integrations</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors duration-200">About</a></li>
                  <li><a href="#" className="hover:text-white transition-colors duration-200">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition-colors duration-200">Careers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors duration-200">Contact</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
              <p>&copy; Built with ❤️ by Md Salik Inam. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
