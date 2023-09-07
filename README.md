# lodge-portal

## Проект за споделена библиотека на Ложа "Петър Дънов" №80

### Структура

#### База данни

* СУБД: MariaDB
* Таблици:
    1. users
        1.    id          : int(10), primary key, auto increment
        2.    user        : varchar(50)
        3.    password    : varchar(200)
        4.    name        : varchar(50), allow NULL
        5.    email       : varchar(50), allow NULL
        6.    last_login  : varchar(50), allow NULL
    2. Messages
        1.    msgID       : int(10), primary key, auto increment
        2.    langID      : int(10)
        3.    msgKey      : varchar(50)
        4.    message     : varchar(200), allow NULL

#### Бекенд

Node.js Express базирано API. Има следните точки за достъп:

* [POST] /register
* [POST] /login
* [GET] /files
* [GET] /files/:name
* [POST] /upload

#### Фронтенд

React.JS, използва Axios за заявки към API


#### Предвидени функционалности

* Различни нива на достъп на потребителите
* Автоматизирано преименуване на файловете при качване; закодиране в името на файла на параметри като необходимо ниво на достъп, заглавие, автор и др. 
* Сортиране и филтриране на файловете спрямо закодираните в името им параметри
