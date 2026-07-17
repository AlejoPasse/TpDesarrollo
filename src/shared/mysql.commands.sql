create DATABASE if not EXISTS gymdb;

use gymdb;

create TABLE if NOT EXISTS `gymdb`.`usuarios` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `password` VARCHAR(255) NULL,
    PRIMARY KEY (`id`));

INSERT into gymdb.usuarios values(1,'Bruno','bruno@gmail.com','54321')