/*
  Warnings:

  - The primary key for the `notes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `notes` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(50)`.

*/
-- AlterTable
ALTER TABLE `notes` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(50) NOT NULL,
    ADD PRIMARY KEY (`id`);
