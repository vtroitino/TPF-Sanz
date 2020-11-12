CREATE TABLE users(
   id INT PRIMARY KEY NOT NULL,
   usuario VARCHAR(200) NOT NULL,
   email VARCHAR(200) NOT NULL,
   contraseña VARCHAR(200) NOT NULL,
   saldo INT NOT NULL
);

CREATE TABLE terrenos(
   id INT PRIMARY KEY NOT NULL,
   terreno VARCHAR(200) NOT NULL,
   user_id INT
);

INSERT INTO terrenos(id, terreno) VALUES('1', 'Copernicus');
INSERT INTO terrenos(id, terreno) VALUES('2', 'Kepler');
INSERT INTO terrenos(id, terreno) VALUES('3', 'Langrenus');
INSERT INTO terrenos(id, terreno) VALUES('4', 'Stevinus');
INSERT INTO terrenos(id, terreno) VALUES('5', 'Oceanus Procellarum');
INSERT INTO terrenos(id, terreno) VALUES('6', 'Eduardo Castex');