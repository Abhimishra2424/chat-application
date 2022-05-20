INSERT INTO
    `chat`.`users` (
        `id`,
        `username`,
        `email`,
        `createdAt`,
        `updatedAt`
    )
VALUES
    (
        '2',
        'sachin',
        'sachin@gmail.com',
        '2015-03-08 02:00:00',
        '2015-03-08 02:00:00'
    );

INSERT INTO
    `messages` (
        `id`,
        `content`,
        `uuid`,
        `from`,
        `to`,
        `createdAt`,
        `updatedAt`
    )
VALUES
    (DEFAULT, ?, ?, ?, ?, ?, ?);

INSERT INTO
    `messages` (
        `id`,
        `content`,
        `uuid`,
        `from`,
        `to`,
        `createdAt`,
        `updatedAt`
    )
VALUES
    (DEFAULT, ?, ?, ?, ?, ?, ?);

es ` AS ` Message ` WHERE ` Message `.`
from
    ` IN ('abhi24', 'abhi2420') AND ` Message `.` to ` IN ('abhi24', 'abhi2420') ORDER BY ` Message `.` createdAt ` DESC;

 SELECT ` id `, ` username `, ` email `, ` password `, ` imageurl `, ` createdAt `, ` updatedAt ` FROM ` users ` AS ` User ` WHERE ` User `.` username ` = 'abhi24';
 SELECT ` id `, ` username `, ` email `, ` password `, ` imageurl `, ` createdAt `, ` updatedAt ` FROM ` users ` AS ` User ` WHERE ` User `.` username ` = 'abhi2420';



 SELECT `id`,
       `content`,
       `uuid`,
       `from`,
       `to`,
       `createdat`,
       `updatedat`
FROM   `messages` AS `Message`
WHERE  ( `Message`.`from` = 'john'
          OR `Message`.`to` = 'john' )
ORDER  BY `Message`.`createdat` DESC; 