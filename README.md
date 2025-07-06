# 📦 무빙 (Moving) - Frontend

이사 전문가 매칭 서비스 무빙의 프론트엔드 웹 애플리케이션입니다. Next.js 프레임워크를 기반으로 개발되었으며, 고객과 이사 기사를 연결하는 플랫폼 서비스의 사용자 인터페이스를 제공합니다.

## 프로젝트 개요

무빙은 이사 서비스를 필요로 하는 고객과 이사 전문가 기사님을 매칭하는 서비스의 웹 애플리케이션입니다. 고객은 이사 견적을 요청하고, 전문가들은 고객 요청에 대한 견적을 제안하며, 고객들의 리뷰를 통해 신뢰성 있는 이사 서비스를 이용할 수 있습니다.

## 프로젝트 기간

2025.5.15 ~ 2025.06.27

## 링크

- [무빙 서비스 바로가기](https://5-moving.vercel.app/)
- [Figma 디자인](https://www.figma.com/design/W7nLdXDag1Fz6eoeKShOmx/1%ED%8C%80_%EB%AC%B4%EB%B9%99?node-id=0-1&t=NKsVd93eAVd1K7Or-1)
- [팀 노션 문서](https://positive-kingfisher-003.notion.site/1-_-1f0d9fa672ba8055b067ec2833354efd?source=copy_link)

## 🛠 기술 스택 (Tech Stack)

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-000000?style=flat-square&logo=Zustand&logoColor=white)
![React Query](https://img.shields.io/badge/TanStack_React_Query-FF4154?style=flat-square&logo=react-query&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-007FFF?style=flat-square&logo=mui&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=flat-square&logo=reacthookform&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3c9d9b?style=flat-square&logoColor=white)
![Emotion](https://img.shields.io/badge/Emotion-C76494?style=flat-square&logo=emotion&logoColor=white)
![Yarn](https://img.shields.io/badge/Yarn-2C8EBB?style=flat-square&logo=yarn&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=flat-square&logo=jest&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

## ⚙️ 개발 도구 (Development Tools)

![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Storybook](https://img.shields.io/badge/Storybook-FF4785?style=flat-square&logo=storybook&logoColor=white)

## 📦 전체 기술 개요 (Full Stack Overview)

- **프레임워크 (Framework):** Next.js  
- **언어 (Language):** TypeScript  
- **상태 관리 (State Management):** Zustand  
- **데이터 패칭 (Data Fetching):** TanStack React Query  
- **UI 라이브러리 (UI Library):** MUI (Material UI)  
- **폼 관리 (Form Management):** React Hook Form + Zod  
- **스타일링 (Styling):** Emotion  
- **패키지 매니저 (Package Manager):** Yarn  
- **테스트 (Testing):** Jest  
- **배포 (Deployment):** Vercel  

## 🧰 개발 도구 (Development Tools)

- **ESLint:** 코드 품질 관리 (Code Quality Enforcement)  
- **Storybook:** UI 컴포넌트 개발 및 문서화  
- **TypeScript:** 타입 안정성 확보 (Static Typing for Safety)  

---

## 프로젝트 구조

```
src/
├── app/                  # Next.js App Router 페이지
│   ├── auth/            # 인증 페이지 (로그인/회원가입)
│   ├── customer/        # 고객 전용 페이지
│   │   ├── profile/     # 고객 프로필 관리
│   │   ├── request/     # 견적 요청
│   │   ├── estimate/    # 견적 관리
│   │   ├── moverlist/   # 기사 목록
│   │   ├── wishlist/    # 찜한 기사
│   │   └── reviews/     # 리뷰 관리
│   ├── mover/           # 기사 전용 페이지
│   │   ├── profile/     # 기사 프로필 관리
│   │   ├── dashboard/   # 대시보드
│   │   ├── estimate/    # 견적 관리
│   │   ├── mypage/      # 마이페이지
│   │   └── reviews/     # 리뷰 관리
│   └── oauth/           # 소셜 로그인 콜백
├── components/          # 재사용 가능한 컴포넌트
│   ├── auth/           # 인증 관련 컴포넌트
│   ├── customer/       # 고객 전용 컴포넌트
│   ├── mover/          # 기사 전용 컴포넌트
│   ├── profile/        # 프로필 관련 컴포넌트
│   ├── review/         # 리뷰 관련 컴포넌트
│   └── shared/         # 공통 컴포넌트
├── api/                # API 요청 함수
│   ├── auth/           # 인증 API
│   ├── customer/       # 고객 관련 API
│   ├── mover/          # 기사 관련 API
│   ├── review/         # 리뷰 API
│   ├── like/           # 찜 기능 API
│   └── notification/   # 알림 API
├── hooks/              # 커스텀 훅
├── store/              # 전역 상태 관리 (Zustand)
├── types/              # TypeScript 타입 정의
├── schemas/            # Zod 스키마 정의
├── utils/              # 유틸리티 함수
└── lib/                # 라이브러리 설정
```

## 팀원별 담당 기능

### 정하윤

**고객/기사 프로필 관리 기능 및 기사님 상세 페이지 담당**

- 공통 컴포넌트 작업
- React-hook-form + Zod 기반 폼 관리 기능 구현 (고객 및 기사 프로필 등록 및 수정)
- S3 Bucket 사용한 이미지 업로드 기능 구현
- 기사님 기본 정보 수정
- 기사님 상세 페이지
- SNS 공유하기 구현
- 배포

### 김조순

**고객/기사 로그인 회원가입 리뷰 찜한기사 패이지 담당**

- MUI theme 설정
- Color Mode 설정
- 공통 컴포넌트 작업
- storybook 설정 세팅
- middleware 세팅
- axios 토큰 자동갱신 설정
- locale적용
- 로그인 페이지
- 회원가입 페이지
- 리뷰 페이지
- 찜한 기사목록 페이지
- SSE API 자동연결 및 해제 설정
- 헤더 및 전역에서 사용하는 Navigation tap 구현
- i18next 다국어 번역 기능

### 윤민호

### 최은비

**기사님 찾기(기사님 목록 조회)/ 기사님 마이페이지 담당**

- 공통 컴포넌트 작업
- 기사님 마이페이지 
- 기사님 찾기 페이지
- 소셜 로그인 구현
- i18next 다국어 번역 기능
- Sentry 설정

### 박세정

## 주요 기능

### 인증 시스템

- JWT 토큰 기반 인증
- 소셜 로그인 (Google, Kakao, Naver)
- 역할 기반 라우팅 (고객/기사)
- 자동 로그인 상태 관리

### 견적 시스템

- 고객의 직관적인 견적 요청 폼
- 실시간 견적 현황 조회
- 기사의 견적 제안 관리
- 견적 상태별 필터링

### 프로필 관리

- 고객/기사 프로필 등록 및 수정
- 이미지 업로드 및 미리보기
- 프로필 정보 유효성 검증
- 반응형 프로필 카드

### 기사 검색 및 매칭

- 지역별 기사 검색
- 평점 및 리뷰 기반 필터링
- 기사 상세 정보 조회
- 찜하기 기능

### 평가 시스템

- 서비스 완료 후 상호 리뷰 작성
- 별점 및 텍스트 리뷰
- 리뷰 목록 조회 및 관리
- 평점 통계 표시

### 실시간 알림

- Server-Sent Events를 통한 실시간 알림
- 견적 요청/제안 알림
- 리뷰 작성 알림
- 알림 히스토리 관리

### 반응형 디자인

- 모바일 우선 반응형 디자인
- Material-UI 기반 일관된 디자인 시스템
- 접근성 고려된 UI/UX

### 부가 기능

- 다국어 기능 지원
- 다크 모드 지원
- 다음 주소 API 연동
- 이미지 최적화 및 압축
- 무한 스크롤 구현
- 로딩 상태 관리
- 에러 바운더리 및 에러 처리
