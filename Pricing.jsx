'use client';
import { Check } from 'lucide-react';
import { COLORS } from '@/lib/colors';

const PLANS = [
  { name: 'Free', price: '$0', features: ['A few scans a month', 'Full risk breakdown', 'Category grading'] },
  { name: '5-Day Trial', price: 'Free', features: ['Everything in Pro', 'Activate whenever', 'No card required'], highlight: true },
  { name: 'Pro', price: '$6/mo', features: ['Unlimited scans', 'Better alternatives', 'Deletion requests'] },
];

export default function Pricing() {
  return (
    <div className="max-w-2xl mx-auto w-full px-5 py-10">
      <h2 className="text-2xl mb-6 text-center font-serif" style={{ fontWeight: 400, color: COLORS.ink }}>Pricing</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {PLANS.map((p) => (
          <div
            key={p.name}
            className="rounded-2xl p-5"
            style={{ background: p.highlight ? COLORS.ink : COLORS.surface, border: p.highlight ? `1.5px solid ${COLORS.lime}` : 'none' }}
          >
            <p className="text-sm font-semibold mb-1" style={{ color: p.highlight ? COLORS.lime : COLORS.ink }}>{p.name}</p>
            <p className="text-2xl mb-3 font-serif" style={{ fontWeight: 400, color: p.highlight ? '#FFFFFF' : COLORS.ink }}>{p.price}</p>
            <ul className="space-y-1.5">
              {p.features.map((f) => (
                <li key={f} className="text-xs flex items-start gap-1.5" style={{ color: p.highlight ? '#D8D5C8' : COLORS.inkSoft }}>
                  <Check size={13} className="shrink-0 mt-0.5" color={p.highlight ? COLORS.lime : COLORS.ink} />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
