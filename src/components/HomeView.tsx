import type { MenuCategory } from '../data/menus';
import { CATEGORIES } from '../data/menus';

interface HomeViewProps {
  selectedCategory: MenuCategory | null;
  onSelectCategory: (category: MenuCategory | null) => void;
  onPick: () => void;
  onOpenHistory: () => void;
}

export function HomeView({ selectedCategory, onSelectCategory, onPick, onOpenHistory }: HomeViewProps) {
  return (
    <main className="screen screen-home">
      <button type="button" className="history-link" onClick={onOpenHistory}>
        지난 기록
      </button>

      <div className="home-copy">
        <p className="home-eyebrow">오늘 점심, 고민 끝</p>
        <h1 className="home-title">오늘 뭐 먹지?</h1>
      </div>

      <div className="category-row" role="group" aria-label="카테고리 필터">
        <button
          type="button"
          className={`chip ${selectedCategory === null ? 'chip-active' : ''}`}
          onClick={() => onSelectCategory(null)}
        >
          전체
        </button>
        {CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            className={`chip ${selectedCategory === category ? 'chip-active' : ''}`}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <button type="button" className="pick-button" onClick={onPick}>
        오늘 뭐 먹지?
      </button>
    </main>
  );
}
