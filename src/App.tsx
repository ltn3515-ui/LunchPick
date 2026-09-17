import { useEffect, useState } from 'react';
import './App.css';
import { HomeView } from './components/HomeView';
import { ResultView } from './components/ResultView';
import { HistoryView } from './components/HistoryView';
import type { MenuCategory, MenuItem } from './data/menus';
import { pickRandomMenu } from './data/menus';
import { addHistoryEntry, loadHistory, type HistoryEntry } from './lib/history';
import { ANALYTICS_EVENTS, logClick, logScreen, shareMenu } from './lib/analytics';

type View = 'home' | 'result' | 'history';

function App() {
  const [view, setView] = useState<View>('home');
  const [category, setCategory] = useState<MenuCategory | null>(null);
  const [menu, setMenu] = useState<MenuItem | null>(null);
  const [saved, setSaved] = useState(false);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    logScreen(ANALYTICS_EVENTS.MINIAPP_OPEN);
    loadHistory().then((entries) => {
      setHistory(entries);
      if (entries.length > 0) {
        logScreen(ANALYTICS_EVENTS.RETURN_VISIT);
      }
    });
  }, []);

  function handleSelectCategory(next: MenuCategory | null) {
    setCategory(next);
    logClick(ANALYTICS_EVENTS.CATEGORY_FILTER_USED, next ?? '전체');
  }

  function handlePick() {
    logClick(ANALYTICS_EVENTS.CORE_ACTION_START, 'pick_button');
    const picked = pickRandomMenu(category ?? undefined);
    setMenu(picked);
    setSaved(false);
    setView('result');
    logClick(ANALYTICS_EVENTS.CORE_ACTION_COMPLETE, picked.name);
    logScreen(ANALYTICS_EVENTS.RESULT_VIEW);
  }

  function handleReroll() {
    logClick(ANALYTICS_EVENTS.MENU_REROLL);
    const picked = pickRandomMenu(category ?? undefined);
    setMenu(picked);
    setSaved(false);
  }

  async function handleSave() {
    if (!menu || saved) return;
    const next = await addHistoryEntry(menu);
    setHistory(next);
    setSaved(true);
    logClick(ANALYTICS_EVENTS.SAVE, menu.name);
  }

  async function handleShare() {
    if (!menu) return;
    const message = `오늘 점심은 ${menu.name} 어때요? 점메픽으로 골랐어요!`;
    const ok = await shareMenu(message);
    logClick(ANALYTICS_EVENTS.SHARE, ok ? 'success' : 'fail');
  }

  function handleOpenHistory() {
    setView('history');
    logScreen('history_view');
  }

  function handleBackToHome() {
    setView('home');
    logScreen(ANALYTICS_EVENTS.MINIAPP_OPEN);
  }

  return (
    <div className="app">
      {view === 'home' && (
        <HomeView
          selectedCategory={category}
          onSelectCategory={handleSelectCategory}
          onPick={handlePick}
          onOpenHistory={handleOpenHistory}
        />
      )}
      {view === 'result' && menu && (
        <ResultView
          key={menu.id}
          menu={menu}
          saved={saved}
          onReroll={handleReroll}
          onSave={handleSave}
          onShare={handleShare}
          onBack={handleBackToHome}
        />
      )}
      {view === 'history' && <HistoryView entries={history} onBack={handleBackToHome} />}
    </div>
  );
}

export default App;
