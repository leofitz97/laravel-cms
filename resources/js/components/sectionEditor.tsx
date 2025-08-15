import { PageSection } from '@/types';
import React, { useEffect, useRef, useState } from 'react';

interface Props {
  section: PageSection;
  onChange: (html: string) => void;
}

const SectionEditor: React.FC<Props> = ({ section, onChange }) => {
  const [value, setValue] = useState<string>(section.content ?? '');
  const timer = useRef<number | null>(null);

  // debounce network calls
  useEffect(() => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => onChange(value), 350);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [value, onChange]);

  return (
    <div className="p-4">
      <label className="block text-sm font-medium text-slate-600 mb-1">
        HTML Content (sanitized on save)
      </label>
      <textarea
        className="w-full h-48 rounded-lg border p-3 font-mono text-sm"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="<section>...</section>"
      />
      <div className="mt-3">
        <span className="text-xs text-slate-500">
          Tip: You can paste safe HTML. Disallowed tags/attributes will be stripped by the server.
        </span>
      </div>
    </div>
  );
};

export default SectionEditor;
