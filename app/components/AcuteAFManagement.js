'use client';
import { useState } from 'react';

export default function AcuteAFManagement() {
  const [step, setStep] = useState(null);

  const reset = () => setStep(null);

  return (
    <div className="bg-slate-900 rounded-xl p-6 card-glow">
      <h3 className="font-display text-xl text-white mb-2">Acute AF Management</h3>
      <p className="text-slate-400 text-sm mb-5">NICE Section 1.8 — Emergency & New-Onset Pathway</p>

      {!step && (
        <div className="space-y-3">
          <p className="text-sm text-slate-300 mb-4">Select clinical presentation:</p>

          <button
            onClick={() => setStep('emergency')}
            className="w-full p-4 rounded-xl border border-red-700 bg-red-950/30 text-left hover:border-red-500 transition-all"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-red-700 flex items-center justify-center text-xs font-bold animate-pulse">!</span>
              <div>
                <div className="text-white font-semibold text-sm">Life-threatening haemodynamic instability</div>
                <div className="text-red-400 text-xs">New-onset AF with shock, severe hypotension, acute pulmonary oedema</div>
              </div>
            </div>
          </button>

          <button
            onClick={() => setStep('stable-lt48')}
            className="w-full p-4 rounded-xl border border-amber-700 bg-amber-950/20 text-left hover:border-amber-500 transition-all"
          >
            <div className="text-white font-semibold text-sm">Stable — Onset &lt; 48 hours</div>
            <div className="text-amber-400 text-xs mt-1">Haemodynamically stable, onset confirmed &lt;48 hrs</div>
          </button>

          <button
            onClick={() => setStep('stable-gt48')}
            className="w-full p-4 rounded-xl border border-slate-600 bg-slate-800/40 text-left hover:border-slate-400 transition-all"
          >
            <div className="text-white font-semibold text-sm">Stable — Onset &gt; 48 hours or uncertain</div>
            <div className="text-slate-400 text-xs mt-1">Including AF of uncertain duration</div>
          </button>

          <button
            onClick={() => setStep('hf')}
            className="w-full p-4 rounded-xl border border-blue-700 bg-blue-950/20 text-left hover:border-blue-500 transition-all"
          >
            <div className="text-white font-semibold text-sm">Acute AF with suspected decompensated heart failure</div>
            <div className="text-blue-400 text-xs mt-1">Signs of acute HF decompensation</div>
          </button>
        </div>
      )}

      {step === 'emergency' && (
        <div className="section-enter">
          <div className="mb-4 p-3 bg-red-900/30 border border-red-700 rounded-lg">
            <p className="text-red-300 font-bold text-sm">🚨 EMERGENCY — Rec 1.8.1</p>
          </div>
          <div className="space-y-3">
            <div className="bg-slate-800/60 rounded-lg p-4 border-l-4 border-red-500">
              <p className="text-white text-sm font-semibold">Immediate DC cardioversion</p>
              <p className="text-slate-300 text-xs mt-1">Do NOT delay for anticoagulation. Emergency electrical cardioversion without prior anticoagulation is indicated.</p>
            </div>
            <div className="bg-slate-800/60 rounded-lg p-4 border-l-4 border-amber-500">
              <p className="text-white text-sm font-semibold">Post-cardioversion anticoagulation</p>
              <p className="text-slate-300 text-xs mt-1">Start heparin immediately after. Assess stroke risk (CHA₂DS₂-VASc) and initiate appropriate long-term anticoagulation per Recs 1.8.8–1.8.10.</p>
            </div>
          </div>
          <button onClick={reset} className="mt-4 text-xs text-slate-400 hover:text-white">← Back</button>
        </div>
      )}

      {step === 'stable-lt48' && (
        <div className="section-enter">
          <div className="mb-4 p-3 bg-amber-900/20 border border-amber-700/50 rounded-lg">
            <p className="text-amber-300 text-sm font-semibold">Onset &lt; 48 hours — Rec 1.8.2</p>
          </div>
          <div className="space-y-3">
            <div className="bg-slate-800/60 rounded-lg p-4">
              <p className="text-white text-sm font-semibold mb-2">Strategy: Rate OR Rhythm Control</p>
              <p className="text-slate-300 text-xs">Both acceptable. Use clinical judgement based on patient preference, symptoms, comorbidities.</p>
            </div>
            <div className="bg-slate-800/60 rounded-lg p-4">
              <p className="text-white text-sm font-semibold mb-2">Pharmacological cardioversion (if rhythm control chosen) — Rec 1.8.5</p>
              <div className="space-y-2 text-xs">
                <div className="flex gap-2">
                  <span className="text-green-400 shrink-0">No structural/ischaemic HD:</span>
                  <span className="text-slate-300">Flecainide OR amiodarone</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-amber-400 shrink-0">Structural heart disease:</span>
                  <span className="text-slate-300">Amiodarone only</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-red-400 shrink-0">Do NOT use:</span>
                  <span className="text-slate-300">Magnesium or calcium-channel blockers for cardioversion (Rec 1.8.7)</span>
                </div>
              </div>
            </div>
            <div className="bg-slate-800/60 rounded-lg p-4">
              <p className="text-white text-sm font-semibold mb-1">Anticoagulation — Rec 1.8.8–9</p>
              <p className="text-xs text-slate-300">Start heparin if no contraindication. Offer oral anticoagulation if: sinus rhythm not restored within 48 hrs, high recurrence risk, or per CHA₂DS₂-VASc/stroke risk assessment.</p>
            </div>
          </div>
          <button onClick={reset} className="mt-4 text-xs text-slate-400 hover:text-white">← Back</button>
        </div>
      )}

      {step === 'stable-gt48' && (
        <div className="section-enter">
          <div className="mb-4 p-3 bg-slate-800 border border-slate-600 rounded-lg">
            <p className="text-slate-200 text-sm font-semibold">Onset &gt;48 hrs or uncertain — Rec 1.8.2 & 1.8.6</p>
          </div>
          <div className="space-y-3">
            <div className="bg-slate-800/60 rounded-lg p-4 border-l-4 border-slate-500">
              <p className="text-white text-sm font-semibold">Offer Rate Control</p>
              <p className="text-slate-300 text-xs mt-1">Rate control is the preferred strategy for onset &gt;48 hrs or uncertain duration.</p>
            </div>
            <div className="bg-slate-800/60 rounded-lg p-4 border-l-4 border-blue-500">
              <p className="text-white text-sm font-semibold">Elective cardioversion if planned</p>
              <p className="text-slate-300 text-xs mt-1">Delay until <span className="text-blue-300">minimum 3 weeks of therapeutic anticoagulation</span>. During this period, maintain rate control. TOE-guided cardioversion is an option if experienced team available or if minimising pre-cardioversion anticoagulation period is needed (Rec 1.7.18).</p>
            </div>
            <div className="bg-slate-800/60 rounded-lg p-4 border-l-4 border-amber-500">
              <p className="text-white text-sm font-semibold">Anticoagulation — Rec 1.8.8 & 1.8.10</p>
              <p className="text-slate-300 text-xs mt-1">Start heparin immediately if no contraindication. Manage anticoagulation as for persistent AF — per stroke risk assessment.</p>
            </div>
          </div>
          <button onClick={reset} className="mt-4 text-xs text-slate-400 hover:text-white">← Back</button>
        </div>
      )}

      {step === 'hf' && (
        <div className="section-enter">
          <div className="mb-4 p-3 bg-blue-900/20 border border-blue-700/50 rounded-lg">
            <p className="text-blue-300 text-sm font-semibold">AF + Suspected Acute Decompensated Heart Failure — Rec 1.8.3</p>
          </div>
          <div className="space-y-3">
            <div className="bg-red-950/30 rounded-lg p-4 border border-red-800/40">
              <p className="text-red-400 font-semibold text-sm">⛔ DO NOT use calcium-channel blockers</p>
              <p className="text-slate-300 text-xs mt-1">CCBs (diltiazem, verapamil) are contraindicated in decompensated HF. They worsen cardiac output.</p>
            </div>
            <div className="bg-amber-950/20 rounded-lg p-4 border border-amber-800/40">
              <p className="text-amber-300 font-semibold text-sm">⚠ Seek senior specialist input before using beta-blockers</p>
              <p className="text-slate-300 text-xs mt-1">Beta-blockers may be harmful in acute decompensation. Senior cardiology / ITU review required.</p>
            </div>
            <div className="bg-slate-800/60 rounded-lg p-4">
              <p className="text-white text-sm font-semibold">Rate control options</p>
              <p className="text-slate-300 text-xs mt-1">Digoxin is generally safer in acute decompensated HF for rate control. Amiodarone IV may be considered for rhythm control in haemodynamically compromised patients with structural heart disease.</p>
            </div>
          </div>
          <button onClick={reset} className="mt-4 text-xs text-slate-400 hover:text-white">← Back</button>
        </div>
      )}
    </div>
  );
}
