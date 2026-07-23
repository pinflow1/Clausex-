'use client';
import { ShieldCheck, Flag, ArrowRightLeft, Mail } from 'lucide-react';
import { COLORS } from '@/lib/colors';

const FEATURES = [
  { icon: ShieldCheck, title: 'Risk grading', body: 'Every policy gets an A–F grade you understand in one glance.', pro: false },
  { icon: Flag, title: 'Flagged clauses', body: 'The exact clauses worth worrying about, explained in plain English.', pro: false },
  { icon: ArrowRightLeft, title: 'Better alternatives', body: 'See lower-risk competitors the moment we find a bad policy.', pro: true },
  { icon: Mail, title: 'Deletion requests', body: 'One click drafts the email to get your data deleted.', pro: true },
];

export default function Features() {
  return (
    <div className="max-w-2xl mx-auto w-full px-5 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {FEATURES.map((f) => (
          <div key={f.title} className="rounded-2xl p-5" style={{ background: COLORS.surface }}>
            <div className="flex items-center justify-between mb-3">
              <f.icon size={20} color={COLORS.ink} />
              {f.pro && (
                <span className="text-xs font-semibold rounded-full" style={{ background: COLORS.ink, color: COLORS.lime, padding: '1px 9px' }}>PRO</span>
              )}
            </div>
            <p className="text-sm font-semibold mb-1" style={{ color: COLORS.ink }}>{f.title}</p>
            <p className="text-xs leading-relaxed" style={{ color: COLORS.inkSoft }}>{f.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
