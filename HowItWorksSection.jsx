'use client';
import { COLORS } from '@/lib/colors';
import WorkflowDiagram from '@/components/WorkflowDiagram';

export default function HowItWorksSection() {
  return (
    <div className="max-w-2xl mx-auto w-full px-5 py-10">
      <h2 className="text-2xl mb-6 text-center font-serif" style={{ fontWeight: 400, color: COLORS.ink }}>
        How it works
      </h2>
      <WorkflowDiagram />
    </div>
  );
}
