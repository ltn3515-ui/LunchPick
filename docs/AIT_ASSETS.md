# 점메픽 (LunchPick) — 메뉴 사진 업로드 가이드

## 업로드 위치
`public/menu/{파일명}` — 이 경로에 파일을 넣으면 코드 수정 없이 자동으로 Result 화면에 노출됩니다.
사진이 아직 없는 항목은 카테고리 이모지로 자연스럽게 대체되므로, 한 번에 다 채우지 않아도 앱이 깨지지 않습니다.

## 권장 스펙
- 포맷: **JPG**
- 비율: 정사각형(1:1) 권장 (원형/사각 카드에 `object-fit: cover`로 크롭되어 표시됨)
- 해상도: 최소 600×600px (너무 크면 번들 용량 증가 — 장당 300KB 이하 권장)
- 파일명: 아래 표의 "파일명" 열 그대로, 대소문자 정확히 일치

## 메뉴 31종 파일명 목록

### 한식 🍚
| 메뉴 | 파일명 |
|---|---|
| 김치찌개 | `public/menu/kr-01.jpg` |
| 된장찌개 | `public/menu/kr-02.jpg` |
| 비빔밥 | `public/menu/kr-03.jpg` |
| 제육볶음 | `public/menu/kr-04.jpg` |
| 갈비탕 | `public/menu/kr-05.jpg` |
| 순두부찌개 | `public/menu/kr-06.jpg` |
| 삼겹살 | `public/menu/kr-07.jpg` |
| 냉면 | `public/menu/kr-08.jpg` |

### 중식 🥡
| 메뉴 | 파일명 |
|---|---|
| 짜장면 | `public/menu/cn-01.jpg` |
| 짬뽕 | `public/menu/cn-02.jpg` |
| 탕수육 | `public/menu/cn-03.jpg` |
| 마라탕 | `public/menu/cn-04.jpg` |
| 볶음밥 | `public/menu/cn-05.jpg` |
| 양장피 | `public/menu/cn-06.jpg` |

### 일식 🍣
| 메뉴 | 파일명 |
|---|---|
| 초밥 | `public/menu/jp-01.jpg` |
| 돈카츠 | `public/menu/jp-02.jpg` |
| 라멘 | `public/menu/jp-03.jpg` |
| 우동 | `public/menu/jp-04.jpg` |
| 규동 | `public/menu/jp-05.jpg` |
| 연어덮밥 | `public/menu/jp-06.jpg` |

### 양식 🍝
| 메뉴 | 파일명 |
|---|---|
| 파스타 | `public/menu/ws-01.jpg` |
| 피자 | `public/menu/ws-02.jpg` |
| 스테이크 | `public/menu/ws-03.jpg` |
| 햄버거 | `public/menu/ws-04.jpg` |
| 리조또 | `public/menu/ws-05.jpg` |
| 샐러드 | `public/menu/ws-06.jpg` |

### 분식 🍢
| 메뉴 | 파일명 |
|---|---|
| 떡볶이 | `public/menu/bs-01.jpg` |
| 김밥 | `public/menu/bs-02.jpg` |
| 순대 | `public/menu/bs-03.jpg` |
| 라면 | `public/menu/bs-04.jpg` |
| 튀김 | `public/menu/bs-05.jpg` |

## 구현 방식
- `src/data/menus.ts`의 각 `MenuItem`은 `image: /menu/{id}.jpg` 필드를 가짐
- `src/components/ResultView.tsx`가 `<img src={menu.image}>`를 렌더링하되, `onError` 발생 시 카테고리 이모지로 즉시 대체 (깨진 이미지 아이콘 노출 없음)
- 파일이 하나도 없어도, 일부만 있어도 정상 동작 — 점진적으로 채워나갈 수 있음
