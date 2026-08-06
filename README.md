# CRM-booking

CRM-система для бронирования — учебный проект для практики ручного и автоматизированного тестирования веб-приложений.

## Стек
- **Frontend:** React 19, Vite, React Router
- **Backend:** Node.js, Express, JWT-аутентификация, bcrypt, SQLite
- **API-документация:** Swagger (`/api-docs`)

## Структура
```
client/   — фронтенд (React)
server/   — бэкенд (Express API)
```

## Функциональность
- Регистрация и авторизация пользователей (JWT)
- Защищённый роут / Dashboard

## Запуск локально

Backend:
```bash
cd server
npm install
npm run dev
```

Frontend:
```bash
cd client
npm install
npm run dev
```

### Переменные окружения
`server/.env`:
```
PORT=4000
JWT_SECRET=<ваш секрет>
```

`client/.env`:
```
VITE_API_URL=http://localhost:4000
```

## Назначение
Проект используется как тестовый стенд для отработки QA-навыков: написание тест-кейсов, баг-репортов, data-driven тестирования (см. [login-data-driven.csv](login-data-driven.csv)).
