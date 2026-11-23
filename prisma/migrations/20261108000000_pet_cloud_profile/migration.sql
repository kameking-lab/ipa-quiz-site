-- Owner approved the PetProfile schema addition: 2026-11-08 (PET1, chihuahua cloud save).
-- Additive only: one new table. No existing table, column, index or row is changed.
-- CreateTable
CREATE TABLE "PetProfile" (
    "userId" TEXT NOT NULL,
    "document" JSONB NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PetProfile_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "PetProfile" ADD CONSTRAINT "PetProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
