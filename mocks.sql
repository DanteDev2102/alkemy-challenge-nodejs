use disney;

insert into characters (name,age,history,picture)
values ('aladin',22,'cualquier historia posible','http://localhost:3001/files/default.png'),
       ('gruñon',100,'cualquier historia posible','http://localhost:3001/files/default.png'),
       ('tontin',50,'cualquier historia posible','http://localhost:3001/files/default.png'),
       ('bestia',31,'cualquier historia posible','http://localhost:3001/files/default.png'),
       ('bella',25,'cualquier historia posible','http://localhost:3001/files/default.png'),
       ('hada madrina',78,'cualquier historia posible','http://localhost:3001/files/default.png'),
       ('jasmin',18,'cualquier historia posible','http://localhost:3001/files/default.png');

insert into genders (name,picture)
values ('aventura','http://localhost:3001/files/default.png'),
       ('romance','http://localhost:3001/files/default.png'),
       ('infantil','http://localhost:3001/files/default.png');

insert into movies (title,picture,creation_date,score,gender_id)
values ('aladin','http://localhost:3001/files/default.png','1980-08-12',4,1),
       ('la bella y la bestia','http://localhost:3001/files/default.png','1991-11-13',2,2),
       ('cenicienta','http://localhost:3001/files/default.png','1950-04-04',5,2),
       ('la bella durmiente','http://localhost:3001/files/default.png','1959-01-29',3,3);
       
insert into `character-movies` (character_id,movie_id)
values (1,1), (2,2),(3,2),(4,2),(5,2),(6,3),(7,1);




