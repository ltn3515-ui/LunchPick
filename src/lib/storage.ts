import { Storage } from '@apps-in-toss/web-framework';

// Apps in Toss Storage API가 없는 환경(순수 브라우저 프리뷰 등)에서도
// 개발/확인이 가능하도록 localStorage로 안전하게 폴백한다.
function hasSdkStorage(): boolean {
  return typeof Storage?.getItem === 'function';
}

export async function getStorageItem(key: string): Promise<string | null> {
  if (hasSdkStorage()) {
    try {
      return await Storage.getItem(key);
    } catch {
      // fall through to local fallback
    }
  }
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export async function setStorageItem(key: string, value: string): Promise<void> {
  if (hasSdkStorage()) {
    try {
      await Storage.setItem(key, value);
      return;
    } catch {
      // fall through to local fallback
    }
  }
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // 저장 실패는 조용히 무시한다 (기록 기능은 핵심 플로우가 아님)
  }
}
