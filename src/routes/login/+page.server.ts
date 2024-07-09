import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { generateIdFromEntropySize } from "lucia";
import prisma from "$lib/server/prisma";
import { lucia } from "$lib/server/auth";

export const load = (async () => {
  return {};
}) satisfies PageServerLoad;

export const actions: Actions = {
  default: async (event) => {
    const formData = await event.request.formData();
    const username = formData.get("username") as string;
    if (
      typeof username !== "string" ||
      username.length < 3 ||
      username.length > 31 ||
      !/^[a-zA-Z0-9_-]+$/.test(username)
    ) {
      return fail(400, {
        error: "Invalid username."
      });
    }

    const user = await prisma.users.findUnique({
      where: { username: username }
    });

    if (user) {
      const session = await lucia.createSession(user.id, {
        logged_at: new Date()
      });
      const sessionCookie = lucia.createSessionCookie(session.id);
      event.cookies.set(sessionCookie.name, sessionCookie.value, {
        path: ".",
        ...sessionCookie.attributes
      });
    } else {
      const userId = generateIdFromEntropySize(10);
      await prisma.users.create({
        data: {
          id: userId,
          username: username,
          selected_color: "slate",
          created_at: new Date()
        }
      });
      const session = await lucia.createSession(userId, {
        logged_at: new Date()
      });
      const sessionCookie = lucia.createSessionCookie(session.id);
      event.cookies.set(sessionCookie.name, sessionCookie.value, {
        path: ".",
        ...sessionCookie.attributes
      });
    }
    redirect(302, "/app");
  }
};
