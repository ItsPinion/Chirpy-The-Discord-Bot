CREATE TABLE `confessionChannel` (
	`server_id` text PRIMARY KEY NOT NULL,
	`channel_id` text NOT NULL
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
CREATE TABLE `storyChannel` (
	`server_id` text PRIMARY KEY NOT NULL,
	`channel_id` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `storyContributions` (
	`contribution_id` integer PRIMARY KEY NOT NULL,
	`story_id` text NOT NULL,
	`contributor_id` text NOT NULL,
	`content` text NOT NULL,
	`contributed_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `story` (
	`story_id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`created_at` integer NOT NULL,
	`created_by` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `users` (
	`user_id` text PRIMARY KEY NOT NULL,
	`balance` integer NOT NULL,
	`last_daily` integer,
	`last_monthly` integer,
	`last_yearly` integer
);
--> statement-breakpoint
CREATE TABLE `welcome` (
	`server_id` text PRIMARY KEY NOT NULL,
	`channel_id` text,
	`role_id` text
);
