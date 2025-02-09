/*
  Warnings:

  - You are about to drop the `_tagsTousers` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId]` on the table `tags` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `tags` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_tagsTousers" DROP CONSTRAINT "_tagsTousers_A_fkey";

-- DropForeignKey
ALTER TABLE "_tagsTousers" DROP CONSTRAINT "_tagsTousers_B_fkey";

-- DropIndex
DROP INDEX "tags_name_key";

-- AlterTable
ALTER TABLE "tags" ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_tagsTousers";

-- CreateIndex
CREATE UNIQUE INDEX "tags_userId_key" ON "tags"("userId");
