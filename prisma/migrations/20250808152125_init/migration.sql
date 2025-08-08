-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'OPENED', 'COMPLETED');

-- CreateTable
CREATE TABLE "Envelope" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "originalKey" TEXT NOT NULL,
    "signedKey" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "openedAt" TIMESTAMP(3),
    "openedIp" TEXT,
    "openedUa" TEXT,
    "completedAt" TIMESTAMP(3),
    "completedIp" TEXT,
    "completedUa" TEXT,
    "sha256" TEXT,
    "consent" BOOLEAN NOT NULL DEFAULT false,
    "auditTrailUrl" TEXT,

    CONSTRAINT "Envelope_pkey" PRIMARY KEY ("id")
);

