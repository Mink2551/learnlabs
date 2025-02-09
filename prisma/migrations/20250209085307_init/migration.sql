/*
  Warnings:

  - You are about to drop the `UserLessonProgress` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `UserLessonProgress` DROP FOREIGN KEY `UserLessonProgress_lessonId_fkey`;

-- DropForeignKey
ALTER TABLE `UserLessonProgress` DROP FOREIGN KEY `UserLessonProgress_userId_fkey`;

-- DropTable
DROP TABLE `UserLessonProgress`;

-- CreateTable
CREATE TABLE `UserCourseProgress` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `courseId` VARCHAR(191) NOT NULL,
    `progress` DOUBLE NOT NULL DEFAULT 0,
    `completed` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserCourseProgress` ADD CONSTRAINT `UserCourseProgress_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserCourseProgress` ADD CONSTRAINT `UserCourseProgress_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `Course`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
