# Зависимости

Установить зависимости:

```
npm run dev
```

Протестировано на Node v16.15.1

dependencies:
* express
* ejs
* express-ejs-layouts

devDependencies:
* morgan
* nodemon

# Переменные среды

Добавить переменные:
* HOST
* PORT
* NODE_ENV ('development' | 'production')

Или изменить значения в файле ./config/env.js

# Конфигурирование

* Настроить логирование режиме разработки в файле ./config/Logger.js

# Запустить

В режиме разработки:

```
npm run dev
```