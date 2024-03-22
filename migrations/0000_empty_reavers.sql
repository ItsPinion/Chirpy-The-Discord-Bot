CREATE TABLE `confessionChannel` (
	`server_id` text PRIMARY KEY NOT NULL,
	`channel_id` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `confessionResponses` (
	`response_id` integer PRIMARY KEY NOT NULL,
	`message_id` integer NOT NULL,
	`content` text NOT NULL,
	`response_time` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `confession` (
	`message_id` integer PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`content` text NOT NULL,
	`targeted_user_id` text,
	`server_id` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`user_id` text PRIMARY KEY NOT NULL,
	`balance` integer NOT NULL,
	`last_daily` integer,
	`last_monthly` integer,
	`last_yearly` integer
);
