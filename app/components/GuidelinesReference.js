'use client';
import { useState } from 'react';

const SECTIONS = [
  {
    id: '1.1', title: 'Detection & Diagnosis',
    items: [
      'Manual pulse palpation if suspicion of AF: breathlessness, palpitations, syncope, chest discomfort, stroke/TIA (Rec 1.1.1)',
      '12-lead ECG to confirm AF if irregular pulse detected (Rec 1.1.2)',
      'Paroxysmal AF undetected on 12-lead ECG → 24h Holter if episodes <24h apart; ambulatory ECG/event recorder if >24h apart (Rec 1.1.3)',
    ]
  },
  {
    id: '1.2', title: 'Stroke & Bleeding Risk',
    items: [
      'CHA₂DS₂-VASc for stroke risk in all AF types including atrial flutter and post-ablation (Rec 1.2.1)',
      'ORBIT score for bleeding risk — higher accuracy than other tools (Rec 1.2.2)',
      'Modify bleeding risk factors: hypertension, poor INR control, concurrent antiplatelets/NSAIDs/SSRIs, alcohol, anaemia (Rec 1.2.3)',
      'Discuss results of risk assessments with patient in shared decision-making (Rec 1.2.4)',
    ]
  },
  {
    id: '1.3', title: 'Cardiac Function Assessment',
    items: [
      'TTE indicated: baseline for long-term management, planned cardioversion, suspected structural HD, or refining antithrombotic risk (Rec 1.3.1)',
      'Do not routinely perform TTE solely for stroke risk stratification if anticoagulation already decided (Rec 1.3.2)',
      'TOE if: TTE shows valvular HD, TTE technically poor, or TOE-guided cardioversion planned (Rec 1.3.3)',
    ]
  },
  {
    id: '1.6', title: 'Stroke Prevention',
    items: [
      'Offer DOAC if CHA₂DS₂-VASc ≥2 (Rec 1.6.3). Consider DOAC for men with score =1 (Rec 1.6.4)',
      'DOAC options: apixaban, dabigatran, edoxaban, rivaroxaban per relevant NICE TA guidance',
      'If DOACs contraindicated/not tolerated → offer VKA (Rec 1.6.5)',
      'No anticoagulation for: <65yrs with no risk factors other than sex (CHA₂DS₂-VASc 0 men / 1 women) (Rec 1.6.7)',
      'Do not withhold anticoagulation due to age or falls risk (Rec 1.6.8)',
      'Do not offer aspirin monotherapy for stroke prevention (Rec 1.6.14)',
      'TTR <65% or ≥2 INRs >5 or <1.5 → reassess anticoagulation (Rec 1.6.11)',
      'Consider LAAO only if anticoagulation contraindicated/not tolerated (Rec 1.6.18–19)',
    ]
  },
  {
    id: '1.7', title: 'Rate & Rhythm Control',
    items: [
      'Rate control first-line except: reversible cause, HF primarily from AF, new-onset AF, flutter for ablation, or rhythm preferred clinically (Rec 1.7.1)',
      'First-line rate control: beta-blocker or rate-limiting CCB (diltiazem/verapamil) — diltiazem is off-label (Rec 1.7.2)',
      'HF + AF: follow HF guideline for beta-blockers; DO NOT use CCBs (Rec 1.7.3)',
      'Digoxin monotherapy if sedentary or CCB/beta-blocker not tolerated — non-paroxysmal AF only (Rec 1.7.4)',
      'Combination rate control: any 2 of beta-blocker + diltiazem + digoxin if monotherapy fails (Rec 1.7.5)',
      'Amiodarone NOT for long-term rate control (Rec 1.7.6)',
      'Class 1c drugs (flecainide, propafenone) contraindicated in ischaemic/structural HD (Rec 1.7.9)',
      'Rhythm control first-line: beta-blocker. If beta-blocker fails → dronedarone (2nd line post-cardioversion) or amiodarone (LV impairment/HF) (Recs 1.7.10–13)',
    ]
  },
  {
    id: '1.8', title: 'Acute AF Management',
    items: [
      'Life-threatening haemodynamic instability → emergency DC cardioversion immediately without waiting for anticoagulation (Rec 1.8.1)',
      'Onset <48h and stable → rate or rhythm control (Rec 1.8.2)',
      'Onset >48h or uncertain → rate control; delay cardioversion until ≥3 weeks therapeutic anticoagulation (Recs 1.8.2, 1.8.6)',
      'Pharmacological cardioversion: flecainide/amiodarone (no structural HD) or amiodarone (structural HD) (Rec 1.8.5)',
      'Do not use magnesium or CCB for cardioversion (Rec 1.8.7)',
      'Suspected acute decompensated HF + AF: no CCBs; senior input before beta-blockers (Rec 1.8.3)',
    ]
  },
  {
    id: '1.10', title: 'Postoperative AF',
    items: [
      'Prevention post-cardiothoracic surgery: amiodarone, beta-blocker, or diltiazem/verapamil. No digoxin prophylaxis (Rec 1.10.1)',
      'Continue pre-existing beta-blocker unless contraindications develop (Rec 1.10.2)',
      'Do not START statins solely to prevent postoperative AF; continue existing statins (Recs 1.10.3–4)',
      'New postoperative AF after cardiothoracic surgery → rate or rhythm control strategy (Rec 1.10.5)',
      'If rhythm control chosen → reassess antiarrhythmic need at ~6 weeks (Rec 1.10.6)',
      'Post non-cardiothoracic surgery AF → manage as new-onset AF (Rec 1.10.7)',
    ]
  },
  {
    id: '1.11', title: 'Stopping Anticoagulation',
    items: [
      'Do NOT stop anticoagulation solely because AF is no longer detectable (Rec 1.11.1)',
      'Base stopping decisions on reassessment of CHA₂DS₂-VASc + ORBIT and patient preferences (Rec 1.11.2)',
    ]
  },
];

export default function GuidelinesReference() {
  const [open, setOpen] = useState(null);

  return (
    <div className="bg-slate-900 rounded-xl p-6 card-glow">
      <h3 className="font-display text-xl text-white mb-2">NICE AF Guidelines Reference</h3>
      <p className="text-slate-400 text-sm mb-5">NG196 — Quick-access by section</p>

      <div className="space-y-2">
        {SECTIONS.map(s => (
          <div key={s.id} className="border border-slate-700 rounded-lg overflow-hidden">
            <button
              onClick={() => setOpen(open === s.id ? null : s.id)}
              className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-crimson-400 w-8">{s.id}</span>
                <span className="text-white text-sm font-medium">{s.title}</span>
              </div>
              <span className={`text-slate-400 text-sm transition-transform ${open === s.id ? 'rotate-90' : ''}`}>›</span>
            </button>

            {open === s.id && (
              <div className="px-4 pb-4 pt-2 bg-slate-950/30 section-enter">
                <ul className="space-y-2">
                  {s.items.map((item, i) => (
                    <li key={i} className="flex gap-2 text-xs text-slate-300">
                      <span className="text-crimson-500 mt-0.5 shrink-0">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-slate-800/50 rounded-lg">
        <p className="text-xs text-slate-500">Source: NICE Guideline NG196 — Atrial fibrillation: diagnosis and management (2021 update). Always refer to full guideline for complete recommendations.</p>
      </div>
    </div>
  );
}
