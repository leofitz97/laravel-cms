import type { Theme } from '../types';

interface Props {
  themes: Theme[];
  value?: string | null;
  onChange: (key: string) => void;
}

export default function ThemeSelector({ themes, value, onChange }: Props) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">Theme</label>
      <div className="grid grid-cols-3 gap-3">
        {themes.map(t => (
          <button
            key={t.name}
            onClick={() => onChange(t.key)}
            className={`p-1 rounded border ${value === t.key ? 'ring-1 ring-offset-1 ring-indigo-400' : ''}`}
            title={t.name}
          >
            <div className="text-sm font-semibold">{t.key}</div>
            <div className="mt-2 flex gap-1">
              <span className="w-6 h-6 rounded" style={{ background: t.vars['--primary'] }} />
              <span className="w-6 h-6 rounded" style={{ background: t.vars['--accent'] }} />
              <span className="w-6 h-6 rounded" style={{ background: t.vars['--bg'] }} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
