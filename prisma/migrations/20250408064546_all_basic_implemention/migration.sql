-- CreateEnum
CREATE TYPE "InternshipOrJob" AS ENUM ('internship', 'job');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "pfp" TEXT NOT NULL,
    "oneLiner" TEXT,
    "location" TEXT,
    "whatworkingrn" TEXT,
    "internshipOrJob" "InternshipOrJob" NOT NULL,
    "projectsNum" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Social" (
    "id" TEXT NOT NULL,
    "linkedIn" TEXT,
    "github" TEXT,
    "twitter" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Social_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectUser" (
    "id" TEXT NOT NULL,
    "projectname" TEXT NOT NULL,
    "isDiscordConnected" BOOLEAN NOT NULL DEFAULT false,
    "isTwitterShared" BOOLEAN NOT NULL DEFAULT false,
    "current" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "ProjectUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "projectUserId" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SingleProject" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "oneLiner" TEXT NOT NULL,
    "discordRole" TEXT NOT NULL,
    "twitterMessage" TEXT NOT NULL,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "normalImg" TEXT NOT NULL,
    "activeImg" TEXT NOT NULL,
    "projectSlug" TEXT NOT NULL,
    "stepsLength" INTEGER NOT NULL,

    CONSTRAINT "SingleProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Step" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,

    CONSTRAINT "Step_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StepItem" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "sourceUrl" TEXT NOT NULL,
    "requirementMessage" TEXT NOT NULL,
    "stepId" TEXT NOT NULL,

    CONSTRAINT "StepItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "bgImage" TEXT NOT NULL,
    "userPfp" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tag" TEXT NOT NULL,
    "cardImage" TEXT NOT NULL,
    "markdownUrl" TEXT NOT NULL,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Social_userId_key" ON "Social"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "SingleProject_projectSlug_key" ON "SingleProject"("projectSlug");

-- AddForeignKey
ALTER TABLE "Social" ADD CONSTRAINT "Social_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectUser" ADD CONSTRAINT "ProjectUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_projectUserId_fkey" FOREIGN KEY ("projectUserId") REFERENCES "ProjectUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Step" ADD CONSTRAINT "Step_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "SingleProject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StepItem" ADD CONSTRAINT "StepItem_stepId_fkey" FOREIGN KEY ("stepId") REFERENCES "Step"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
