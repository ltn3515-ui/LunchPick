# 점메픽 (LunchPick) — Architecture

## Tech Stack
- `create-ait-app` (v0.2.7) 스캐폴딩, Vite `react-ts` 프리셋
- React 19 + TypeScript 6 + Vite 8
- `@apps-in-toss/web-framework` (Storage, Analytics, share)
- 패키지 매니저: npm
- 서버/백엔드: **없음** (전부 클라이언트 로컬 처리)

> **TDS 관련 의사결정 (MODIFY)**: `create-ait-app`의 `--tds` 템플릿은 공식 CLI가 "비대화형/자동화 환경에서 아직 검증이 더 필요하다"고 명시하고 있어, 이번 세션(비대화형 스캐폴딩)에서는 `react-ts` 템플릿으로 생성한 뒤 TDS 컬러 토큰(`primaryColor: #3182F6` 등)만 CSS에 반영했다. TDS 컴포넌트 라이브러리 정식 적용은 대화형 환경에서 `--tds`로 재검증 후 전환을 권장한다.

## 화면 구조
```
App (view state machine: 'home' | 'result' | 'history')
├─ HomeView    — 카테고리 필터 + "오늘 뭐 먹지?" 버튼 + History 진입 링크
├─ ResultView  — 결과 카드 + 다시 뽑기 / 공유하기 / 저장하기
└─ HistoryView — 로컬 저장된 최근 기록 목록 (최대 20개)
```
탭바는 사용하지 않음 — 단일 목적 유틸리티 흐름(진입→행동→결과)에 상시 노출되는 탭 내비게이션이 불필요하다고 판단. 공식 가이드상 탭바는 필수 요소가 아니며, 사용 시 최소 2개·최대 5개 규칙 및 플로팅 폼 유지 의무가 있음(재검색 확인 필요, 아래 정책 문서 참고).

## 데이터 흐름
- `src/data/menus.ts`: 한식/중식/일식/양식/분식 5개 카테고리, 총 31개 항목 하드코딩. `pickRandomMenu(category?)`가 순수 함수로 랜덤 선택 담당
- `src/lib/storage.ts`: `Storage` SDK 래퍼. SDK 미탑재 환경(순수 브라우저 프리뷰)에서는 `localStorage`로 자동 폴백
- `src/lib/history.ts`: 저장 기록(JSON 배열, 최대 20건)을 `storage.ts` 위에서 관리
- `src/lib/analytics.ts`: `Analytics.screen/click`, `share` SDK 래퍼. SDK 미탑재 시 조용히 no-op

## 공통 자산화 (스킬 20장 취지)
이 세션에서 접근 가능한 저장소 범위 내에 기존 `ait-common` 성격의 템플릿 레포가 없어(연결된 저장소: `shelter-map`뿐), 아래 3개 모듈을 **독립적인 순수 함수/래퍼**로 분리해 작성했다. 외부 의존성 없이 다른 Apps in Toss 프로젝트로 그대로 복사 가능하도록 SDK 직접 참조를 파일 3개로 국한했다.
- `src/lib/storage.ts` — SDK Storage 래퍼 + localStorage 폴백
- `src/lib/analytics.ts` — SDK Analytics/Share 래퍼 + no-op 폴백
- `src/index.css`의 safe-area `env()` 패딩 처리 — Safe Area 대응 CSS 패턴

## Safe Area
`index.html`에 `viewport-fit=cover`를 설정하고, `#root` 컨테이너 padding에 `env(safe-area-inset-*)`를 더해 노치/제스처 바 영역을 침범하지 않도록 처리. (Apps in Toss 전용 Safe Area 전용 API가 별도로 있는지는 공식 문서 직접 접속이 이번 세션 네트워크 정책상 차단되어 미확인 — 배포 전 개발자센터에서 재확인 필요.)
