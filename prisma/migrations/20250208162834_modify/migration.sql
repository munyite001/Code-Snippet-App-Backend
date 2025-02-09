/*
  Warnings:

  - You are about to drop the `user_snippets` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `snippets` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "user_snippets" DROP CONSTRAINT "user_snippets_snippet_id_fkey";

-- DropForeignKey
ALTER TABLE "user_snippets" DROP CONSTRAINT "user_snippets_user_id_fkey";

-- AlterTable
ALTER TABLE "snippets" ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "user_snippets";
