import type { HistoryEntry } from '../lib/history';
import { CATEGORY_META, type MenuCategory } from '../data/menus';

interface HistoryViewProps {
  entries: HistoryEntry[];
  onBack: () => void;
}

function formatTime(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleString('ko-KR', {
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function emojiFor(category: string): string {
  return CATEGORY_META[category as MenuCategory]?.emoji ?? '🍽️';
}

export function HistoryView({ entries, onBack }: HistoryViewProps) {
  return (
    <main className="screen screen-history">
      <button type="button" className="back-link" onClick={onBack}>
        ← 처음으로
      </button>

      <h2 className="history-title">지난 기록</h2>

      {entries.length === 0 ? (
        <div className="history-empty">
          <span className="history-empty-emoji" aria-hidden="true">
            🗒️
          </span>
          <p>아직 저장한 메뉴가 없어요.</p>
        </div>
      ) : (
        <ul className="history-list">
          {entries.map((entry) => (
            <li key={entry.id} className="history-item">
              <span className="history-item-emoji" aria-hidden="true">
                {emojiFor(entry.category)}
              </span>
              <span className="history-item-body">
                <span className="history-item-name">{entry.name}</span>
                <span className="history-item-meta">
                  {entry.category} · {formatTime(entry.pickedAt)}
                </span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
