'use client';
import { useState } from 'react';
import { MAX_CHARS, DETECT_MIN_CHARS } from '@/lib/constants';

export default function useScanEngine() {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('');
  const [detecting, setDetecting] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [rawResponse, setRawResponse] = useState(null);
  const [engineUsed, setEngineUsed] = useState(null);

  const detect = async (payload) => {
    if (detecting) return;
    setDetecting(true);
    try {
      const res = await fetch('/api/detect', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await res.json();
      if (data.label) setCategory(data.label);
    } catch {
      // silent — non-critical
    } finally {
      setDetecting(false);
    }
  };

  const detectFromText = (pasted) => {
    if (pasted.trim().length >= DETECT_MIN_CHARS) detect({ text: pasted });
  };
  const detectFromImage = (img) => detect({ image: img });

  const clearAll = () => {
    setText('');
    setImage(null);
    setCategory('');
  };

  const scan = async () => {
    const trimmed = text.trim();
    if (!trimmed && !image) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setRawResponse(null);

    try {
      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: trimmed.slice(0, MAX_CHARS), image, category }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong. Try again.');
        setRawResponse(data.raw || null);
        return;
      }
      setResult(data.result);
      setEngineUsed(data.engine);
      clearAll();
    } catch (err) {
      setError(err.message || 'Network error. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return {
    text, setText, category, setCategory, detecting, detectFromText, detectFromImage,
    image, setImage, loading, result, error, rawResponse, engineUsed, scan, clearAll,
  };
}
