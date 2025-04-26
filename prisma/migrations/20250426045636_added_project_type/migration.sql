-- CreateEnum
CREATE TYPE "ProjectType" AS ENUM ('none', 'weekend', 'advance');

-- AlterTable
ALTER TABLE "SingleProject" ADD COLUMN     "projectType" "ProjectType" NOT NULL DEFAULT 'none';
