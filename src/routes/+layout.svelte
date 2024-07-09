<script>
  import "../app.css";
  import { Toaster, toast } from "svelte-sonner";
</script>

<Toaster richColors closeButton visibleToasts={6} position="bottom-left" />

<main class="font-sans">
  <slot />
</main>
