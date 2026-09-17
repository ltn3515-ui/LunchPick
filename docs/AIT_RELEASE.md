# 점메픽 (LunchPick) — Release Notes

## v0.1.0 (MVP, 미배포 초안)
- Home / Result / History 3화면 구현
- 로컬 하드코딩 메뉴 데이터셋 (한식/중식/일식/양식/분식, 총 31개)
- 카테고리 필터, 랜덤 뽑기, 다시 뽑기
- 로그인 없이 동작하는 로컬 저장(Storage API) 기반 History (최대 20건)
- 네이티브 공유 시트 연동
- 기본/확장 분석 이벤트 8종 계측

## 배포 전 남은 작업
- `ait build` / `ait deploy` — Toss 계정 인증이 필요해 이 세션에서는 미실행
- 개발자센터 원문으로 번들 크기·탭바 규칙 재확인
- Toss 인앱 WebView / 실기기 테스트 (SANDBOX·REAL DEVICE 단계, `AIT_CHECKLIST.md` 참고)
- TDS 컴포넌트 라이브러리 정식 적용 검토 (현재는 컬러 토큰만 반영)

## 향후 로드맵 (이번 릴리스 범위 아님)
- 주변 식당 쿠폰 연계 (LOCATION 권한 추가 필요 → Category 재검토 필요)
- 토스페이 결제 혜택 연계
- 광고(IAA)/인앱결제(IAP) 연동
- `requestReview` 연동
