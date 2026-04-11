'use client';
import { useState } from 'react';

const RATE_DRUGS = [
  {
    name: 'Beta-blocker',
    examples: 'Bisoprolol, Metoprolol, Atenolol',
    use: 'First-line monotherapy (Rec 1.7.2)',
    caution: 'Avoid in severe asthma/COPD. Use with caution in decompensated HF.',
    hf: true,
  },
  {
    name: 'Diltiazem / Verapamil',
    examples: 'Rate-limiting CCB',
    use: 'First-line alternative (Rec 1.7.2) — off-label diltiazem',
    caution: 'CONTRAINDICATED in HFrEF. Do not combine with beta-blocker.',
    hf: false,
  },
  {
    name: 'Digoxin',
    examples: 'Digoxin 125–250 mcg daily',
    use: 'Monotherapy if non-paroxysmal AF + sedentary lifestyle (Rec 1.7.4)',
    caution: 'Narrow therapeutic index. Check renal function. Not for paroxysmal AF.',
    hf: true,
  },
  {
    name: 'Amiodarone',
    examples: '—',
    use: 'DO NOT use for long-term rate control (Rec 1.7.6)',
    caution: 'Prohibited for rate control. Only acceptable for rhythm control.',
    hf: false,
    prohibited: true,
  },
];

const RHYTHM_DRUGS = [
  { name: 'Beta-blocker', note: 'First-line for rhythm control (Rec 1.7.10)', ok: 'Most patients', avoid: 'Contraindications' },
  { name: 'Flecainide / Propafenone', note: 'Class 1c — Rec 1.7.9', ok: 'No structural/ischaemic HD — "pill-in-the-pocket" eligible', avoid: 'Known ischaemic or structural heart disease' },
  { name: 'Dronedarone', note: 'Second-line after cardioversion (TA197, Rec 1.7.12)', ok: 'Post-cardioversion, structurally normal heart', avoid: 'Permanent AF, HF, severe liver disease' },
  { name: 'Amiodarone', note: 'Rec 1.7.13', ok: 'LV impairment or heart failure', avoid: 'Thyroid, liver, pulmonary toxicity risk — use with caution' },
];

export default function RateRhythmTool() {
  const [mode, setMode] = useState('rate');
  const [hasHF, setHasHF] = useState(false);

  return (
    <div className="bg-slate-900 rounded-xl p-6 card-glow">
      <h3 className="font-display text-xl text-white mb-2">Rate vs Rhythm Control</h3>
      <p className="text-slate-400 text-sm mb-5">Non-acute setting — NICE Section 1.7</p>

      {/* Mode selector */}
      <div className="flex gap-2 mb-5">
        {['rate', 'rhythm', 'ablation'].map(m => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
              mode === m
                ? 'bg-crimson-500 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {m === 'ablation' ? 'Ablation' : `${m.charAt(0).toUpperCase() + m.slice(1)} Control`}
          </button>
        ))}
      </div>

      {mode === 'rate' && (
        <div>
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => setHasHF(!hasHF)}
              className={`px-3 py-1.5 rounded-full text-xs border transition-all ${
                hasHF ? 'border-amber-500 bg-amber-500/10 text-amber-300' : 'border-slate-600 text-slate-400'
              }`}
            >
              {hasHF ? '✓' : '○'} Heart Failure Present
            </button>
            {hasHF && <span className="text-xs text-amber-400">CCBs contraindicated — see Rec 1.7.3</span>}
          </div>

          <div className="space-y-3">
            {RATE_DRUGS.map(d => (
              <div
                key={d.name}
                className={`rounded-lg p-4 border transition-all ${
                  d.prohibited
                    ? 'border-red-800/50 bg-red-950/20 opacity-70'
                    : hasHF && !d.hf
                    ? 'border-slate-700/30 bg-slate-800/20 opacity-40'
                    : 'border-slate-700 bg-slate-800/40'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium text-sm">{d.name}</span>
                      {d.prohibited && <span className="text-xs bg-red-900/50 text-red-400 px-2 py-0.5 rounded">PROHIBITED</span>}
                      {hasHF && !d.hf && !d.prohibited && <span className="text-xs bg-slate-700 text-slate-400 px-2 py-0.5 rounded">AVOID IN HF</span>}
                    </div>
                    <p className="text-slate-400 text-xs mt-0.5">{d.examples}</p>
                    <p className="text-blue-300 text-xs mt-1">{d.use}</p>
                    <p className="text-amber-400 text-xs mt-0.5">⚠ {d.caution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-slate-800/50 rounded-lg">
            <p className="text-xs text-slate-400"><span className="text-white">Combination therapy (Rec 1.7.5):</span> If monotherapy fails — combine any 2 of: beta-blocker + diltiazem + digoxin</p>
          </div>
        </div>
      )}

      {mode === 'rhythm' && (
        <div>
          <div className="mb-4 p-3 bg-slate-800/50 rounded-lg">
            <p className="text-xs text-slate-300"><span className="text-crimson-400 font-medium">Indication (Rec 1.7.7):</span> Symptoms persist despite rate control, or rate control unsuccessful</p>
          </div>

          <div className="space-y-3 mb-4">
            {RHYTHM_DRUGS.map(d => (
              <div key={d.name} className="border border-slate-700 rounded-lg p-4 bg-slate-800/40">
                <div className="font-medium text-white text-sm mb-1">{d.name}</div>
                <p className="text-xs text-slate-400 mb-2">{d.note}</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-green-950/30 border border-green-800/30 rounded p-2">
                    <span className="text-green-400 font-medium block mb-0.5">Use in:</span>
                    <span className="text-slate-300">{d.ok}</span>
                  </div>
                  <div className="bg-red-950/30 border border-red-800/30 rounded p-2">
                    <span className="text-red-400 font-medium block mb-0.5">Avoid in:</span>
                    <span className="text-slate-300">{d.avoid}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-blue-950/30 border border-blue-800/30 rounded-lg">
            <p className="text-xs text-blue-300"><span className="font-medium">Cardioversion note (Rec 1.7.16):</span> AF {'>'} 48 hrs → electrical preferred. Consider amiodarone 4 wks pre + 12 months post-cardioversion (Rec 1.7.17).</p>
          </div>

          <div className="mt-3 p-3 bg-slate-800/50 rounded-lg">
            <p className="text-xs text-white font-medium mb-1">Pill-in-the-pocket (Rec 1.7.14–15)</p>
            <p className="text-xs text-slate-300">Suitable if: No LV dysfunction / valvular / ischaemic HD + infrequent symptomatic paroxysms + SBP {'>'} 100 + HR {'>'} 70 bpm + patient understands usage</p>
          </div>
        </div>
      )}

      {mode === 'ablation' && (
        <div className="space-y-4">
          <div className="border border-slate-700 rounded-lg p-4 bg-slate-800/40">
            <h4 className="text-white font-medium text-sm mb-2">Left Atrial Catheter Ablation (Rec 1.7.19)</h4>
            <p className="text-xs text-slate-300 mb-2">Indicated when drug treatment unsuccessful, unsuitable or not tolerated in <span className="text-crimson-400">symptomatic paroxysmal or persistent AF</span></p>
            <div className="grid grid-cols-2 gap-2 text-xs mt-3">
              <div className="bg-slate-700/50 rounded p-2">
                <span className="text-slate-400 block">First choice:</span>
                <span className="text-white">Radiofrequency point-by-point ablation</span>
              </div>
              <div className="bg-slate-700/50 rounded p-2">
                <span className="text-slate-400 block">If RF unsuitable:</span>
                <span className="text-white">Cryoballoon or laser balloon ablation</span>
              </div>
            </div>
          </div>

          <div className="border border-amber-800/30 rounded-lg p-4 bg-amber-950/20">
            <p className="text-xs text-amber-300"><span className="font-medium">Counsel patient (Rec 1.7.20):</span> Not always effective. Symptom resolution may not be long-lasting. Discuss risks/benefits.</p>
          </div>

          <div className="border border-slate-700 rounded-lg p-4 bg-slate-800/40">
            <h4 className="text-white font-medium text-sm mb-2">Post-Ablation (Rec 1.7.22–23)</h4>
            <ul className="text-xs text-slate-300 space-y-1">
              <li>› Antiarrhythmic drugs for 3 months post-ablation</li>
              <li>› Reassess need for antiarrhythmics at 3 months</li>
              <li>› Do NOT stop anticoagulation unless AF no longer detectable AND risk profile reviewed (Rec 1.11.1)</li>
            </ul>
          </div>

          <div className="border border-slate-700 rounded-lg p-4 bg-slate-800/40">
            <h4 className="text-white font-medium text-sm mb-2">AV Node Ablation + Pacing (Rec 1.7.24)</h4>
            <p className="text-xs text-slate-300">Consider for permanent AF with symptoms or LV dysfunction from high ventricular rates. Try left atrial ablation first in paroxysmal AF or HF from non-permanent AF (Rec 1.7.26).</p>
          </div>
        </div>
      )}
    </div>
  );
}
