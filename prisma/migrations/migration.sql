-- CreateTable
CREATE TABLE `notes` (
    `id` VARCHAR(50) NOT NULL,
    `title` TINYTEXT NOT NULL,
    `content` TEXT NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL,
    `color` TINYTEXT NOT NULL,
    `user` VARCHAR(50) NOT NULL,

    INDEX `fk_notes_users`(`user`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(50) NOT NULL,
    `username` VARCHAR(100) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT (now()),
    `selected_color` TINYTEXT NOT NULL,

    UNIQUE INDEX `unq_users_username`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sessions` (
    `id` VARCHAR(50) NOT NULL,
    `user_id` VARCHAR(50) NULL,
    `expires_at` TIMESTAMP(0) NULL,
    `logged_at` TIMESTAMP(0) NULL,

    INDEX `fk_sessions_users`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `notes` ADD CONSTRAINT `fk_notes_users` FOREIGN KEY (`user`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `sessions` ADD CONSTRAINT `fk_sessions_users` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

