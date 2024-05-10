# Используем официальный образ Node.js
FROM node:20

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /usr/src/app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install --legacy-peer-deps

# Копируем все файлы приложения внутрь контейнера
COPY ./src ./src
COPY ./test ./test
COPY ./.eslintrc.js ./.eslintrc.js
COPY ./.prettierrc ./.prettierrc
COPY ./nest-cli.json ./nest-cli.json
COPY ./README.md ./README.md
COPY ./tsconfig.build.json ./tsconfig.build.json
COPY ./tsconfig.json ./tsconfig.json

# Экспортируем порт, который будет использоваться для приложения
EXPOSE 3000

RUN npm run build

# Команда, которая будет исполняться при запуске контейнера
CMD ["npm", "run", "start:debug"]
