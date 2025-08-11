# TaskFlow 개발 가이드 - AI 도구를 활용한 풀스택 개발

## 📋 프로젝트 개요: TaskFlow - 할일 관리 시스템

### RFP (Request for Proposal)

**프로젝트명**: TaskFlow - 개인 할일 관리 웹 애플리케이션

**요구사항**:
- 사용자가 할일을 추가, 수정, 삭제, 완료 처리할 수 있는 시스템
- 우선순위별 할일 분류 기능
- 마감일 설정 및 알림 기능
- 반응형 웹 디자인
- 실시간 데이터 동기화

**기술 스택**:
- Frontend: React + TypeScript + Tailwind CSS
- Backend: Node.js + Express + TypeScript
- Database: SQLite + Prisma ORM
- API: RESTful API

**예상 기간**: 1-2일 (AI 도구 활용)

---

## 🚀 개발 환경 설정

### 1. 기본 환경 준비
```bash
# 프로젝트 디렉토리 생성
mkdir taskflow-ai-lab
cd taskflow-ai-lab

# Git 초기화
git init

# 백엔드/프론트엔드 폴더 생성
mkdir backend frontend
```

### 2. Cursor 설정
- Cursor IDE 설치 및 실행
- AI 기능 활성화
- 프로젝트 폴더 열기

---

## 📋 단계별 개발 프로세스

### STEP 1: 백엔드 초기 설정

#### 🤖 Cursor 프롬프트 1-1: 프로젝트 구조 생성
```
백엔드 프로젝트 구조를 다음과 같이 생성해줘:

taskflow-backend/
├── src/
│   ├── server.ts
│   ├── types/
│   │   └── task.ts
│   ├── routes/
│   │   └── tasks.ts
│   ├── controllers/
│   │   └── taskController.ts
│   ├── services/
│   │   └── taskService.ts
│   ├── middleware/
│   │   └── errorHandler.ts
│   └── utils/
│       └── validation.ts
├── prisma/
│   └── schema.prisma
├── package.json
├── tsconfig.json
└── .env

각 폴더와 파일을 생성하고, 기본 구조만 잡아줘.
```

#### 🤖 Cursor 프롬프트 1-2: Prisma 스키마 생성
```
TaskFlow 할일 관리를 위한 Prisma 스키마를 prisma/schema.prisma에 작성해줘.

요구사항:
- SQLite 데이터베이스 사용
- Task 모델: id, title, description, priority, status, dueDate, createdAt, updatedAt
- Priority enum: HIGH, MEDIUM, LOW
- Status enum: PENDING, IN_PROGRESS, COMPLETED
- TypeScript 생성기 설정 포함

완전한 schema.prisma 파일을 작성해줘.
```

#### 🤖 Cursor 프롬프트 1-3: TypeScript 타입 정의
```
src/types/task.ts 파일에 TaskFlow 애플리케이션에서 사용할 TypeScript 타입들을 정의해줘.

포함할 내용:
1. Priority, Status enum
2. Task 인터페이스 (Prisma 모델과 일치)
3. CreateTaskDTO (생성용 DTO)
4. UpdateTaskDTO (수정용 DTO)
5. TaskFilter 인터페이스 (필터링용)

모든 타입을 export하고, JSDoc 주석도 포함해줘.
```

#### 🤖 Cursor 프롬프트 1-4: package.json 설정
```
backend/package.json 파일을 TaskFlow 백엔드 프로젝트에 맞게 설정해줘.

요구사항:
- 프로젝트명: taskflow-backend
- TypeScript 기반
- Express, Prisma, CORS 의존성
- 개발/빌드/테스트 스크립트
- Prisma 관련 스크립트

포함할 스크립트:
- dev: ts-node-dev로 개발 서버 실행
- build: TypeScript 컴파일
- start: 프로덕션 서버 실행
- test: Jest 테스트 실행
- prisma:generate: Prisma 클라이언트 생성
- prisma:migrate: 데이터베이스 마이그레이션
- prisma:studio: Prisma Studio 실행

완전한 package.json 파일을 작성해줘.
```

#### 🤖 Cursor 프롬프트 1-5: TypeScript 설정
```
backend/tsconfig.json 파일을 TaskFlow 백엔드 프로젝트에 맞게 설정해줘.

요구사항:
- ES2020 타겟
- CommonJS 모듈
- 엄격한 타입 체크
- 소스맵 생성
- 선언 파일 생성
- src 폴더를 루트 디렉토리로 설정

완전한 tsconfig.json 파일을 작성해줘.
```

---

### STEP 2: API 서버 구현

#### 🤖 Cursor 프롬프트 2-1: Express 서버 설정
```
src/server.ts에 Express 서버를 설정해줘.

요구사항:
- TypeScript 사용
- CORS 미들웨어 설정
- JSON 파싱 미들웨어
- /api/tasks 라우트 연결
- 에러 핸들링 미들웨어
- 포트 3001에서 실행
- 서버 시작 시 콘솔 로그 출력

완전한 server.ts 파일을 작성해줘.
```

#### 🤖 Cursor 프롬프트 2-2: 에러 핸들링 미들웨어
```
src/middleware/errorHandler.ts에 Express 에러 핸들링 미들웨어를 작성해줘.

요구사항:
- TypeScript 사용
- 다양한 에러 타입 처리 (ValidationError, NotFoundError, etc.)
- 개발/프로덕션 환경별 에러 응답 차별화
- 로깅 기능 포함
- HTTP 상태 코드 자동 설정

완전한 errorHandler.ts 파일을 작성해줘.
```

#### 🤖 Cursor 프롬프트 2-3: 태스크 서비스 로직
```
src/services/taskService.ts에 태스크 관련 비즈니스 로직을 구현해줘.

요구사항:
- Prisma Client 사용
- CRUD 기능: getAllTasks, getTaskById, createTask, updateTask, deleteTask
- 필터링 기능 (status, priority별)
- 에러 처리 (NotFound, ValidationError)
- TypeScript 사용
- 각 메서드에 JSDoc 주석

완전한 taskService.ts 파일을 작성해줘.
```

#### 🤖 Cursor 프롬프트 2-4: 태스크 컨트롤러
```
src/controllers/taskController.ts에 태스크 API 컨트롤러를 구현해줘.

요구사항:
- Express Request, Response, NextFunction 사용
- taskService의 메서드 호출
- 적절한 HTTP 상태 코드 반환
- 에러를 next()로 전달
- 입력 데이터 유효성 검사
- TypeScript 사용

포함할 메서드:
- getAllTasks (GET)
- getTaskById (GET /:id)
- createTask (POST)
- updateTask (PUT /:id)
- deleteTask (DELETE /:id)

완전한 taskController.ts 파일을 작성해줘.
```

#### 🤖 Cursor 프롬프트 2-5: 라우터 설정
```
src/routes/tasks.ts에 태스크 API 라우터를 설정해줘.

요구사항:
- Express Router 사용
- taskController의 메서드들을 각 엔드포인트에 연결
- RESTful API 패턴 준수
- 미들웨어 체이닝 (유효성 검사 → 컨트롤러)

라우트 구성:
- GET / - 모든 태스크 조회
- GET /:id - 특정 태스크 조회
- POST / - 새 태스크 생성
- PUT /:id - 태스크 수정
- DELETE /:id - 태스크 삭제

완전한 tasks.ts 라우터 파일을 작성해줘.
```

#### 🤖 Cursor 프롬프트 2-6: 유효성 검사 유틸리티
```
src/utils/validation.ts에 입력 데이터 유효성 검사 함수들을 작성해줘.

요구사항:
- TypeScript 사용
- CreateTaskDTO, UpdateTaskDTO 유효성 검사
- 필수 필드 검증
- 데이터 타입 검증
- 우선순위, 상태 값 검증
- 날짜 형식 검증

포함할 함수:
- validateCreateTask(data: any): CreateTaskDTO
- validateUpdateTask(data: any): UpdateTaskDTO
- validateTaskId(id: string): boolean

완전한 validation.ts 파일을 작성해줘.
```

---

### STEP 3: 프론트엔드 구현

#### 🤖 Cursor 프롬프트 3-1: React 프로젝트 설정
```
frontend 폴더에 React + TypeScript 프로젝트를 설정해줘.

요구사항:
- create-react-app with TypeScript
- Tailwind CSS 설정
- 필요한 의존성 설치
- 기본 폴더 구조 생성

설치할 패키지:
- react, react-dom, typescript
- tailwindcss, @tailwindcss/forms
- axios (API 통신용)
- react-hook-form (폼 관리)
- date-fns (날짜 처리)

완전한 설정을 위한 명령어와 설정 파일들을 제공해줘.
```

#### 🤖 Cursor 프롬프트 3-2: API 서비스 생성
```
src/services/api.ts에 백엔드 API와 통신하는 서비스를 만들어줘.

요구사항:
- fetch API 사용 (axios 대신)
- 모든 CRUD 작업 지원
- 에러 처리 포함
- TypeScript 사용
- 백엔드 타입과 일치하는 인터페이스 사용

포함할 메서드:
- getAllTasks(): Promise<Task[]>
- getTaskById(id: string): Promise<Task>
- createTask(task: CreateTaskDTO): Promise<Task>
- updateTask(id: string, task: UpdateTaskDTO): Promise<Task>
- deleteTask(id: string): Promise<void>

완전한 api.ts 파일을 작성해줘.
```

#### 🤖 Cursor 프롬프트 3-3: 커스텀 훅 생성
```
src/hooks/useTasks.ts에 태스크 관리를 위한 React 커스텀 훅을 만들어줘.

요구사항:
- React 18+ 사용
- useState, useEffect 활용
- API 서비스 연동
- 로딩 상태 관리
- 에러 상태 관리
- CRUD 작업 함수들 제공
- 자동 데이터 새로고침

반환할 객체:
- tasks: Task[]
- loading: boolean
- error: string | null
- createTask: (task: CreateTaskDTO) => Promise<void>
- updateTask: (id: string, task: UpdateTaskDTO) => Promise<void>
- deleteTask: (id: string) => Promise<void>
- refreshTasks: () => Promise<void>

완전한 useTasks.ts 훅을 작성해줘.
```

#### 🤖 Cursor 프롬프트 3-4: 태스크 폼 컴포넌트
```
src/components/TaskForm.tsx에 새 태스크 생성/수정을 위한 폼 컴포넌트를 만들어줘.

요구사항:
- React + TypeScript 사용
- Tailwind CSS로 스타일링
- react-hook-form 사용
- 모든 필드 포함 (title, description, priority, dueDate)
- 유효성 검사 (title 필수)
- 반응형 디자인
- 생성/수정 모드 지원

Props:
- onSubmit: (task: CreateTaskDTO | UpdateTaskDTO) => void
- initialData?: Task (수정 모드용)
- mode?: 'create' | 'edit'

완전한 TaskForm.tsx 컴포넌트를 작성해줘.
```

#### 🤖 Cursor 프롬프트 3-5: 태스크 목록 컴포넌트
```
src/components/TaskList.tsx에 태스크 목록을 표시하는 컴포넌트를 만들어줘.

요구사항:
- React + TypeScript 사용
- Tailwind CSS로 스타일링
- 태스크 카드 형태로 표시
- 우선순위별 색상 구분
- 상태별 아이콘 표시
- 인라인 편집 기능
- 삭제 확인 다이얼로그
- 반응형 그리드 레이아웃

Props:
- tasks: Task[]
- onUpdate: (id: string, task: UpdateTaskDTO) => void
- onDelete: (id: string) => void

완전한 TaskList.tsx 컴포넌트를 작성해줘.
```

#### 🤖 Cursor 프롬프트 3-6: 필터 바 컴포넌트
```
src/components/FilterBar.tsx에 태스크 필터링을 위한 컴포넌트를 만들어줘.

요구사항:
- React + TypeScript 사용
- Tailwind CSS로 스타일링
- 상태별 필터 (ALL, PENDING, IN_PROGRESS, COMPLETED)
- 우선순위별 필터 (ALL, HIGH, MEDIUM, LOW)
- 검색 입력 필드
- 정렬 옵션 (생성일, 마감일, 우선순위)
- 활성 필터 표시

Props:
- statusFilter: Status | 'ALL'
- priorityFilter: Priority | 'ALL'
- searchTerm: string
- sortBy: string
- onStatusFilterChange: (filter: Status | 'ALL') => void
- onPriorityFilterChange: (filter: Priority | 'ALL') => void
- onSearchChange: (term: string) => void
- onSortChange: (sort: string) => void

완전한 FilterBar.tsx 컴포넌트를 작성해줘.
```

#### 🤖 Cursor 프롬프트 3-7: 메인 App 컴포넌트
```
src/App.tsx를 TaskFlow 애플리케이션의 메인 컴포넌트로 구현해줘.

요구사항:
- React + TypeScript 사용
- Tailwind CSS로 스타일링
- 모든 하위 컴포넌트 조합
- 상태 관리 (필터, 검색, 정렬)
- 반응형 레이아웃 (모바일/데스크톱)
- 로딩/에러 상태 표시
- 헤더와 푸터 포함

레이아웃 구성:
- 헤더: 앱 제목, 다크모드 토글
- 사이드바: TaskForm (데스크톱에서)
- 메인: FilterBar + TaskList
- 모바일: 스택 레이아웃

완전한 App.tsx 컴포넌트를 작성해줘.
```

---

### STEP 4: 테스트 코드

#### 🤖 Cursor 프롬프트 4-1: API 테스트
```
__tests__/api/tasks.test.ts에 태스크 API 엔드포인트 테스트를 작성해줘.

요구사항:
- Jest + Supertest 사용
- 모든 CRUD 엔드포인트 테스트
- 에러 케이스 테스트
- 데이터베이스 목킹
- TypeScript 사용

테스트 케이스:
- GET /api/tasks - 모든 태스크 조회
- POST /api/tasks - 새 태스크 생성
- PUT /api/tasks/:id - 태스크 수정
- DELETE /api/tasks/:id - 태스크 삭제
- 유효성 검사 에러 테스트
- 404 에러 테스트

완전한 테스트 파일을 작성해줘.
```

#### 🤖 Cursor 프롬프트 4-2: 컴포넌트 테스트
```
__tests__/components/TaskList.test.tsx에 TaskList 컴포넌트 테스트를 작성해줘.

요구사항:
- Jest + React Testing Library 사용
- 사용자 상호작용 테스트
- 렌더링 테스트
- 이벤트 핸들러 테스트
- TypeScript 사용

테스트 케이스:
- 태스크 목록 렌더링 확인
- 빈 목록 상태 표시
- 태스크 클릭 시 수정 모드 진입
- 삭제 버튼 클릭 시 확인 다이얼로그
- 상태 변경 버튼 동작
- 우선순위별 색상 표시

완전한 테스트 파일을 작성해줘.
```

---

### STEP 5: 배포 설정

#### 🤖 Cursor 프롬프트 5-1: Docker 설정
```
TaskFlow 애플리케이션을 위한 Docker 설정을 만들어줘.

생성할 파일:
1. backend/Dockerfile - Node.js 백엔드용
2. frontend/Dockerfile - React 프론트엔드용  
3. docker-compose.yml - 전체 스택 오케스트레이션
4. .dockerignore - 제외할 파일들

요구사항:
- Multi-stage 빌드 사용
- 프로덕션 최적화
- 환경 변수 설정
- 볼륨 마운트 설정
- 네트워크 설정

완전한 Docker 설정 파일들을 작성해줘.
```

#### 🤖 Cursor 프롬프트 5-2: 배포 스크립트
```
scripts/deploy.sh에 배포 자동화 스크립트를 만들어줘.

요구사항:
- 백엔드/프론트엔드 빌드
- Docker 이미지 생성
- 데이터베이스 마이그레이션
- 서비스 재시작
- 헬스체크
- 롤백 기능

단계:
1. 빌드 및 테스트
2. Docker 이미지 생성
3. 서비스 배포
4. 데이터베이스 업데이트
5. 헬스체크 수행

완전한 배포 스크립트를 작성해줘.
```

---

## 🎯 실행 가이드

### 1단계: 프로젝트 초기화
```bash
# 프로젝트 폴더 생성
mkdir taskflow-ai-lab && cd taskflow-ai-lab
mkdir backend frontend

# 백엔드 설정
cd backend
npm init -y
npm install express cors prisma @prisma/client
npm install -D typescript @types/node @types/express @types/cors ts-node-dev nodemon

# 프론트엔드 설정
cd ../frontend
npx create-react-app . --template typescript
npm install tailwindcss @tailwindcss/forms axios react-hook-form date-fns
```

### 2단계: Cursor에서 각 프롬프트 실행
1. 백엔드 초기 설정 프롬프트들 실행 (1-1 ~ 1-5)
2. API 서버 구현 프롬프트들 실행 (2-1 ~ 2-6)
3. 프론트엔드 구현 프롬프트들 실행 (3-1 ~ 3-7)
4. 테스트 코드 생성 프롬프트들 실행 (4-1 ~ 4-2)
5. 배포 설정 프롬프트들 실행 (5-1 ~ 5-2)

### 3단계: 실행 및 테스트
```bash
# 백엔드 실행
cd backend
npm run prisma:generate
npm run db:push
npm run dev

# 프론트엔드 실행 (새 터미널)
cd frontend
npm start
```

---

## 📋 실행 체크리스트

### 백엔드 실행
```bash
cd backend
npm install
npm run prisma:generate
npm run db:push
npm run dev
```

### 프론트엔드 실행
```bash
cd frontend
npm install
npm start
```

### 테스트 실행
```bash
# 백엔드 테스트
cd backend && npm test

# 프론트엔드 테스트
cd frontend && npm test
```

### Docker 실행
```bash
docker-compose up --build
```

---

## 🔧 트러블슈팅 가이드

### 자주 발생하는 문제들

1. **Prisma 연결 오류**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

2. **CORS 에러**
   - backend/src/server.ts의 CORS 설정 확인
   - 프론트엔드 포트(3000)가 허용되어 있는지 확인

3. **타입 에러**
   - 백엔드와 프론트엔드의 타입 정의 일치 확인
   - Prisma 스키마 변경 후 재생성 필요

4. **빌드 에러**
   - package.json의 의존성 확인
   - TypeScript 설정 파일 검토

---

## 📝 학습 체크리스트

- [ ] Cursor AI 프롬프트 작성 기법 이해
- [ ] 단계별 개발 프로세스 경험
- [ ] 타입스크립트 기반 풀스택 개발
- [ ] AI 도구를 활용한 코드 생성 및 리팩토링
- [ ] 테스트 코드 작성 자동화
- [ ] 배포 환경 구성

---

## 🔧 추가 개선 과제

1. **인증/권한 시스템 추가**
2. **실시간 알림 기능 구현**
3. **데이터 시각화 대시보드**
4. **모바일 앱 확장**
5. **AI 기반 할일 추천 기능**

이 실습을 통해 AI 도구를 활용한 체계적인 개발 프로세스를 경험할 수 있습니다. 