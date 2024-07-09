import prisma from "$lib/server/prisma";
import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { lucia } from "$lib/server/auth";

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) redirect(302, "/login");
  const id = (await locals.user).id;
  const response = await prisma.users.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      created_at: true,
      selected_color: true,
      notes: {
        select: {
          id: true,
          title: true,
          content: true,
          created_at: true,
          color: true
        },
        orderBy: {
          created_at: "asc"
        }
      }
    }
  });

  return { response };
};

export const actions: Actions = {
  logout: async (event) => {
    if (!event.locals.session) {
      return fail(401);
    }
    await lucia.invalidateSession(event.locals.session.id);
    const sessionCookie = lucia.createBlankSessionCookie();
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: ".",
      ...sessionCookie.attributes
    });
    redirect(302, "/login");
  }
};
