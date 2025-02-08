/*
  Warnings:

  - You are about to drop the column `name` on the `Class` table. All the data in the column will be lost.
  - You are about to drop the `ClassOnUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Course` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CourseOnUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Lesson` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Level` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LevelOnUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Subcontent` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Class` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `ClassOnUser` DROP FOREIGN KEY `ClassOnUser_classId_fkey`;

-- DropForeignKey
ALTER TABLE `ClassOnUser` DROP FOREIGN KEY `ClassOnUser_userId_fkey`;

-- DropForeignKey
ALTER TABLE `CourseOnUser` DROP FOREIGN KEY `CourseOnUser_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `CourseOnUser` DROP FOREIGN KEY `CourseOnUser_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Lesson` DROP FOREIGN KEY `Lesson_courseId_fkey`;

-- DropForeignKey
ALTER TABLE `LevelOnUser` DROP FOREIGN KEY `LevelOnUser_levelId_fkey`;

-- DropForeignKey
ALTER TABLE `LevelOnUser` DROP FOREIGN KEY `LevelOnUser_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Subcontent` DROP FOREIGN KEY `Subcontent_lessonId_fkey`;

-- DropIndex
DROP INDEX `Class_name_key` ON `Class`;

-- AlterTable
ALTER TABLE `Class` DROP COLUMN `name`,
    ADD COLUMN `FULLSTACK` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `GRAPHIC` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `LIVEMAN` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `MEDIA` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `PHOTO` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `ClassOnUser`;

-- DropTable
DROP TABLE `Course`;

-- DropTable
DROP TABLE `CourseOnUser`;

-- DropTable
DROP TABLE `Lesson`;

-- DropTable
DROP TABLE `Level`;

-- DropTable
DROP TABLE `LevelOnUser`;

-- DropTable
DROP TABLE `Subcontent`;

-- CreateTable
CREATE TABLE `Levels` (
    `id` VARCHAR(191) NOT NULL,
    `photoLevel` INTEGER NOT NULL DEFAULT 0,
    `mediaLevel` INTEGER NOT NULL DEFAULT 0,
    `graphicLevel` INTEGER NOT NULL DEFAULT 0,
    `networkLevel` INTEGER NOT NULL DEFAULT 0,
    `dataLevel` INTEGER NOT NULL DEFAULT 0,
    `liveLevel` INTEGER NOT NULL DEFAULT 0,
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ClassRank` (
    `id` VARCHAR(191) NOT NULL,
    `newbie` BOOLEAN NOT NULL DEFAULT false,
    `senior` BOOLEAN NOT NULL DEFAULT false,
    `classId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Levels` ADD CONSTRAINT `Levels_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Class` ADD CONSTRAINT `Class_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ClassRank` ADD CONSTRAINT `ClassRank_classId_fkey` FOREIGN KEY (`classId`) REFERENCES `Class`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
