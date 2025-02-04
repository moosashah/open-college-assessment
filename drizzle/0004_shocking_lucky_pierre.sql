ALTER TABLE `courses` MODIFY COLUMN `owner_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `role` enum('USER','ADMIN') NOT NULL DEFAULT 'USER';