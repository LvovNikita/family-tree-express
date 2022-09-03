# Зависимости

Установить зависимости:

```
npm run dev
```

Протестировано на Node v16.15.1

dependencies:
* ejs
* express
* express-ejs-layouts
* swagger-ui-express

devDependencies:
* eslint
* morgan
* nodemon

# Переменные среды

Добавить переменные:
* HOST
* PORT
* MIN_USER_PASSWORD_LENGTH
* MIN_USERNAME_LENGTH
* NODE_ENV ('development' | 'production')

Или изменить значения в файле ./config/env.js

# Конфигурирование

* Настроить логирование в режиме разработки в файле ./config/Logger.js

# Запустить

В режиме разработки:

```
npm run dev
```

# Тестирование

SwaggerUI в режиме разработки:
* /api/docs

