'use client';
import { Camera, Copy, FileSearch, Check, Flag, ArrowRightLeft } from 'lucide-react';
import { COLORS } from '@/lib/colors';
import DiagramNode from './DiagramNode';

const LINE = { fill: 'none', stroke: COLORS.inkSoft, strokeWidth: 1.5, opacity: 0.35 };

export default function WorkflowDiagram() {
  return (
    <div className="relative w-full" style={{ aspectRatio: '340 / 220' }}>
      <svg viewBox="0 0 340 220" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        <path d="M76,53 C108,53 108,110 132,110" {...LINE} />
        <path d="M76,167 C108,167 108,110 132,110" {...LINE} />
        <path d="M224,110 C245,110 245,34 264,34" fill="none" stroke={COLORS.lime} strokeWidth="1.5" opacity="0.7" />
        <path d="M224,110 C245,110 245,110 264,110" fill="none" stroke={COLORS.red} strokeWidth="1.5" opacity="0.7" />
        <path d="M224,110 C245,110 245,186 264,186" fill="none" stroke={COLORS.amber} strokeWidth="1.5" opacity="0.7" />

        <circle cx="76" cy="53" r="2.5" fill={COLORS.inkSoft} opacity="0.5" />
        <circle cx="76" cy="167" r="2.5" fill={COLORS.inkSoft} opacity="0.5" />
        <circle cx="132" cy="110" r="2.5" fill={COLORS.inkSoft} opacity="0.5" />
        <circle cx="264" cy="34" r="2.5" fill={COLORS.lime} />
        <circle cx="264" cy="110" r="2.5" fill={COLORS.red} />
        <circle cx="264" cy="186" r="2.5" fill={COLORS.amber} />

        <g className="fp-flow-dots">
          <circle r="2.5" fill={COLORS.ink}><animateMotion dur="2.2s" repeatCount="indefinite" path="M76,53 C108,53 108,110 132,110" /></circle>
          <circle r="2.5" fill={COLORS.ink}><animateMotion dur="2.2s" begin="0.5s" repeatCount="indefinite" path="M76,167 C108,167 108,110 132,110" /></circle>
          <circle r="2.5" fill={COLORS.lime}><animateMotion dur="1.1s" begin="1.3s" repeatCount="indefinite" path="M224,110 C245,110 245,34 264,34" /></circle>
          <circle r="2.5" fill={COLORS.red}><animateMotion dur="1.1s" begin="1.6s" repeatCount="indefinite" path="M224,110 C245,110 245,110 264,110" /></circle>
          <circle r="2.5" fill={COLORS.amber}><animateMotion dur="1.1s" begin="1.9s" repeatCount="indefinite" path="M224,110 C245,110 245,186 264,186" /></circle>
        </g>
      </svg>

      <DiagramNode left={0} top={3.6} width={22.4} height={40.9} icon={<Camera size={18} color={COLORS.ink} />} label="Screenshot" sub="tap: +" />
      <DiagramNode left={0} top={55.5} width={22.4} height={40.9} icon={<Copy size={18} color={COLORS.ink} />} label="Paste text" sub="⌘: V" />
      <DiagramNode left={38.8} top={29.5} width={27.1} height={40.9} icon={<FileSearch size={22} color={COLORS.ink} />} label="Scan Engine" sub="Gemini / Groq" boxBg={COLORS.lime} boxBorder={COLORS.lime} size={56} />
      <DiagramNode left={77.6} top={2.7} width={22.4} height={25.5} icon={<Check size={15} color={COLORS.lime} />} label="Clean" sub="= pass" boxBorder={COLORS.lime} />
      <DiagramNode left={77.6} top={37.3} width={22.4} height={25.5} icon={<Flag size={15} color={COLORS.red} />} label="Risk Flagging" sub="clauses found" boxBorder={COLORS.red} />
      <DiagramNode left={77.6} top={71.8} width={22.4} height={25.5} icon={<ArrowRightLeft size={15} color={COLORS.amber} />} label="Alternative" sub="safer pick" boxBorder={COLORS.amber} />
    </div>
  );
}
