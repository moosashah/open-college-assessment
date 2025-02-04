CREATE TABLE `courses` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`title` varchar(255),
	`description` text,
	`duration` int,
	`outcome` text,
	CONSTRAINT `courses_id` PRIMARY KEY(`id`)
);
