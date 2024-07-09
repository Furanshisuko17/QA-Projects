/*
  Warnings:

  - You are about to drop the column `description` on the `notes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `notes` DROP COLUMN `description`,
    ADD COLUMN `content` TEXT NULL;
