# 점메픽 (LunchPick) — Security

## Secret / API Key
- 클라이언트 코드에 포함된 secret, API key, 토큰 **없음** (전수 확인: `src/`, `apps-in-toss.config.ts`, `.env*` 파일 없음)
- 서버 통신이 없으므로 인증 토큰 자체가 발생하지 않음

## 데이터 저장
- 저장 데이터: 메뉴명, 카테고리, 뽑은 시각 (개인식별정보 아님)
- 저장 위치: Apps in Toss `Storage` API (기기 로컬), 서버 전송 없음
- SDK 미탑재 환경 폴백: `window.localStorage` (동일하게 기기 로컬, 서버 전송 없음)

## 의존성
- 런타임 의존성: `react`, `react-dom`, `@apps-in-toss/web-framework` — 모두 공식 npm 배포 패키지
- `npm audit` 결과: 0 vulnerabilities (스캐폴딩/설치 시점 기준)

## 외부 네트워크 호출
- 없음. 앱 내 모든 fetch/XHR 호출 없음 (공유는 OS 네이티브 공유 시트를 호출하는 SDK `share()`만 사용)
