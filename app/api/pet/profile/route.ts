// GET/PUT /api/pet/profile — signed-in member's chihuahua cloud save.
//
// GET  ?known=<version>  → { version, unchanged: true } | { version, envelope | null }
// PUT  { expectedVersion, envelope } → { version } | 409 { version, envelope } | 422 { reason }
//
// Auth required (401). Same origin only (403). Per-account rate limit (429).
// The owner always comes from auth(); a body can never name another account.
// Without DATABASE_URL the endpoint answers 503 and the device copy stays local.

import { Prisma } from "@prisma/client";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { getPetCloudProfile, PetCloudLimiter, putPetCloudProfile } from "@/lib/pet/server/cloud-profile";
import type { PetCloudDeps, PetCloudRepository } from "@/lib/pet/server/cloud-profile";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const limiter = new PetCloudLimiter();
const repository: PetCloudRepository = {
  async findVersion(userId) {
    return (await prisma.petProfile.findUnique({ where: { userId }, select: { version: true } }))?.version ?? null;
  },
  async find(userId) {
    return prisma.petProfile.findUnique({ where: { userId }, select: { document: true, version: true } });
  },
  async create(userId, document) {
    try {
      await prisma.petProfile.create({ data: { userId, document: document as Prisma.InputJsonValue, version: 1 } });
      return true;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") return false;
      throw error;
    }
  },
  async update(userId, expected, document) {
    const result = await prisma.petProfile.updateMany({ where: { userId, version: expected },
      data: { document: document as Prisma.InputJsonValue, version: { increment: 1 } } });
    return result.count === 1;
  },
};
const deps: PetCloudDeps = {
  async userId() { return (await auth())?.user?.id ?? null; },
  repository: () => (process.env.DATABASE_URL ? repository : null),
  now: Date.now,
  limiter,
};

export function GET(request: Request) { return getPetCloudProfile(request, deps); }
export function PUT(request: Request) { return putPetCloudProfile(request, deps); }
