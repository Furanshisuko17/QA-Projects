// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      user: import("lucia").User | null;
      session: import("lucia").Session | null;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}
// declare module "@fortawesome/pro-solid-svg-core/index.es" {
//   export * from "@fortawesome/pro-solid-svg-core";
// }
export {};
