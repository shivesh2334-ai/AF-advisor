'use client';
import { useState } from 'react';

const CRITERIA = [
  { key: 'anaemia',   label: 'Older age (≥74 years)', points: 1 },
  { key: 'renal',     label: 'Renal impairment (GFR <60 mL/min/1.73m²)', points: 1 },
  { key: 'bleeding',  label: 'Prior bleeding history (GI bleed, intracranial haemorrhage)', points: 2 },
  { key: 'iron',      label: 'Iron deficiency anaemia (Hb <130 g/L men, <120 g/L women)', points: 2 },
  { key: 'antiplate', label: 'Antiplatelet use (aspirin/clopidogrel/NSAID)', points: 1 },
];

function getRisk(score) {
  if (score <= 2) return { label: 'Low Bleeding Risk', color: 'score-low', rate: '~2.4 bleeds/100 pt-yrs', rec: 'Proceed with anticoagulation. Benefit likely outweighs risk.' };
  if (score <= 4) return { label: 'Moderate Bleeding Risk', color: 'score-mid', rate: '~4.7 bleeds/100 pt-yrs', rec: 'Proceed with caution. Address modifiable risk factors (Rec 1.2.3). Regular monitoring.' };
  return { label: 'High Bleeding Risk', color: 'score-high', rate: '~8.1 bleeds/100 pt-yrs', rec: 'Careful shared decision-making required. Consider LAAO if anticoagulation not tolerated (Rec 1.6.18). Modify all reversible factors.' };
}

const MODIFIABLE = [
  'Uncontrolled hypertension → optimise BP (Rec 1.2.3)',
  'Poor INR control on VKA → consider switching to DOAC (Rec 1.6.6)',
  'Concurrent antiplatelets/NSAIDs/SSRIs → review necessity',
  'Harmful alcohol consumption → screen & refer (NICE NG50)',
  'Reversible anaemia causes → investigate & treat',
];

export default function ORBITCalculator() {
  const [vals, setVals] = useState({});
  const toggle = (key) => setVals(v => ({ ...v, [key]: !v[key] }));
  const score = CRITERIA.reduce((s, c) => s + (vals[c.key] ? c.points : 0), 0);
  const risk = getRisk(score);

  return (
    <div className="bg-slate-900 rounded-xl p-6 card-glow">
      <div className="flex items-center gap-3 mb-6">
        <span className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center text-sm font-bold">O</span>
        <div>
          <h3 className="font-display text-xl text-white">ORBIT Bleeding Score</h3>
          <p className="text-slate-400 text-sm">Bleeding risk stratification — NICE Rec 1.2.2</p>
        </div>
      </div>

      <div className="space-y-2 mb-6">
        {CRITERIA.map(c => (
          <button
            key={c.key}
            onClick={() => toggle(c.key)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border text-sm transition-all ${
              vals[c.key]
                ? 'border-amber-500 bg-amber-500/10 text-white'
                : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-500'
            }`}
          >
            <span>{c.label}</span>
            <span className={`font-mono font-bold ${vals[c.key] ? 'text-amber-400' : 'text-slate-500'}`}>
              +{c.points}
            </span>
          </button>
        ))}
      </div>

      <div className="border border-slate-700 rounded-xl p-5 bg-slate-950/50 mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-slate-400 text-sm uppercase tracking-wider">ORBIT Score</span>
          <span className={`font-display text-5xl font-bold ${risk.color}`}>{score}</span>
        </div>
        <div className={`text-lg font-semibold mb-1 ${risk.color}`}>{risk.label}</div>
        <div className="text-xs text-slate-400 mb-2">Event rate: {risk.rate}</div>
        <p className="text-slate-300 text-sm">{risk.rec}</p>
      </div>

      <div className="bg-slate-800/50 rounded-lg p-4">
        <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Modifiable Risk Factors (Rec 1.2.3)</p>
        <ul className="space-y-1">
          {MODIFIABLE.map((m, i) => (
            <li key={i} className="text-xs text-slate-300 flex gap-2">
              <span className="text-amber-500 mt-0.5">›</span>{m}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
