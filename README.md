# GasTop

اپلیکیشن ارزیابی ریسک آتش‌سوزی و تخلیه، ساخته‌شده با Next.js (App Router) و Prisma/PostgreSQL. برای مدیریت کاربران از Better Auth و افزونه Admin استفاده شده است.

## امکانات
- احراز هویت با ایمیل/رمز عبور، نقش‌ها و پنل مدیریت.
- پنل مدیریت (`/admin`): لیست کاربران با جستجو/صفحه‌بندی، قفل/آزادسازی (ban/unban) و حذف با حذف آبشاری.
- دامنه اصلی: پروژه‌ها، طبقات و ارزیابی‌ها با فاکتورهای قابل‌قبول و حفاظتی (W/N/S/F/U/Y و ...).
- رابط کاربری روشن/تاریک و TypeScript در کل پروژه.

## پشته فناوری
- Next.js (App Router)، React، TypeScript
- Prisma + PostgreSQL
- Better Auth + افزونه Admin
- استایل‌دهی با Tailwind و ابزارهای CSS

## ساختار پروژه (نمای کلی)
```
src/
├─ app/
│  ├─ admin/                     # پنل مدیریت
│  ├─ api/
│  │  └─ admin/users[...]        # APIهای مدیریت کاربران
│  └─ (سایر مسیرها)
├─ components/
│  ├─ admin/                     # UI مدیریت (UserList, AddUserForm)
│  └─ protection-level/...       # کامپوننت‌های ریسک/حفاظت
├─ lib/
│  ├─ auth.ts / auth-server.ts   # تنظیمات Better Auth و session
│  ├─ admin.ts                   # helpers مربوط به مدیریت
│  ├─ db.ts                      # Prisma client
│  └─ assessment/...             # سرویس‌ها و ابزارهای ارزیابی
├─ prisma/
│  └─ schema.prisma              # اسکیما دیتابیس
└─ public/                       # فایل‌های استاتیک
```

### توضیح جزئی‌تر ساختار
- `src/app/` مسیرهای اصلی اپلیکیشن با App Router است. هر فولدر معادل یک مسیر URL است و فایل‌های `page.tsx` صفحه نهایی را رندر می‌کنند.
- `src/app/api/` مسیرهای API سروری هستند که فقط روی سرور اجرا می‌شوند. اینجا عملیات مدیریتی کاربران انجام می‌شود (لیست، قفل، حذف).
- `src/components/` کامپوننت‌های قابل‌استفاده مجدد UI قرار دارند؛ بخش‌های تخصصی محاسبه ریسک/حفاظت نیز اینجا تفکیک شده‌اند.
- `src/lib/` شامل منطق زیرساختی است:
  - `auth.ts` و `auth-server.ts`: تنظیمات Better Auth و گرفتن session سمت سرور.
  - `admin.ts`: توابع کمکی مدیریت مثل تشخیص ادمین و ساخت کاربر.
  - `db.ts`: اتصال Prisma و دسترسی به دیتابیس.
  - `assessment/...`: سرویس‌ها و مدل‌ها برای ایجاد/ویرایش/محاسبه ارزیابی‌ها.
- `prisma/` شامل `schema.prisma` (تعریف مدل‌ها و روابط) و فایل‌های migration است.
- `public/` فایل‌های استاتیک مثل تصاویر و آیکن‌ها را نگه می‌دارد.

### جزییات `src/app/api/user/projects`
این مسیرها APIهای مربوط به پروژه/طبقه/ارزیابی را برای کاربر لاگین‌شده فراهم می‌کنند. هر فایل یک Route Handler سروری است و خطاها را با پاسخ JSON برمی‌گرداند.

```
src/app/api/user/projects/
├─ route.ts
├─ [projectId]/route.ts
├─ [projectId]/floors/route.ts
├─ [projectId]/floors/[floorId]/route.ts
└─ [projectId]/floors/[floorId]/assessment/route.ts
```

- `route.ts`: 
  - `POST` → ساخت پروژه جدید (استفاده از `createProjectController`).
  - `GET` → دریافت تمام پروژه‌های کاربر (استفاده از `getAllProjectsController`).
- `[projectId]/route.ts`:
  - `GET` → دریافت یک پروژه مشخص.
  - `PUT` → ویرایش پروژه.
  - `DELETE` → حذف پروژه.
- `[projectId]/floors/route.ts`:
  - `GET` → دریافت تمام طبقات یک پروژه.
  - `POST` → ساخت طبقه جدید برای پروژه.
- `[projectId]/floors/[floorId]/route.ts`:
  - `GET` → دریافت یک طبقه.
  - `PUT` → ویرایش طبقه.
  - `DELETE` → حذف طبقه.
- `[projectId]/floors/[floorId]/assessment/route.ts`:
  - `GET` → دریافت ارزیابی طبقه.
  - `PUT` → به‌روزرسانی یا ایجاد ارزیابی (upsert).
  - `DELETE` → حذف ارزیابی (ابتدا از `floorId`، `assessmentId` پیدا می‌شود).

### جزییات `src/lib`
این پوشه منطق اصلی بک‌اند، لایه‌ی سرویس و کنترلرها، و تعریف‌های داده را نگه می‌دارد.

```
src/lib/
├─ admin.ts
├─ APIResponseInterfaces.ts
├─ auth.ts
├─ auth-client.ts
├─ auth-server.ts
├─ db.ts
├─ password.ts
├─ utils.ts
├─ assessment/
│  ├─ model/Assessment.ts
│  ├─ utils/flattenAssessment.ts
│  ├─ service/AssessmentCalculationService.ts
│  ├─ service/CreateAssessmentService.ts
│  ├─ service/GetAssessmentService.ts
│  ├─ service/UpdateAssessmentService.ts
│  ├─ service/DeleteAssessmentService.ts
│  └─ controller/
│     ├─ CreateAssessmentController.ts
│     ├─ GetAssessmentController.ts
│     ├─ UpdateAssessmentController.ts
│     └─ DeleteAssessmentController.ts
├─ floor/
│  ├─ model/Floor.ts
│  ├─ service/CreateFloorService.ts
│  ├─ service/GetFloorService.ts
│  ├─ service/UpdateFloorService.ts
│  ├─ service/DeleteFloorService.ts
│  └─ controller/
│     ├─ CreateFloorController.ts
│     ├─ GetFloorController.ts
│     ├─ UpdateFloorController.ts
│     └─ DeleteFloorController.ts
└─ project/
   ├─ model/Project.ts
   ├─ service/CreateProjectService.ts
   ├─ service/GetProjectService.ts
   ├─ service/UpdateProjectService.ts
   ├─ service/DeleteProjectService.ts
   └─ controller/
      ├─ CreateProjectController.ts
      ├─ GetProjectController.ts
      ├─ UpdateProjectController.ts
      └─ DeleteProjectController.ts
```

#### فایل‌های پایه
- `db.ts`: اتصال Prisma با آداپتر `@prisma/adapter-pg` و استفاده از `DATABASE_URL`.
- `auth.ts`: پیکربندی Better Auth با Prisma adapter و پلاگین‌های admin/next cookies.
- `auth-client.ts`: کلاینت احراز هویت سمت React با `NEXT_PUBLIC_BETTER_AUTH_URL`.
- `auth-server.ts`: گرفتن session سمت سرور با عبور دادن کوکی‌ها.
- `password.ts`: هش کردن/اعتبارسنجی رمز با `scrypt` مطابق فرمت Better Auth.
- `admin.ts`: ساخت کاربر (user + account) و بررسی نقش ادمین.
- `utils.ts`: تابع `cn` برای کلاس‌های Tailwind و اعتبارسنجی UUID.
- `APIResponseInterfaces.ts`: اینترفیس‌های پاسخ API برای پروژه/طبقه/ارزیابی.

#### لایه ارزیابی (`assessment/`)
- `model/Assessment.ts`: 
  - اسکیماهای Zod برای ورودی‌های ارزیابی.
  - تعریف نوع‌ها برای ورودی سرویس و خروجی محاسبات.
  - جلوگیری از ارسال فیلدهای محاسباتی توسط کاربر.
- `utils/flattenAssessment.ts`: 
  - تبدیل ساختار رابطه‌ای Prisma (risk/acceptance/protection/final) به خروجی یک‌پارچه برای API.
- `service/AssessmentCalculationService.ts`:
  - پیاده‌سازی همه فرمول‌های FRAME و ضرایب (q,i,g,e,v,z,a,t,c,r,d,W,N,S,F,U,Y,...) با منطق کامل.
  - تولید ریسک‌های نهایی و وضعیت‌ها (`Acceptable`, `Needs Improvement`, `Unacceptable`).
- `service/CreateAssessmentService.ts`:
  - اعتبار مالکیت floor، محاسبه همه فاکتورها، ساخت رکوردهای مربوطه در یک تراکنش.
- `service/GetAssessmentService.ts`:
  - بررسی مالکیت floor و برگرداندن ارزیابی با تمام روابط و خروجی flatten شده.
- `service/UpdateAssessmentService.ts`:
  - ادغام ورودی جدید با داده‌های موجود، محاسبه دوباره همه فاکتورها،
    و upsert برای جداول مرتبط (risk/acceptance/protection/final).
- `service/DeleteAssessmentService.ts`:
  - بررسی مالکیت و حذف ارزیابی.
- `controller/*AssessmentController.ts`:
  - اعتبارسنجی session و UUID،
  - parse و validate ورودی با Zod،
  - فراخوانی سرویس و پاسخ JSON مناسب.

#### لایه طبقه (`floor/`)
- `model/Floor.ts`:
  - اسکیماهای Zod برای ایجاد/ویرایش طبقه و تعریف نوع‌های سرویس.
- `service/CreateFloorService.ts`:
  - ساخت floor با بررسی وجود پروژه.
- `service/GetFloorService.ts`:
  - دریافت یک طبقه یا همه طبقات با بررسی مالکیت پروژه.
- `service/UpdateFloorService.ts`:
  - به‌روزرسانی محدود به فیلدهای ارسال‌شده و بررسی مالکیت.
- `service/DeleteFloorService.ts`:
  - حذف floor با بررسی مالکیت پروژه.
- `controller/*FloorController.ts`:
  - لایه کنترلر API برای CRUD طبقات با session/UUID/Zod.

#### لایه پروژه (`project/`)
- `model/Project.ts`:
  - اسکیماهای Zod برای ایجاد/ویرایش پروژه و تعریف نوع‌های سرویس.
- `service/CreateProjectService.ts`:
  - ایجاد پروژه برای کاربر لاگین‌شده.
- `service/GetProjectService.ts`:
  - دریافت یک پروژه یا لیست همه پروژه‌های کاربر.
- `service/UpdateProjectService.ts`:
  - ویرایش پروژه با بررسی مالکیت.
- `service/DeleteProjectService.ts`:
  - حذف پروژه با بررسی مالکیت.
- `controller/*ProjectController.ts`:
  - کنترلرهای API برای CRUD پروژه با session/UUID/Zod.

## متغیرهای محیطی
فایل `.env` بسازید:
```
DATABASE_URL=postgresql://user:pass@host:5432/db
BETTER_AUTH_SECRET=your-secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
```

## راه‌اندازی محلی
```bash
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
# سپس http://localhost:3000
```

## اجرای تولیدی با Docker
```bash
docker compose build
docker compose up -d
```

## پنل مدیریت و APIها
- رابط: `src/app/admin/page.tsx` شامل `UserList` و `AddUserForm`.
- لیست کاربران: `GET /api/admin/users` → واسط `auth.api.listUsers` با جستجو/limit/offset/sort و حذف کاربران admin از نتیجه.
- قفل/آزادسازی: `POST/DELETE /api/admin/users/[id]/lock` → `auth.api.banUser` / `auth.api.unbanUser` (عدم اجازه روی admin و خود کاربر).
- حذف: `DELETE /api/admin/users/[id]` → `auth.api.removeUser` با حذف آبشاری داده‌ها.
- محافظت مسیرها: همه APIهای مدیریت نیاز به session و `isAdmin(session.user.id)` دارند.

## اسکریپت‌ها
- `npm run dev` – اجرای توسعه
- `npm run build` – ساخت تولیدی
- `npm run start` – اجرای تولیدی
- `npm run lint` – ESLint

## نکات
- کاربران admin در لیست نمایش داده نمی‌شوند و قابل ban/delete نیستند.
- فراخوانی‌های Better Auth نیاز به کوکی session دارند؛ مسیرهای سرور آن‌ها را پاس می‌دهند.
- حذف آبشاری بر اساس روابط Prisma پیاده شده است (Projects/Floors/Assessments).

## مرجع
- Better Auth Admin plugin: https://www.better-auth.com/docs/plugins/admin
