export type MenuCategory = '한식' | '중식' | '일식' | '양식' | '분식';

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
}

export const CATEGORIES: MenuCategory[] = ['한식', '중식', '일식', '양식', '분식'];

export interface CategoryMeta {
  emoji: string;
  accent: string;
  accentSoft: string;
}

export const CATEGORY_META: Record<MenuCategory, CategoryMeta> = {
  한식: { emoji: '🍚', accent: '#d9480f', accentSoft: '#fff0e6' },
  중식: { emoji: '🥡', accent: '#c92a2a', accentSoft: '#ffe9e9' },
  일식: { emoji: '🍣', accent: '#1971c2', accentSoft: '#e7f5ff' },
  양식: { emoji: '🍝', accent: '#7048e8', accentSoft: '#f2eaff' },
  분식: { emoji: '🍢', accent: '#c2255c', accentSoft: '#fff0f6' },
};

export const MENUS: MenuItem[] = [
  { id: 'kr-01', name: '김치찌개', category: '한식' },
  { id: 'kr-02', name: '된장찌개', category: '한식' },
  { id: 'kr-03', name: '비빔밥', category: '한식' },
  { id: 'kr-04', name: '제육볶음', category: '한식' },
  { id: 'kr-05', name: '갈비탕', category: '한식' },
  { id: 'kr-06', name: '순두부찌개', category: '한식' },
  { id: 'kr-07', name: '삼겹살', category: '한식' },
  { id: 'kr-08', name: '냉면', category: '한식' },
  { id: 'cn-01', name: '짜장면', category: '중식' },
  { id: 'cn-02', name: '짬뽕', category: '중식' },
  { id: 'cn-03', name: '탕수육', category: '중식' },
  { id: 'cn-04', name: '마라탕', category: '중식' },
  { id: 'cn-05', name: '볶음밥', category: '중식' },
  { id: 'cn-06', name: '양장피', category: '중식' },
  { id: 'jp-01', name: '초밥', category: '일식' },
  { id: 'jp-02', name: '돈카츠', category: '일식' },
  { id: 'jp-03', name: '라멘', category: '일식' },
  { id: 'jp-04', name: '우동', category: '일식' },
  { id: 'jp-05', name: '규동', category: '일식' },
  { id: 'jp-06', name: '연어덮밥', category: '일식' },
  { id: 'ws-01', name: '파스타', category: '양식' },
  { id: 'ws-02', name: '피자', category: '양식' },
  { id: 'ws-03', name: '스테이크', category: '양식' },
  { id: 'ws-04', name: '햄버거', category: '양식' },
  { id: 'ws-05', name: '리조또', category: '양식' },
  { id: 'ws-06', name: '샐러드', category: '양식' },
  { id: 'bs-01', name: '떡볶이', category: '분식' },
  { id: 'bs-02', name: '김밥', category: '분식' },
  { id: 'bs-03', name: '순대', category: '분식' },
  { id: 'bs-04', name: '라면', category: '분식' },
  { id: 'bs-05', name: '튀김', category: '분식' },
];

export function pickRandomMenu(category?: MenuCategory): MenuItem {
  const pool = category ? MENUS.filter((menu) => menu.category === category) : MENUS;
  const index = Math.floor(Math.random() * pool.length);
  return pool[index];
}
