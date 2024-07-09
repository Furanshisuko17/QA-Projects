import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load = (async ({ url, locals }) => {
  if (!locals.user && url.pathname !== "/login") redirect(302, "/login");
  if (url.pathname === "/") {
    redirect(308, "/app");
  }
  return {};
}) satisfies LayoutServerLoad;
