import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import prisma from "$lib/server/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const PATCH: RequestHandler = async ({ params, request, locals }) => {
  if (!locals.user) error(401, "Unauthorized");

  const { note_id } = params;
  if (!note_id) return error(400, "Bad Request: missing note id.");

  const { title } = await request.json();
  if (!title) return error(400, "Bad Request: missing title property.");

  try {
    const queryResponse = await prisma.notes.update({
      where: { id: note_id },
      data: {
        title
      },
      select: {
        title: true
      }
    });
    return json(queryResponse, {
      status: 200,
      statusText: "Note title updated successfully."
    });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      error(404, "Note not found.");
    } else {
      error(500, "Internal Server Error");
    }
  }
};
