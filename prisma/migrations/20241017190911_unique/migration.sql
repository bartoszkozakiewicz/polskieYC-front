/*
  Warnings:

  - A unique constraint covering the columns `[localId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_localId_key" ON "User"("localId");
