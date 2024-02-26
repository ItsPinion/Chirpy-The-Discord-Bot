CREATE TABLE `confessionChannel` (
	`server_id` text PRIMARY KEY NOT NULL,
	`channel_id` text
);
--> statement-breakpoint
ALTER TABLE `Confession` RENAME TO `confession`;