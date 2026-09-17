import { Analytics, share } from '@apps-in-toss/web-framework';

export const ANALYTICS_EVENTS = {
  MINIAPP_OPEN: 'miniapp_open',
  CORE_ACTION_START: 'core_action_start',
  CORE_ACTION_COMPLETE: 'core_action_complete',
  RESULT_VIEW: 'result_view',
  SAVE: 'save',
  SHARE: 'share',
  RETURN_VISIT: 'return_visit',
  ERROR: 'error',
  MENU_REROLL: 'menu_reroll',
  CATEGORY_FILTER_USED: 'category_filter_used',
} as const;

export type AnalyticsEventName = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS];

function hasSdkAnalytics(): boolean {
  return typeof Analytics?.screen === 'function' && typeof Analytics?.click === 'function';
}

export async function logScreen(screenName: string): Promise<void> {
  if (!hasSdkAnalytics()) return;
  try {
    await Analytics.screen({ log_name: screenName, screen_name: screenName });
  } catch {
    // 분석 실패는 핵심 플로우를 막지 않는다
  }
}

export async function logClick(logName: AnalyticsEventName, target?: string): Promise<void> {
  if (!hasSdkAnalytics()) return;
  try {
    await Analytics.click({ log_name: logName, target });
  } catch {
    // 분석 실패는 핵심 플로우를 막지 않는다
  }
}

export async function shareMenu(message: string): Promise<boolean> {
  try {
    await share({ message });
    return true;
  } catch {
    return false;
  }
}
