/*
  Warnings:

  - Made the column `title` on table `notes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `notes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `color` on table `notes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `content` on table `notes` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `notes` MODIFY `title` TINYTEXT NOT NULL,
    MODIFY `created_at` TIMESTAMP(0) NOT NULL,
    MODIFY `color` TINYTEXT NOT NULL,
    MODIFY `content` TEXT NOT NULL;
