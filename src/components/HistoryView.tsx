import type { HistoryEntry } from '../lib/history';

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

export function HistoryView({ entries, onBack }: HistoryViewProps) {
  return (
    <main className="screen screen-history">
      <button type="button" className="back-link" onClick={onBack}>
        ← 처음으로
      </button>

      <h2 className="history-title">지난 기록</h2>

      {entries.length === 0 ? (
        <p className="history-empty">아직 저장한 메뉴가 없어요.</p>
      ) : (
        <ul className="history-list">
          {entries.map((entry) => (
            <li key={entry.id} className="history-item">
              <span className="history-item-name">{entry.name}</span>
              <span className="history-item-meta">
                {entry.category} · {formatTime(entry.pickedAt)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
