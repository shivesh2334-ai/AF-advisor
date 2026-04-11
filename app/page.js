'use client';
import { useState } from 'react';
import CHA2DS2Calculator from './components/CHA2DS2Calculator';
import ORBITCalculator from './components/ORBITCalculator';
import RateRhythmTool from './components/RateRhythmTool';
import AcuteAFManagement from './components/AcuteAFManagement';
import AIAdvisor from './components/AIAdvisor';
import GuidelinesReference from './components/GuidelinesReference';

const TABS = [
  { id: 'advisor',    label: 'AI Advisor',      icon: '🤖' },
  { id: 'stroke',     label: 'Stroke Risk',      icon: '🧠' },
  { id: 'bleeding',   label: 'Bleeding Risk',    icon: '🩸' },
  { id: 'raterythm',  label: 'Rate / Rhythm',    icon: '💊' },
  { id: 'acute',      label: 'Acute AF',         icon: '⚡' },
  { id: 'guidelines', label: 'NICE Reference',   icon: '📋' },
];

export default function Home() {
  const [tab, setTab] = useState('advisor');

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero / Header */}
      <header className="relative border-b border-slate-800 overflow-hidden">
        <div className="absolute inset-0 ecg-bg opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 to-slate-950/90" />

        <div className="relative max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-crimson-500 animate-pulse-slow" />
                <span className="text-crimson-400 text-xs font-mono uppercase tracking-widest">Clinical Decision Support</span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl text-white leading-tight">
                AF Expert
              </h1>
              <p className="text-slate-400 mt-1 text-sm max-w-xl">
                Atrial Fibrillation Management · NICE NG196 · AI-powered cardiology advisor
              </p>
            </div>
            <div className="hidden md:flex flex-col items-end gap-1">
              <span className="text-xs text-slate-500">Guideline</span>
              <span className="font-mono text-crimson-400 font-bold text-lg">NG196</span>
              <span className="text-xs text-slate-600">Updated 2021</span>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex gap-4 mt-6 flex-wrap">
            {[
              { label: 'Guideline Sections', val: '11' },
              { label: 'Recommendations', val: '47+' },
              { label: 'Anticoagulants Covered', val: '5' },
              { label: 'Risk Tools', val: '2' },
            ].map(s => (
              <div key={s.label} className="bg-slate-900/80 border border-slate-800 rounded-lg px-4 py-2">
                <div className="font-display text-xl text-crimson-400">{s.val}</div>
                <div className="text-slate-500 text-xs">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="sticky top-0 z-30 bg-slate-950/95 backdrop-blur border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex overflow-x-auto gap-1 py-2 scrollbar-hide">
            {TABS.map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
                  tab === t.id
                    ? 'bg-crimson-500/20 text-white border border-crimson-500/40'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <span>{t.icon}</span>
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {tab === 'advisor' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <AIAdvisor />
            </div>
            <div className="space-y-4">
              <div className="bg-slate-900 rounded-xl p-5 card-glow">
                <h4 className="text-white font-semibold text-sm mb-3">Quick Reference</h4>
                <div className="space-y-2 text-xs">
                  {[
                    ['CHA₂DS₂-VASc ≥2', 'Offer DOAC (Rec 1.6.3)'],
                    ['CHA₂DS₂-VASc 1 (M)', 'Consider DOAC (Rec 1.6.4)'],
                    ['TTR <65%', 'Reassess anticoagulation (Rec 1.6.11)'],
                    ['Onset <48h', 'Rate or rhythm control (Rec 1.8.2)'],
                    ['Onset >48h', 'Rate control + 3wk OAC pre-DCCV'],
                    ['HF + AF', 'No CCBs (Rec 1.7.3 & 1.8.3)'],
                    ['Structural HD + rhythm Rx', 'Amiodarone only (Rec 1.7.13)'],
                    ['Post-ablation', 'Antiarrhythmic 3 months (Rec 1.7.22)'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-2 py-1.5 border-b border-slate-800">
                      <span className="text-crimson-400 font-medium">{k}</span>
                      <span className="text-slate-300 text-right">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900 rounded-xl p-5 card-glow">
                <h4 className="text-white font-semibold text-sm mb-3">DOAC Options (Rec 1.6.9)</h4>
                <div className="space-y-1.5 text-xs">
                  {[
                    { drug: 'Apixaban', ta: 'TA275' },
                    { drug: 'Dabigatran', ta: 'TA249' },
                    { drug: 'Edoxaban', ta: 'TA355' },
                    { drug: 'Rivaroxaban', ta: 'TA256' },
                  ].map(d => (
                    <div key={d.drug} className="flex justify-between py-1 border-b border-slate-800">
                      <span className="text-white">{d.drug}</span>
                      <span className="font-mono text-slate-500">{d.ta}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-3">Use in line with individual NICE TA criteria. Check renal function and dose adjustments.</p>
              </div>

              <div className="bg-red-950/20 border border-red-800/30 rounded-xl p-5">
                <h4 className="text-red-400 font-semibold text-sm mb-2">⚠ Key Prohibitions</h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  <li>✗ Aspirin monotherapy for stroke prevention</li>
                  <li>✗ Amiodarone for long-term rate control</li>
                  <li>✗ Class 1c drugs in ischaemic/structural HD</li>
                  <li>✗ CCBs in HFrEF or decompensated HF</li>
                  <li>✗ Stop OAC solely because AF no longer detected</li>
                  <li>✗ LAAO as alternative to OAC if OAC tolerated</li>
                  <li>✗ Routine TTE solely for stroke risk if OAC agreed</li>
                  <li>✗ Statins started de novo to prevent post-op AF</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {tab === 'stroke' && (
          <div className="max-w-2xl">
            <CHA2DS2Calculator />
          </div>
        )}

        {tab === 'bleeding' && (
          <div className="max-w-2xl">
            <ORBITCalculator />
          </div>
        )}

        {tab === 'raterythm' && (
          <div className="max-w-2xl">
            <RateRhythmTool />
          </div>
        )}

        {tab === 'acute' && (
          <div className="max-w-2xl">
            <AcuteAFManagement />
          </div>
        )}

        {tab === 'guidelines' && (
          <div className="max-w-2xl">
            <GuidelinesReference />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 mt-12 py-6">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-slate-600 text-xs">
            AF Expert · Clinical decision support based on NICE NG196 · Not a substitute for clinical judgement · Always refer to full guidelines
          </p>
          <p className="text-slate-700 text-xs mt-1">EasyMyCare / EMC Digitals · Built with Next.js + Claude API</p>
        </div>
      </footer>
    </div>
  );
}
