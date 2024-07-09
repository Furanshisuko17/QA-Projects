import prisma from "$lib/server/prisma";
import { error, json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export const GET: RequestHandler = async ({ params, locals }) => {
  if (!locals.user) error(401, "Unauthorized");

  const { note_id } = params;

  if (!note_id) error(400, "Bad Request: missing note id.");

  const queryResult = await prisma.notes.findUnique({
    where: { id: note_id },
    select: { id: true, color: true, content: true, created_at: true, title: true }
  });

  if (!queryResult) error(404, "Note not found.");

  return json(queryResult);
};

export const POST: RequestHandler = async ({ request, locals, params }) => {
  if (!locals.user) error(401, "Unauthorized");

  const { note_id } = params;

  if (!note_id) error(400, "Bad Request: missing note id.");

  type Note = {
    title: string;
    content: string;
    created_at: Date;
    color: string;
    user_id: string;
  };

  const { title, content, created_at, color, user_id }: Note = await request.json();

  const queryResult = await prisma.notes.create({
    data: {
      id: note_id,
      title,
      content,
      created_at,
      color,
      user: user_id
    }
  });
  return json(queryResult, {
    status: 201,
    statusText: `New empty note created successfully.`
  });
};

export const PUT: RequestHandler = async ({ request, params, locals }) => {
  if (!locals.user) error(401, "Unauthorized");

  const { note_id } = params;

  if (!note_id) error(400, "Bad Request: missing note id.");

  type Note = {
    title: string;
    content: string;
    created_at: Date;
    color: string;
    user_id: string;
  };

  const { title, content, created_at, color }: Note = await request.json();

  const queryResult = await prisma.notes.update({
    where: { id: note_id },
    data: {
      title,
      content,
      created_at,
      color
    }
  });

  return json(queryResult, {
    status: 200,
    statusText: `Note edited successfully.`
  });
};

export const DELETE: RequestHandler = async ({ params, locals }) => {
  if (!locals.user) error(401, "Unauthorized");

  const { note_id } = params;

  if (!note_id) error(400, "Bad Request: missing note id.");

  try {
    await prisma.notes.delete({
      where: { id: note_id }
    });
    return new Response(null, { status: 200, statusText: "Note deleted successfully." });
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      error(404, "Note not found");
    } else {
      error(500, "Internal Server Error");
    }
  }
};
