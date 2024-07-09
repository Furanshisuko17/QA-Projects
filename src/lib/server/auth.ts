import { Lucia } from "lucia";
import { adapter } from "./prisma";

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: false
    }
  },
  getUserAttributes: async (user) => {
    return {
      id: user.id
    };
  }
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
    DatabaseSessionAttributes: DatabaseSessionAttributes;
  }
}

interface DatabaseUserAttributes {
  id: string;
}
interface DatabaseSessionAttributes {
  logged_at: Date;
}
