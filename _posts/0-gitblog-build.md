---
title: "Next.js로 GitHub Pages 블로그 만들기"
date: 2024-08-20
categories: ["PROJECT", "블로그"]
tags: ["Next.js", "GitHub Pages", "Markdown"]
excerpt: "Next.js와 GitHub Pages를 이용하여 간단한 블로그를 만드는 방법을 소개합니다."
---

# Next.js로 GitHub Pages 블로그 만들기

이 블로그는 Next.js와 GitHub Pages를 사용하여 구축했습니다. 마크다운 파일로 포스트를 관리하고, 자동으로 정적 HTML로 빌드됩니다.

## 주요 기능

### 📝 마크다운 기반 포스트 관리
- `_posts` 폴더에 `.md` 파일을 추가하기만 하면 자동으로 블로그에 표시됩니다.
- Front matter를 사용하여 제목, 날짜, 카테고리, 태그를 관리합니다.

### 🏷️ 카테고리 및 태그 시스템
- 포스트를 카테고리별로 분류할 수 있습니다.
- 태그를 통해 관련 포스트를 쉽게 찾을 수 있습니다.

### 📸 이미지 자산 관리
- `_assets/images` 폴더에 이미지를 저장하고 마크다운에서 참조할 수 있습니다.
- 이미지 최적화를 통해 빠른 로딩 속도를 제공합니다.

### 🔍 검색 및 필터링
- 카테고리별로 포스트를 검색할 수 있습니다.
- 태그별로 관련 포스트를 필터링할 수 있습니다.
- 연도별로 포스트를 아카이빙합니다.

## 프로젝트 구조

```
hex44617461.github.io/
├── _posts/              # 마크다운 포스트
│   └── *.md
├── _assets/
│   └── images/          # 이미지 자산
├── app/                 # Next.js App Router
│   ├── page.tsx         # 홈페이지
│   ├── posts/[id]/      # 포스트 상세 페이지
│   ├── categories/      # 카테고리 페이지
│   ├── tags/            # 태그 페이지
│   ├── archives/        # 아카이브 페이지
│   └── about/           # 소개 페이지
├── components/          # React 컴포넌트
├── lib/                 # 유틸리티 함수
└── next.config.js       # Next.js 설정
```

## 포스트 작성 방법

`_posts` 폴더에 다음과 같은 형식의 마크다운 파일을 생성합니다:

```markdown
---
title: "포스트 제목"
date: 2024-08-20
categories: ["카테고리1", "카테고리2"]
tags: ["태그1", "태그2"]
excerpt: "포스트 요약"
---

# 포스트 내용

마크다운 형식으로 포스트를 작성합니다.
```

## 배포 방법

### GitHub Pages로 배포

1. GitHub 저장소 설정에서 Pages 섹션에서 배포 브랜치 선택
2. `npm run build` 실행하여 정적 파일 생성
3. Git에 커밋 및 푸시

### 자동 배포 (GitHub Actions)

GitHub Actions를 설정하면 푸시할 때마다 자동으로 빌드 및 배포됩니다.

## 기술 스택

- **Framework**: Next.js (React)
- **Styling**: Tailwind CSS
- **Content**: Markdown (gray-matter, remark)
- **Hosting**: GitHub Pages
- **Language**: TypeScript

## 앞으로의 계획

- [ ] RSS 피드 생성
- [ ] 검색 기능
- [ ] 댓글 시스템
- [ ] 다크 모드
- [ ] 이미지 갤러리

이 블로그는 지속적으로 개선될 예정입니다. 새로운 기능이 추가되면 업데이트하겠습니다!
