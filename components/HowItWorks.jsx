'use client';
import { COLORS } from '@/lib/colors';
import WorkflowDiagram from './WorkflowDiagram';

export default function HowItWorks() {
  return (
    <div className="mt-8">
      <p className="text-xs font-semibold mb-4" style={{ color: COLORS.inkSoft, letterSpacing: '0.06em' }}>
        HOW SCANNING WORKS
      </p>
      <WorkflowDiagram />
    </div>
  );
}
