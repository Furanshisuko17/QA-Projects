import { lucia } from "$lib/server/auth";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { error, type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ resolve, event }) => {
  const sessionId = event.cookies.get(lucia.sessionCookieName);
  if (!sessionId) {
    event.locals.user = null;
    event.locals.session = null;
    return resolve(event);
  }

  try {
    const { session, user } = await lucia.validateSession(sessionId);
    if (session && session.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id);
      event.cookies.set(sessionCookie.name, sessionCookie.value, {
        path: ".",
        ...sessionCookie.attributes
      });
    }
    if (!session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      event.cookies.set(sessionCookie.name, sessionCookie.value, {
        path: ".",
        ...sessionCookie.attributes
      });
    }
    event.locals.user = user;
    event.locals.session = session;
    return resolve(event);
  } catch (err) {
    if (err instanceof PrismaClientKnownRequestError) {
      error(500, err.code);
    } else {
      error(500, "Internal unknown error.");
    }
  }
};
