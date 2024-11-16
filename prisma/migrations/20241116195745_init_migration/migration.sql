-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "hasAccess" BOOLEAN NOT NULL DEFAULT false,
    "credentials" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3),
    "lastLogin" TIMESTAMP(3),
    "localId" TEXT,
    "customerId" TEXT,
    "priceId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_localId_key" ON "User"("localId");

-- CreateIndex
CREATE UNIQUE INDEX "User_customerId_key" ON "User"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "Document_path_key" ON "Document"("path");

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("localId") ON DELETE RESTRICT ON UPDATE CASCADE;
