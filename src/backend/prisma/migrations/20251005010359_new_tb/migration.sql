/*
  Warnings:

  - You are about to drop the column `userId` on the `GroupMember` table. All the data in the column will be lost.
  - You are about to drop the column `receiverId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `senderId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the `FriendRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MentorProfile` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MessageRead` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserFollow` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserFriend` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."FriendRequest" DROP CONSTRAINT "FriendRequest_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "public"."FriendRequest" DROP CONSTRAINT "FriendRequest_senderId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Group" DROP CONSTRAINT "Group_createdById_fkey";

-- DropForeignKey
ALTER TABLE "public"."GroupMember" DROP CONSTRAINT "GroupMember_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."MentorProfile" DROP CONSTRAINT "MentorProfile_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Message" DROP CONSTRAINT "Message_receiverId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Message" DROP CONSTRAINT "Message_senderId_fkey";

-- DropForeignKey
ALTER TABLE "public"."MessageRead" DROP CONSTRAINT "MessageRead_messageId_fkey";

-- DropForeignKey
ALTER TABLE "public"."MessageRead" DROP CONSTRAINT "MessageRead_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserFollow" DROP CONSTRAINT "UserFollow_followerId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserFollow" DROP CONSTRAINT "UserFollow_followingId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserFriend" DROP CONSTRAINT "UserFriend_friendId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserFriend" DROP CONSTRAINT "UserFriend_userId_fkey";

-- AlterTable
ALTER TABLE "GroupMember" DROP COLUMN "userId",
ADD COLUMN     "menteeId" TEXT,
ADD COLUMN     "mentorId" TEXT;

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "receiverId",
DROP COLUMN "senderId",
ADD COLUMN     "menteeId" TEXT,
ADD COLUMN     "mentorId" TEXT;

-- DropTable
DROP TABLE "public"."FriendRequest";

-- DropTable
DROP TABLE "public"."MentorProfile";

-- DropTable
DROP TABLE "public"."MessageRead";

-- DropTable
DROP TABLE "public"."User";

-- DropTable
DROP TABLE "public"."UserFollow";

-- DropTable
DROP TABLE "public"."UserFriend";

-- DropEnum
DROP TYPE "public"."RequestStatus";

-- DropEnum
DROP TYPE "public"."Role";

-- CreateTable
CREATE TABLE "Mentor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT,
    "githubId" TEXT NOT NULL,
    "githubName" TEXT,
    "bio" TEXT,
    "avatarUrl" TEXT,
    "skills" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Mentor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mentee" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT,
    "githubId" TEXT NOT NULL,
    "githubName" TEXT,
    "bio" TEXT,
    "avatarUrl" TEXT,
    "skills" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "mentorId" TEXT NOT NULL,

    CONSTRAINT "Mentee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MentorFriend" (
    "id" TEXT NOT NULL,
    "mentorId" TEXT NOT NULL,
    "friendId" TEXT NOT NULL,

    CONSTRAINT "MentorFriend_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Mentor_username_key" ON "Mentor"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Mentor_email_key" ON "Mentor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Mentor_githubId_key" ON "Mentor"("githubId");

-- CreateIndex
CREATE UNIQUE INDEX "Mentee_username_key" ON "Mentee"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Mentee_email_key" ON "Mentee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Mentee_githubId_key" ON "Mentee"("githubId");

-- AddForeignKey
ALTER TABLE "Mentee" ADD CONSTRAINT "Mentee_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "Mentor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "Mentor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_menteeId_fkey" FOREIGN KEY ("menteeId") REFERENCES "Mentee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "Mentor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupMember" ADD CONSTRAINT "GroupMember_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "Mentor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupMember" ADD CONSTRAINT "GroupMember_menteeId_fkey" FOREIGN KEY ("menteeId") REFERENCES "Mentee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MentorFriend" ADD CONSTRAINT "MentorFriend_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "Mentor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MentorFriend" ADD CONSTRAINT "MentorFriend_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "Mentor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
