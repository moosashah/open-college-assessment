CREATE TABLE `collections` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	CONSTRAINT `collections_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `courses` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`duration` int NOT NULL,
	`outcome` text NOT NULL,
	`collection_id` int NOT NULL,
	CONSTRAINT `courses_id` PRIMARY KEY(`id`)
);
