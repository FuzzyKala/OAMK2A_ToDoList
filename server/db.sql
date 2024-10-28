CREATE TABLE task (
    id serial primary key,
    description varchar(255) not null
)
INSERT into task (description) values ('My test task');
INSERT into task (description) values ('2nd task');