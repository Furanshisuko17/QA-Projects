/*
  Warnings:

  - Made the column `user` on table `notes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `username` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `notes` DROP FOREIGN KEY `fk_notes_users`;

-- AlterTable
ALTER TABLE `notes` MODIFY `user` VARCHAR(50) NOT NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `username` VARCHAR(100) NOT NULL,
    MODIFY `created_at` TIMESTAMP(0) NOT NULL DEFAULT (now());

-- AddForeignKey
ALTER TABLE `notes` ADD CONSTRAINT `fk_notes_users` FOREIGN KEY (`user`) REFERENCES `users`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
