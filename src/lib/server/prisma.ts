import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  errorFormat: "pretty"
});

export default prisma;

export const adapter = new PrismaAdapter(prisma.sessions, prisma.users);
