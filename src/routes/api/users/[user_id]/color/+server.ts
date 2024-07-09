import prisma from "$lib/server/prisma";
import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ params, locals }) => {
  if (!locals.user) error(401, "Unauthorized");

  const { user_id } = params;

  if (!user_id) error(400, "Bad Request: missing user id.");

  const queryResult = await prisma.users.findUnique({
    where: {
      id: user_id
    },
    select: {
      selected_color: true
    }
  });

  if (!queryResult) error(404, "User not found.");

  return json(queryResult);
};

export const PUT: RequestHandler = async ({ params, request, locals }) => {
  if (!locals.user) error(401, "Unauthorized");

  const { user_id } = params;

  if (!user_id) error(400, "Bad Request: missing user id.");

  const { selected_color } = await request.json();

  if (!selected_color) return error(400, "Bad Request: missing color property.");

  const queryResult = await prisma.users.update({
    where: {
      id: user_id
    },
    data: {
      selected_color
    },
    select: {
      selected_color: true
    }
  });

  if (!queryResult) error(404, "User not found.");

  return json(queryResult);
};
