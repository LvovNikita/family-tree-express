# Редактор генеалогических деревьев (в разработке)

## Требования

Протестировано на:

* NodeJS v16.15.1
* MongoDB v4.4.14

## Зависимости

Установка зависимостей:

```
npm install
```

dependencies:
* ejs
* express
* express-ejs-layouts
* moment
* mongoose
* swagger-ui-express

devDependencies:
* eslint
* morgan
* nodemon

# Переменные окружения

Добавить переменные:
* HOST
* PORT
* MIN_USER_PASSWORD_LENGTH
* MIN_USERNAME_LENGTH
* NODE_ENV ('development' | 'production')

Или изменить значения в файле ./config/env.js

# Конфигурирование

* Настроить логирование в режиме разработки в файле ./config/Logger.js

# Сущности

* User — пользователь
* Tree — генеалогическое древо
* Person — листья древа

# Запуск

В режиме разработки:

```
npm run dev
```

# Тестирование

SwaggerUI в режиме разработки:
* /api/docs