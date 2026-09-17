import { getStorageItem, setStorageItem } from './storage';
import type { MenuItem } from '../data/menus';

const HISTORY_KEY = 'lunchpick_history_v1';
const MAX_HISTORY = 20;

export interface HistoryEntry {
  id: string;
  name: string;
  category: string;
  pickedAt: string; // ISO string
}

export async function loadHistory(): Promise<HistoryEntry[]> {
  const raw = await getStorageItem(HISTORY_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function addHistoryEntry(menu: MenuItem): Promise<HistoryEntry[]> {
  const current = await loadHistory();
  const entry: HistoryEntry = {
    id: `${menu.id}-${Date.now()}`,
    name: menu.name,
    category: menu.category,
    pickedAt: new Date().toISOString(),
  };
  const next = [entry, ...current].slice(0, MAX_HISTORY);
  await setStorageItem(HISTORY_KEY, JSON.stringify(next));
  return next;
}
