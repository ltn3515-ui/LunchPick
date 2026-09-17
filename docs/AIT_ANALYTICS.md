# 점메픽 (LunchPick) — Analytics

## 기본 이벤트
| 이벤트 | 트리거 | 구현 위치 |
|---|---|---|
| `miniapp_open` | 앱 최초 오픈, Home 화면 복귀 시 | `App.tsx` (mount, `handleBackToHome`) |
| `core_action_start` | "오늘 뭐 먹지?" 버튼 탭 | `App.tsx` (`handlePick`) |
| `core_action_complete` | 메뉴 선택 완료 (랜덤 결과 확정) | `App.tsx` (`handlePick`) |
| `result_view` | Result 화면 진입 | `App.tsx` (`handlePick`) |
| `save` | 결과 저장 | `App.tsx` (`handleSave`) |
| `share` | 공유 시트 호출 (성공/실패 target 포함) | `App.tsx` (`handleShare`) |
| `return_visit` | 저장된 기록이 있는 상태로 재방문 | `App.tsx` (mount) |
| `error` | (예약됨, 현재 코드 경로에서 미사용 — 향후 예외 처리 확장 시 사용) | — |

## 확장 이벤트
| 이벤트 | 트리거 | 구현 위치 |
|---|---|---|
| `menu_reroll` | "다시 뽑기" 탭 | `App.tsx` (`handleReroll`) |
| `category_filter_used` | 카테고리 칩 선택 (target: 카테고리명 또는 '전체') | `App.tsx` (`handleSelectCategory`) |

## 구현 방식
- `src/lib/analytics.ts`에서 `Analytics.screen({ log_name, screen_name })`, `Analytics.click({ log_name, target })`를 래핑
- SDK가 없는 환경(순수 브라우저 프리뷰)에서는 이벤트 호출이 조용히 no-op 처리되어 앱 동작을 막지 않음
- 이벤트 이름 상수는 `ANALYTICS_EVENTS`로 한 곳에서 관리 (오타/중복 방지)
