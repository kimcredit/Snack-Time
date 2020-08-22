DROP DATABASE IF EXISTS snacks_db;
CREATE DATABASE snacks_db;

USE snacks_db;

CREATE TABLE snacks (
    id INT AUTO_INCREMENT NOT NULL,
    category VARCHAR(255) NOT NULL,
    snack VARCHAR (255) NOT NULL,
    devoured BOOLEAN DEFAULT false,
    PRIMARY KEY (id)
);