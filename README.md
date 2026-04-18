# Open Page Frontend

front end для соседнего backend-репозитория `OpenPage-Backend`

## Запуск

```bash
npm install
npm run dev
```

Локально: `http://localhost:7070`

## Переменные

- `VITE_BACKEND_URL` - backend для Vite proxy в разработке
- `VITE_API_BASE_URL` - базовый URL API для production-сборки

По умолчанию backend ожидается на `http://localhost:8000`

## Проверка

```bash
npm run lint
npm run build
```

## Docker

```bash
docker build --build-arg VITE_API_BASE_URL=http://localhost:8000/api -t open-page-frontend .
docker compose up --build
```

Docker: `http://localhost:7070`
