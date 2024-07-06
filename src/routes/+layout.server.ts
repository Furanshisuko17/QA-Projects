import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load = (async ({ url }) => {
  if (url.pathname === "/") {
    //TODO: Check if logged
    redirect(308, "/app");
  }
  return {};
}) satisfies LayoutServerLoad;
