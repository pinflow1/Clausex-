'use client';
import { useEffect, useRef } from 'react';
import { ArrowUp, Loader2, Plus, X } from 'lucide-react';
import { COLORS } from '@/lib/colors';
import { MAX_CHARS } from '@/lib/constants';
import ServiceTag from './ServiceTag';
import ImagePreview from './ImagePreview';

function fileToImageData(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || '');
      const comma = result.indexOf(',');
      const mediaType = (result.slice(0, comma).match(/data:(.*);base64/) || [])[1] || 'image/png';
      resolve({ base64: result.slice(comma + 1), mediaType, name: file.name });
    };
    reader.readAsDataURL(file);
  });
}

export default function InputArea({ engine }) {
  const { text, setText, category, setCategory, detecting, detectFromText, detectFromImage,
    image, setImage, loading, scan, clearAll } = engine;
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    if (!text) { el.style.height = '44px'; return; }
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 120) + 'px';
  }, [text]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && (e.metaKey || e.ctrlKey)) { e.preventDefault(); scan(); }
  };
  const handlePaste = () => setTimeout(() => detectFromText(textareaRef.current?.value || ''), 30);
  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const imageData = await fileToImageData(file);
    setImage(imageData);
    detectFromImage(imageData);
    e.target.value = '';
  };

  const isEmpty = !text.trim() && !image;
  const sendActive = !isEmpty;
  const charCount = text.length;
  const overLimit = charCount > MAX_CHARS;

  return (
    <div>
      <ServiceTag category={category} setCategory={setCategory} detecting={detecting} loading={loading} />
      <ImagePreview image={image} onRemove={() => setImage(null)} />

      <div className="flex items-end gap-2">
        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        <button onClick={() => fileInputRef.current?.click()} disabled={loading} className="fp-btn fp-focus shrink-0 rounded-full flex items-center justify-center"
          style={{ width: 40, height: 40, background: COLORS.surface, color: COLORS.ink, border: 'none' }} aria-label="Attach a screenshot">
          <Plus size={18} />
        </button>

        <div className={loading ? 'fp-scanning-glow relative flex-1 overflow-hidden rounded-3xl' : 'relative flex-1 overflow-hidden rounded-3xl'} style={{ background: COLORS.surface }}>
          <textarea ref={textareaRef} className="fp-input w-full resize-none rounded-3xl px-4 text-sm leading-relaxed block"
            style={{ minHeight: 44, maxHeight: 120, paddingTop: 11, paddingBottom: 11, paddingRight: 34, background: 'transparent', color: COLORS.ink, border: 'none' }}
            placeholder="Paste text or screenshot…" value={text} onChange={(e) => setText(e.target.value)} onKeyDown={handleKeyDown} onPaste={handlePaste} rows={1} />
          {(text || image) && !loading && (
            <button onClick={clearAll} className="fp-link absolute rounded-full flex items-center justify-center"
              style={{ top: 8, right: 8, width: 22, height: 22, background: COLORS.paper, color: COLORS.inkSoft, border: 'none' }} aria-label="Clear input">
              <X size={13} />
            </button>
          )}
          {loading && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
              <div className="fp-sweep-a absolute top-0 bottom-0" style={{ width: '20%', background: `linear-gradient(90deg, transparent, ${COLORS.lime}77, transparent)` }} />
            </div>
          )}
        </div>

        <button onClick={scan} disabled={loading || isEmpty} className="fp-btn fp-focus shrink-0 rounded-full flex items-center justify-center"
          style={{ width: 40, height: 40, background: sendActive ? COLORS.ink : COLORS.line, color: sendActive ? '#FFFFFF' : COLORS.inkSoft, border: 'none' }} aria-label="Scan document">
          {loading ? <Loader2 size={17} className="fp-spin" /> : <ArrowUp size={17} strokeWidth={2.5} />}
        </button>
      </div>

      <div className="flex items-center justify-end mt-2 px-1">
        <span className="text-xs" style={{ color: overLimit ? COLORS.orange : COLORS.inkSoft }}>
          {charCount.toLocaleString()}{overLimit ? ` / ${MAX_CHARS.toLocaleString()}` : ''} chars
        </span>
      </div>
    </div>
  );
}
