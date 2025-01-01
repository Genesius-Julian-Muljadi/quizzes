# Quizzes Repository

### Quizzes

Project was built using this [Tailwind blog template](https://github.com/timlrx/tailwind-nextjs-starter-blog?tab=readme-ov-file/). Some components were re-done to find for quizzes instead of blogs, but most of the blog code is largely still there.

Project is active on [Vercel](https://quizzes-web.vercel.app/).

### Active Features

- Sign up and Log in
- Supabase database integration
  - Database random populator available in footer

### In-Progress Features

- Take a quiz
- Create quiz
- Quiz history
- Arabic language support

### Technologies

- **Languages**: TypeScript, HTML, CSS (Tailwind CSS)
- **Back-end**: Node.js, Express.js, Prisma, JSON Web Token
- **Front-end**: React, Next.js, Redux, Formik,
- **Database**: Supabase

### Project Setup

- **Prerequisites**

  - TypeScript
  - **Back-end**: Node.js, Express.js
  - **Front-end**: Next.js with React & TypeScript

- **Easy Installation (Run in terminal)**

  - **Back-end**: Run in `./apps/api`.

```bash
    npm init --y
    npm i typescript @types/node ts-node nodemon -D
    npx tsc --init
    npm i dotenv
    npm i express
    npm i @types/express -D
    npm i prisma
    npx prisma init
    npm i @prisma/client
    npm i bcrypt
    npm i -D @types/bcrypt
    npm i jsonwebtoken
    npm i -D @types/jsonwebtoken
    npm i jwt-decode
    npm i cors
    npm i -D @types/cors
    npm i express-validator
    npm i multer
    npm i -D @types/multer
    npm i nodemailer
    npm i @types/nodemailer -D
    npm i handlebars
    npm i helmet
    npm i milliseconds
    npm i -D @types/milliseconds
```

  - **Front-end**: Run in `./apps/web`.

```bash
yarn
```

Please note, that if you are using Windows, you may need to run:

```bash
$env:PWD = $(Get-Location).Path
```

- **Environment Variables**

  - **Back-end**: .env in `./apps/api`.

```bash
SECRET_KEY="I1gbjgmD3CND*"

PORT=8080

BASE_WEB_URL="[Your web URL]"

DATABASE_URL="postgresql://postgres.taxjesxpqilqrayejynf:QuizzesasdQUIWE@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

DIRECT_URL="postgresql://postgres.taxjesxpqilqrayejynf:QuizzesasdQUIWE@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres?connect_timeout=200"
```

  - **Front-end**: .env in `./apps/web`.

```bash
NEXT_PUBLIC_BASE_API_URL=[Your API URL]
NEXT_PUBLIC_BASE_WEB_URL=[Your web URL]
NEXT_PUBLIC_SECRET_KEY=I1gbjgmD3CND*
```
