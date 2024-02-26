CREATE TABLE `user` (
	`user_id` text PRIMARY KEY NOT NULL,
	`balance` integer,
	`last_daily` integer,
	`last_monthly` integer,
	`last_yearly` integer
);
--> statement-breakpoint
CREATE TABLE `Confession` (
	`message_id` integer PRIMARY KEY NOT NULL,
	`user_id` text,
	`content` text,
	`targeted_user_id` text,
	`server_id` text
);
--> statement-breakpoint
CREATE TABLE `confessionResponses` (
	`response_id` integer PRIMARY KEY NOT NULL,
	`message_id` integer,
	`content` text,
	`response_time` integer
);
