# lodge-portal

## Проект за споделена библиотека на Ложа "Петър Дънов" №80

### Структура

#### База данни

* СУБД: MariaDB
* Таблици:
    i. users
    i.i.    id          : int(10), primary key, auto increment
    i.ii.    user        : varchar(50)
    i.iii.    password    : varchar(200)
    i.iv.    name        : varchar(50), allow NULL
    i.v.    email       : varchar(50), allow NULL
    i.vi.    last_login  : varchar(50), allow NULL
    ii. Messages
    ii.i.    msgID       : int(10), primary key, auto increment
    ii.ii.    langID      : int(10)
    ii.iii.    msgKey      : varchar(50)
    ii.iv.    message     : varchar(200), allow NULL

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
