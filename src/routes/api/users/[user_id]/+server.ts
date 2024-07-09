import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import prisma from "$lib/server/prisma";

export const GET: RequestHandler = async ({ params, locals }) => {
  if (!locals.user) error(401, "Unauthorized");

  const { user_id } = params;

  if (!user_id) error(400, "Bad Request: missing user id.");

  const queryResult = await prisma.users.findUnique({
    where: {
      id: user_id
    }
  });

  if (!queryResult) error(404, "User not found.");

  return json(queryResult);
};
