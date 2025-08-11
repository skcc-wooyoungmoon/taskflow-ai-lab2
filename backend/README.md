# TaskFlow Backend

TaskFlow 프로젝트의 백엔드 API 서버입니다.

## 프로젝트 구조

```
taskflow-backend/
├── src/
│   ├── server.ts          # Express 서버 메인 파일
│   ├── types/
│   │   └── task.ts        # Task 관련 타입 정의
│   ├── routes/
│   │   └── tasks.ts       # Task 라우터
│   ├── controllers/
│   │   └── taskController.ts  # Task 컨트롤러
│   ├── services/
│   │   └── taskService.ts     # Task 비즈니스 로직
│   ├── middleware/
│   │   └── errorHandler.ts    # 에러 핸들러
│   └── utils/
│       └── validation.ts      # 유효성 검사 유틸리티
├── prisma/
│   └── schema.prisma      # Prisma 스키마
├── package.json
├── tsconfig.json
└── .env                   # 환경 변수 (생성 필요)
```

## 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경 변수 설정
`.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/taskflow_db"

# JWT Configuration (for future authentication)
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d
```

### 3. 데이터베이스 설정
```bash
# Prisma 클라이언트 생성
npm run prisma:generate

# 데이터베이스 마이그레이션
npm run prisma:migrate
```

### 4. 개발 서버 실행
```bash
npm run dev
```

## API 엔드포인트

### Tasks
- `GET /api/tasks` - 모든 태스크 조회
- `GET /api/tasks/:id` - 특정 태스크 조회
- `POST /api/tasks` - 새 태스크 생성
- `PUT /api/tasks/:id` - 태스크 수정
- `DELETE /api/tasks/:id` - 태스크 삭제

## 스크립트

- `npm run dev` - 개발 서버 실행 (ts-node-dev)
- `npm run build` - TypeScript 컴파일
- `npm run start` - 프로덕션 서버 실행
- `npm run test` - 테스트 실행
- `npm run prisma:generate` - Prisma 클라이언트 생성
- `npm run prisma:migrate` - 데이터베이스 마이그레이션
- `npm run prisma:studio` - Prisma Studio 실행 