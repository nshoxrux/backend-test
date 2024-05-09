# Запуск программы 

1. Прежде чем запустить программу необходимо убедиться что запушены следующие сервисы:
- Node
- POSTGRES
- REDIS

2. Создать БД в POSTGRES и таблицу users с такими даннными:
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    balance INT
);

3. Необходимо создать .env файл в корневой папке и добавить следующие данные:
DB_USERNAME=dbusername
DB_HOST=dbhost
DB_NAME=dbname
DB_PASSWORD=dbpassword
DB_PORT=dbport
REDIS_PORT=redisport
REDIS_HOST=redishost
APP_PORT=4000
SHOP_URL=https://api.skinport.com/v1/items

Необходимо настроить данные под себя кроме SHOP_URL

4. Установить зависимости спомощью команды "npm install" в терминале в корневой папке
5. Скомпилировать проект спомощью команды "npm run build" и запустить программу "npm run start"
6. В файле requests.http описаны все маршруты сервера