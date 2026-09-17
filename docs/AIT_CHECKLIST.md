# 점메픽 (LunchPick) — Test / Release Checklist

## LOCAL
- [x] `npx tsc -b --noEmit` — TypeScript 에러 0건
- [x] `npm run lint` (oxlint) — 에러 0건
- [x] `npm audit` — 0 vulnerabilities
- [x] 클라이언트 코드 secret/API key 노출 없음 확인

## BUILD
- [x] `npx tsc -b && npx vite build` — 정적 자산 빌드 성공 (dist/ 생성, gzip 기준 JS 88KB)
- [ ] `npm run build` (`ait build` 포함 전체 파이프라인) — 이 세션에는 Toss 배포 인증이 없어 `ait build/deploy` 자체는 미실행. 대화형 환경(로컬 PC, Toss 계정 로그인 상태)에서 재실행 필요
- [ ] 번들 크기 실측치를 공식 제한(원문 재확인 필요, 검색 기준 unzip 100MB)과 대조

## SANDBOX (Toss 인앱 WebView / devtools)
- [x] 브라우저(Chromium, 390×844 모바일 뷰포트) + Playwright로 전체 플로우 실행: Home → 카테고리 필터 → 뽑기 → Result → 다시 뽑기 → 저장 → 공유 호출 → History 확인 — console error 0건
- [x] Storage API 저장/조회 정상 동작 확인 (History 화면에 기록 반영됨)
- [x] Safe Area 패딩(`env(safe-area-inset-*)`) 적용 확인 (코드 레벨, 실제 노치 기기 렌더링은 REAL DEVICE 단계에서 재확인 필요)
- [ ] `@apps-in-toss/devtools` mock SDK로 실제 Toss 인앱 WebView 컨텍스트에서 Storage/Analytics/Share 동작 재확인 (이 세션은 순수 브라우저 프리뷰로만 검증, Toss 앱 연동 디바이스 접근 없음)
- [ ] 뒤로가기(하드웨어/제스처 백) 동작 확인 — 이 세션에서는 미검증, 실기기/에뮬레이터 필요

## REAL DEVICE
- [ ] 실제 Toss 앱 내 실행 확인 — 이 세션은 원격 컨테이너로 Toss 앱 실측 불가, 사용자 측 기기에서 진행 필요
- [ ] iOS/Android 노치·제스처 바 환경에서 Safe Area 실측
- [ ] 네이티브 공유 시트 실제 호출 확인

## 반려 이력
없음
