'use client';
import { useState, useRef, useEffect } from 'react';

const QUICK_PROMPTS = [
  'Patient: 72F, HTN, DM2, paroxysmal AF. What anticoagulation?',
  'AF + CKD stage 4. Which DOAC and what dose adjustment?',
  'New-onset AF 36 hours, haemodynamically stable. Rate or rhythm control?',
  'Patient on warfarin, TTR 58% over 6 months. What next?',
  'Post-CABG day 2, new AF. Prevention and management?',
  'When can I stop anticoagulation after AF ablation?',
  'CHA2DS2-VASc 1 (male). Does this patient need anticoagulation?',
];

export default function AIAdvisor() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function send(text) {
    const userMsg = text || input.trim();
    if (!userMsg) return;
    setInput('');

    const newMessages = [...messages, { role: 'user', content: userMsg }];
    setMessages(newMessages);
    setLoading(true);

    // Add placeholder assistant message
    setMessages(m => [...m, { role: 'assistant', content: '', streaming: true }]);

    try {
      const res = await fetch('/api/af-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) {
        let errorMsg = `Server error (${res.status})`;
        try {
          const errBody = await res.json();
          if (errBody.error) errorMsg = errBody.error;
        } catch {
          // response was not JSON, use default message
        }
        throw new Error(errorMsg);
      }

      if (!res.body) {
        throw new Error('Response body is empty.');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let full = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        full += decoder.decode(value, { stream: true });
        setMessages(m => {
          const copy = [...m];
          copy[copy.length - 1] = { role: 'assistant', content: full, streaming: true };
          return copy;
        });
      }

      setMessages(m => {
        const copy = [...m];
        copy[copy.length - 1] = { role: 'assistant', content: full, streaming: false };
        return copy;
      });
    } catch (e) {
      setMessages(m => {
        const copy = [...m];
        copy[copy.length - 1] = { role: 'assistant', content: 'Error: ' + e.message, streaming: false };
        return copy;
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-slate-900 rounded-xl card-glow flex flex-col h-[640px]">
      {/* Header */}
      <div className="p-5 border-b border-slate-800 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-crimson-500 to-crimson-700 flex items-center justify-center">
          <span className="text-sm font-bold">AI</span>
        </div>
        <div>
          <h3 className="font-display text-lg text-white leading-tight">AF Expert Advisor</h3>
          <p className="text-slate-400 text-xs">NICE NG196 · Powered by Claude</p>
        </div>
        <span className="ml-auto flex items-center gap-1.5 text-xs text-green-400">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-slow"></span>Online
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div>
            <p className="text-slate-500 text-sm text-center py-4">Ask a clinical question or choose a scenario:</p>
            <div className="grid grid-cols-1 gap-2">
              {QUICK_PROMPTS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => send(q)}
                  className="text-left text-xs text-slate-300 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-slate-500 rounded-lg px-3 py-2.5 transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs font-bold mt-0.5 ${
              m.role === 'user' ? 'bg-slate-700 text-slate-300' : 'bg-crimson-600 text-white'
            }`}>
              {m.role === 'user' ? 'DR' : 'AI'}
            </div>
            <div className={`max-w-[85%] rounded-xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
              m.role === 'user'
                ? 'bg-slate-700 text-white'
                : `bg-slate-800 text-slate-200 border border-slate-700 ${m.streaming ? 'cursor-blink' : ''}`
            }`}>
              {m.content || (m.streaming ? '' : '…')}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-800">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder="Describe clinical scenario or ask a question…"
            rows={2}
            className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 resize-none focus:outline-none focus:border-crimson-500 transition-colors"
          />
          <button
            onClick={() => send()}
            disabled={loading || !input.trim()}
            className="px-4 py-3 bg-crimson-500 hover:bg-crimson-600 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl text-sm font-medium text-white transition-all"
          >
            {loading ? '…' : '▶'}
          </button>
        </div>
        <p className="text-slate-600 text-xs mt-2 text-center">For clinical decision support only. Always apply clinical judgement.</p>
      </div>
    </div>
  );
}
