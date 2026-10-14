create DATABASE if not EXISTS gymdb;

use gymdb;

create TABLE if NOT EXISTS `gymdb`.`usuarios` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL,
    `contraseña` VARCHAR(255) NULL,
    PRIMARY KEY (`id`));

INSERT INTO usuarios (id, name, email, password) VALUES (1, 'seba', 'seba@gmail.com', 'Seba/334');

create TABLE if NOT EXISTS `gymdb`.`rutinas` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) NULL,
    `descripcion` VARCHAR(255) NULL,
    `nivel` VARCHAR(255) NULL,
    PRIMARY KEY (`id`));

create TABLE if NOT EXISTS `gymdb`.`ejercicios` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) NULL,
    `descripcion` VARCHAR(255) NULL,
    `notas` VARCHAR(255) NULL,
    PRIMARY KEY (`id`));


create TABLE if NOT EXISTS `gymdb`.`clases` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) NULL,
    `horario` TIME NULL,
    `cupos` INT(255) NULL,
    PRIMARY KEY (`id`));

create TABLE if NOT EXISTS `gymdb`.`tipoMembresias` (
    `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) NULL,
    `descripcion` VARCHAR(255) NULL,
    PRIMARY KEY (`id`));

create TABLE if NOT EXISTS `gymdb`.`precioTipoMembresias` (
    `tipoMembresiaId` INT UNSIGNED NOT NULL,
    `fechaDesde` DATE NOT NULL,
    `fechaHasta` DATE NOT NULL,
    `valor` DECIMAL(10,2) NOT NULL,

    PRIMARY KEY (tipoMembresiaId, fechaDesde),

    FOREIGN KEY (tipoMembresiaId) REFERENCES TipoMembresias(id));

create TABLE if NOT EXISTS `gymdb`.`Asistencia` (
    `UsuarioId` INT UNSIGNED NOT NULL,
    `fechaAsistencia` INT UNSIGNED NOT NULL,

    PRIMARY KEY (usuarioId, fechaAsistencia),

    FOREIGN KEY (usuarioId) REFERENCES Usuarios(id));

create TABLE if NOT EXISTS `gymdb`.`rutina-ejercicio` (
    `ejercicioId` INT UNSIGNED NOT NULL,
    `rutinaId` INT UNSIGNED NOT NULL,
    `series` INT NULL,
    `repeticiones` INT NULL,

    PRIMARY KEY (ejercicioId, rutinaId),

    FOREIGN KEY (rutinaId) REFERENCES rutinas(id),
    FOREIGN KEY (ejercicioId) REFERENCES ejercicios(id));   

create TABLE if NOT EXISTS `gymdb`.`cliente-rutina` (
    `clienteId` INT UNSIGNED NOT NULL,
    `rutinaId` INT UNSIGNED NOT NULL,
    `series` INT NULL,
    `repeticiones` INT NULL,

    PRIMARY KEY (clienteId, rutinaId),

    FOREIGN KEY (rutinaId) REFERENCES rutinas(id),
    FOREIGN KEY (clienteId) REFERENCES usuarios(id));   

create TABLE if NOT EXISTS `gymdb`.`admin-rutina` (
    `adminId` INT UNSIGNED NOT NULL,
    `rutinaId` INT UNSIGNED NOT NULL,

    PRIMARY KEY (adminId, rutinaId),

    FOREIGN KEY (rutinaId) REFERENCES rutinas(id),
    FOREIGN KEY (adminId) REFERENCES usuarios(id));  

create TABLE if NOT EXISTS `gymdb`.`admin-ejercicio` (
    `adminId` INT UNSIGNED NOT NULL,
    `ejercicioId` INT UNSIGNED NOT NULL,

    PRIMARY KEY (ejercicioId, adminId),

    FOREIGN KEY (ejercicioId) REFERENCES ejercicios(id),
    FOREIGN KEY (adminId) REFERENCES usuarios(id)); 

create TABLE if NOT EXISTS `gymdb`.`admin-clases` (
    `adminId` INT UNSIGNED NOT NULL,
    `claseId` INT UNSIGNED NOT NULL,

    PRIMARY KEY (claseId, adminId),

    FOREIGN KEY (claseId) REFERENCES clases(id),
    FOREIGN KEY (adminId) REFERENCES usuarios(id)); 

create TABLE if NOT EXISTS `gymdb`.`membresia-ciente` (
    `membresiaId` INT UNSIGNED NOT NULL,
    `clienteId` INT UNSIGNED NOT NULL,

    PRIMARY KEY (clienteId, membresiaId),

    FOREIGN KEY (clienteId) REFERENCES usuarios(id),
    FOREIGN KEY (membresiaId) REFERENCES tipoMembresias(id)); 

create TABLE if NOT EXISTS `gymdb`.`inscripciones` (
    `claseId` INT UNSIGNED NOT NULL,
    `clienteId` INT UNSIGNED NOT NULL,
    `estadoInscripcion` VARCHAR(255) NULL,

    PRIMARY KEY (claseId, clienteId),

    FOREIGN KEY (clienteId) REFERENCES usuarios(id),
    FOREIGN KEY (claseId) REFERENCES clases(id)); 
