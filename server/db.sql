DROP TABLE if exists task;
DROP TABLE if exists account;

CREATE TABLE task (
    id serial primary key,
    description varchar(255) not null
);
CREATE TABLE account (
    id serial primary key,
    email varchar(50) unique not null,
    password varchar(255) not null
);
INSERT into task (description) values ('My test task');
INSERT into task (description) values ('2nd task');

-- SELECT * FROM task
-- SELECT * FROM account