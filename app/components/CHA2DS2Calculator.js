'use client';
import { useState } from 'react';

const CRITERIA = [
  { key: 'chf',         label: 'Congestive Heart Failure / LV dysfunction', points: 1 },
  { key: 'hypertension',label: 'Hypertension', points: 1 },
  { key: 'age75',       label: 'Age ≥ 75 years', points: 2 },
  { key: 'diabetes',    label: 'Diabetes Mellitus', points: 1 },
  { key: 'stroke',      label: 'Prior Stroke / TIA / Thromboembolism', points: 2 },
  { key: 'vascular',    label: 'Vascular disease (MI, PVD, aortic plaque)', points: 1 },
  { key: 'age65',       label: 'Age 65–74 years', points: 1 },
  { key: 'female',      label: 'Female sex', points: 1 },
];

function getRisk(score, isFemale) {
  const adjusted = isFemale ? score - 1 : score;
  if (adjusted === 0) return { label: 'Very Low', color: 'score-low', rec: 'No anticoagulation. NICE Rec 1.6.7.', action: 'Reassess if new risk factors develop (Rec 1.6.15).' };
  if (adjusted === 1) return { label: 'Low–Moderate', color: 'score-mid', rec: 'Consider DOAC for men (Rec 1.6.4). Not recommended for women if sex is the only factor.', action: 'Discuss risks/benefits. Review annually.' };
  return { label: 'High', color: 'score-high', rec: 'Offer DOAC (apixaban, dabigatran, edoxaban or rivaroxaban) — NICE Rec 1.6.3.', action: 'Do not withhold due to age or fall risk (Rec 1.6.8).' };
}

export default function CHA2DS2Calculator() {
  const [vals, setVals] = useState({});

  const toggle = (key) => setVals(v => ({ ...v, [key]: !v[key] }));
  const score = CRITERIA.reduce((s, c) => s + (vals[c.key] ? c.points : 0), 0);
  const risk = getRisk(score, vals['female']);

  return (
    <div className="bg-slate-900 rounded-xl p-6 card-glow">
      <div className="flex items-center gap-3 mb-6">
        <span className="w-8 h-8 rounded-full bg-crimson-500 flex items-center justify-center text-sm font-bold">C</span>
        <div>
          <h3 className="font-display text-xl text-white">CHA₂DS₂-VASc Score</h3>
          <p className="text-slate-400 text-sm">Stroke risk stratification — NICE Rec 1.2.1</p>
        </div>
      </div>

      <div className="space-y-2 mb-6">
        {CRITERIA.map(c => (
          <button
            key={c.key}
            onClick={() => toggle(c.key)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border text-sm transition-all ${
              vals[c.key]
                ? 'border-crimson-500 bg-crimson-500/10 text-white'
                : 'border-slate-700 bg-slate-800/50 text-slate-300 hover:border-slate-500'
            }`}
          >
            <span>{c.label}</span>
            <span className={`font-mono font-bold ${vals[c.key] ? 'text-crimson-400' : 'text-slate-500'}`}>
              +{c.points}
            </span>
          </button>
        ))}
      </div>

      <div className="border border-slate-700 rounded-xl p-5 bg-slate-950/50">
        <div className="flex items-center justify-between mb-3">
          <span className="text-slate-400 text-sm uppercase tracking-wider">Total Score</span>
          <span className={`font-display text-5xl font-bold ${risk.color}`}>{score}</span>
        </div>
        <div className={`text-lg font-semibold mb-2 ${risk.color}`}>{risk.label} Risk</div>
        <p className="text-slate-300 text-sm mb-2"><span className="text-slate-400">Recommendation: </span>{risk.rec}</p>
        <p className="text-slate-400 text-xs">{risk.action}</p>
      </div>
    </div>
  );
}
