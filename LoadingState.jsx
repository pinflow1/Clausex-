'use client';
import { useEffect, useState } from 'react';
import { COLORS } from '@/lib/colors';
import { LOADING_MESSAGES } from '@/lib/constants';

export default function LoadingState() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % LOADING_MESSAGES.length), 900);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="fp-dot-pulse rounded-full mb-4" style={{ width: 10, height: 10, background: COLORS.lime }} />
      <p key={i} className="fp-msg-fade text-sm font-medium" style={{ color: COLORS.inkSoft }}>
        {LOADING_MESSAGES[i]}
      </p>
    </div>
  );
}
