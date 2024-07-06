import prisma from "$lib/server/prisma";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ locals }) => {
  if (!locals.user) redirect(302, "/login");
  return {
    username: (await locals.user).username
  };

  const response = await prisma.notes;
  return {};
}) satisfies PageServerLoad;
