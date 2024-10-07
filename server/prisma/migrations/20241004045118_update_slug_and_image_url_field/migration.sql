/*
  Warnings:

  - You are about to drop the column `featuredImageUrl` on the `Post` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Post_slug_key";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "featuredImageUrl",
ADD COLUMN     "ImageUrl" TEXT[];
