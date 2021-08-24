

CREATE DATABASE Persevere;

USE Persevere;

CREATE TABLE `instructor` (
	`instructor_id` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`instructor_email` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`instructor_name` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`instructor_class` VARCHAR(50) NOT NULL DEFAULT 'Please Update' COLLATE 'latin1_swedish_ci',
	`instructor_password` VARCHAR(250) NOT NULL COLLATE 'latin1_swedish_ci',
	PRIMARY KEY (`instructor_id`) USING BTREE,
	INDEX `instructor_email` (`instructor_email`) USING BTREE
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
;

CREATE TABLE `daily_agenda` (
	`id` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`number` INT(11) NOT NULL AUTO_INCREMENT,
	`agenda` VARCHAR(10000) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	`date` VARCHAR(50) NOT NULL DEFAULT '' COLLATE 'latin1_swedish_ci',
	`time` VARCHAR(50) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `number` (`number`) USING BTREE
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
AUTO_INCREMENT=29
;

CREATE TRIGGER before_insert_Persevere
BEFORE INSERT ON Instructor 
FOR EACH ROW
SET new.instructor_id = REPLACE(UUID(),'-','');

CREATE TABLE `instructor_email_table` (
	`id` BIGINT(20) NOT NULL AUTO_INCREMENT,
	`sender_email` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`reciever_email` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`email_subject` VARCHAR(50) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	`body` TEXT(65535) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	`created_at` TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
	`attachment_ref` VARCHAR(200) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	`content_type` VARCHAR(150) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `FK_I_Email_Reciever` (`reciever_email`) USING BTREE,
	CONSTRAINT `FK_I_Email_Reciever` FOREIGN KEY (`reciever_email`) REFERENCES `persevere`.`instructor` (`instructor_email`) ON UPDATE RESTRICT ON DELETE CASCADE
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
;

CREATE TABLE `student` (
	`id` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`first_name` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`last_name` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`ref_number` VARCHAR(10) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	`Password` VARCHAR(250) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	`student_email` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`created_at` TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
	`updated_at` TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
	`is_active` TINYINT(1) NULL DEFAULT '1',
	`grade` INT(11) NULL DEFAULT '100',
	`bunk_space` VARCHAR(15) NULL DEFAULT 'Please Update' COLLATE 'latin1_swedish_ci',
	`co_three` VARCHAR(20) NULL DEFAULT 'Please Update' COLLATE 'latin1_swedish_ci',
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `student_email` (`student_email`) USING BTREE
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
;


CREATE TABLE `student_email_table` (
	`id` BIGINT(20) NOT NULL AUTO_INCREMENT,
	`sender_email` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`reciever_email` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`email_subject` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`body` TEXT(65535) NOT NULL COLLATE 'latin1_swedish_ci',
	`created_at` TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
	`attachment_ref` VARCHAR(200) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	`content_type` VARCHAR(150) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `FK_Email_Reciever` (`reciever_email`) USING BTREE,
	CONSTRAINT `FK_Email_Reciever` FOREIGN KEY (`reciever_email`) REFERENCES `persevere`.`student` (`student_email`) ON UPDATE RESTRICT ON DELETE CASCADE
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
;

CREATE TABLE `reportcard` (
	`id` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`student_id` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`instructor_name` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`report` TEXT(65535) NOT NULL COLLATE 'latin1_swedish_ci',
	`Rating` INT(11) NOT NULL DEFAULT '1',
	`points_possible` INT(11) NOT NULL DEFAULT '1',
	`grade` INT(11) NOT NULL DEFAULT '100',
	`created_at` TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `FK_reportcard_student` (`student_id`) USING BTREE,
	CONSTRAINT `FK_reportcard_student` FOREIGN KEY (`student_id`) REFERENCES `persevere`.`student` (`id`) ON UPDATE RESTRICT ON DELETE CASCADE
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
;


CREATE TABLE `todolist` (
	`id` VARCHAR(50) NOT NULL COLLATE 'latin1_swedish_ci',
	`number` INT(11) NOT NULL AUTO_INCREMENT,
	`task` VARCHAR(10000) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	`date` VARCHAR(50) NOT NULL DEFAULT '' COLLATE 'latin1_swedish_ci',
	`time` VARCHAR(50) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	`student_id` VARCHAR(50) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	`is_done` TINYINT(1) NULL DEFAULT '1',
	`created_at` TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
	`updated_at` TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `number` (`number`) USING BTREE,
	INDEX `FK_todolist_student` (`student_id`) USING BTREE,
	CONSTRAINT `FK_todolist_student` FOREIGN KEY (`student_id`) REFERENCES `persevere`.`student` (`id`) ON UPDATE RESTRICT ON DELETE CASCADE
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
AUTO_INCREMENT=29
;

CREATE TABLE `videolib` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`description` VARCHAR(200) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	`category` VARCHAR(20) NOT NULL COLLATE 'latin1_swedish_ci',
	`ref` VARCHAR(50) NULL DEFAULT NULL COLLATE 'latin1_swedish_ci',
	`name` VARCHAR(100) NULL DEFAULT NULL,
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='latin1_swedish_ci'
ENGINE=InnoDB
;

CREATE TRIGGER before_insert_student
BEFORE INSERT ON Student 
FOR EACH ROW
SET new.id = REPLACE(UUID(),'-','');

CREATE TRIGGER before_insert_reportcard
BEFORE INSERT ON reportcard 
FOR EACH ROW
SET new.id = REPLACE(UUID(),'-','');

CREATE TRIGGER before_insert_daily_agenda
BEFORE INSERT ON daily_agenda 
FOR EACH ROW
SET new.id = REPLACE(UUID(),'-','');

CREATE TRIGGER before_insert_todolist
BEFORE INSERT ON todolist 
FOR EACH ROW
SET new.id = REPLACE(UUID(),'-','');

INSERT INTO Instructor (instructor_name, instructor_email, instructor_password) VALUES ('Marco Pipes', 'Pipes@perseverenow.org', '$2a$10$9dh1cIelCd9CynZaocnEOem4/nkw0P/yW/KyzCBchxjiM6Jpk2BKm');

INSERT INTO Instructor (instructor_name, instructor_email, instructor_password) VALUES ('Austin Hill', 'Hill@perseverenow.org', '$2a$10$9dh1cIelCd9CynZaocnEOem4/nkw0P/yW/KyzCBchxjiM6Jpk2BKm');

INSERT INTO Instructor (instructor_name, instructor_email, instructor_password) VALUES ('Zach Hossman', 'Zach@perseverenow.org', '$2a$10$9dh1cIelCd9CynZaocnEOem4/nkw0P/yW/KyzCBchxjiM6Jpk2BKm');

INSERT INTO Instructor (instructor_name, instructor_email, instructor_password) VALUES ("O'Conner", 'Oconner@perseverenow.org', '$2a$10$9dh1cIelCd9CynZaocnEOem4/nkw0P/yW/KyzCBchxjiM6Jpk2BKm');

