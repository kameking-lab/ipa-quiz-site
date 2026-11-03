CREATE TABLE "StudyPresence" (
    "id" TEXT NOT NULL,
    "lastSeenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "StudyPresence_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "StudyPresence_lastSeenAt_idx" ON "StudyPresence"("lastSeenAt");
