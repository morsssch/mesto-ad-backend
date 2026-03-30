# Mesto API

Бэкенд для учебного проекта «Mesto» (Яндекс Практикум). Полная обратная совместимость с оригинальным API.

**Стек:** NestJS · TypeScript · PostgreSQL · TypeORM · Docker

---

## Быстрый старт

### 1. Клонировать репо и установить зависимости

```bash
git clone https://github.com/morsssch/mesto-ad-backend.git
cd mesto-ad-backend
npm install
```

### 2. Настроить переменные окружения

Скопируй `.env.example` в `.env` и заполни:

```bash
cp .env.example .env
```

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=твой_пароль
DATABASE_NAME=mesto

USER_TOKEN=придумай_токен
USER_NAME=Имя
USER_ABOUT=Фамилия
USER_AVATAR=https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg
USER_COHORT=cohort-999

ORIGINAL_BASE_URL=https://mesto.nomoreparties.co/v1/твой-cohort
ORIGINAL_TOKEN=твой_токен_от_практикума
```

### 3. Запустить через Docker

```bash
docker compose up --build
```

Сервер запустится на `http://localhost:3000`

### 4. Залить данные с оригинального API

```bash
node scripts/seed.js
```

---

## Эндпоинты

Все запросы требуют заголовок `authorization: <USER_TOKEN>`

### Пользователь

| Метод | URL                | Описание                     |
| ----- | ------------------ | ---------------------------- |
| GET   | `/users/me`        | Получить данные пользователя |
| PATCH | `/users/me`        | Обновить имя и описание      |
| PATCH | `/users/me/avatar` | Обновить аватар              |

### Карточки

| Метод  | URL                    | Описание              |
| ------ | ---------------------- | --------------------- |
| GET    | `/cards`               | Получить все карточки |
| POST   | `/cards`               | Создать карточку      |
| DELETE | `/cards/:cardId`       | Удалить карточку      |
| PUT    | `/cards/likes/:cardId` | Поставить лайк        |
| DELETE | `/cards/likes/:cardId` | Убрать лайк           |

---

## Подключение фронтенда

Замени в своём фронтенде:

```js
const config = {
  baseUrl: 'http://адрес-сервера:3000/v1/cohort-999',
  headers: {
    authorization: 'твой_USER_TOKEN',
    'Content-Type': 'application/json',
  },
};
```

---

## Локальная разработка (без Docker)

```bash
npm run start:dev
```

Требует локально установленный PostgreSQL и созданную базу `mesto`.
