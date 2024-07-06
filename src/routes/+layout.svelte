<script>
  import "../app.css";
  import { Toaster, toast } from "svelte-sonner";
</script>

<Toaster richColors closeButton visibleToasts={6} />

<main class="bg-slate-200 font-sans">
  <slot />
</main>
