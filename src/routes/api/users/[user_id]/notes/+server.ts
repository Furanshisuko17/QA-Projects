import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import prisma from "$lib/server/prisma";

export const GET: RequestHandler = async ({ params, locals }) => {
  if (!locals.user) error(401, "Unauthorized");

  const { user_id } = params;

  if (!user_id) error(400, "Bad Request");

  const queryResponse = await prisma.notes.findMany({
    where: { user: user_id },
    select: {
      id: true,
      title: true,
      content: true,
      created_at: true,
      color: true
    }
  });

  return json(queryResponse, {
    status: 200
  });
};
