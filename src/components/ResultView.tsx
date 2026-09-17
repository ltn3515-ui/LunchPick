import { useState } from 'react';
import type { MenuItem } from '../data/menus';
import { CATEGORY_META } from '../data/menus';

interface ResultViewProps {
  menu: MenuItem;
  saved: boolean;
  onReroll: () => void;
  onSave: () => void;
  onShare: () => void;
  onBack: () => void;
}

export function ResultView({ menu, saved, onReroll, onSave, onShare, onBack }: ResultViewProps) {
  const meta = CATEGORY_META[menu.category];
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <main className="screen screen-result">
      <button type="button" className="back-link" onClick={onBack}>
        ← 처음으로
      </button>

      <div className="result-card" style={{ background: meta.accentSoft }}>
        {!imageFailed ? (
          <img
            className="result-photo"
            src={menu.image}
            alt={menu.name}
            onError={() => setImageFailed(true)}
          />
        ) : (
          <span className="result-emoji" aria-hidden="true">
            {meta.emoji}
          </span>
        )}
        <p className="result-category" style={{ color: meta.accent }}>
          {menu.category}
        </p>
        <p className="result-name">{menu.name}</p>
      </div>

      <div className="result-actions">
        <button type="button" className="secondary-button" onClick={onReroll}>
          🔄 다시 뽑기
        </button>
        <button type="button" className="secondary-button" onClick={onShare}>
          📤 공유하기
        </button>
      </div>

      <button type="button" className="pick-button pick-button-save" onClick={onSave} disabled={saved}>
        {saved ? '✅ 저장됐어요' : '저장하기'}
      </button>
    </main>
  );
}
