<script lang="ts">
  import { fade, slide } from "svelte/transition";
  export let event: any;
</script>

<article
  transition:slide|local
  class="mb-4 break-inside-avoid-column p-6 rounded-xl bg-white dark:bg-slate-800 flex flex-col bg-clip-border"
>
  <h2 class="text-3xl font-extrabold pb-4">{event.title}</h2>
  <div class="flex pb-4 items-center justify-between">
    <div class="flex">
      <div class="flex flex-col">
        <div class="flex items-center">
          <p class="inline-block text-lg font-bold mr-2">{event.place}</p>
        </div>
        <div class="text-slate-500 dark:text-slate-300">{event.date?`${event.date.slice(8,10)}/${event.date.slice(5, 7)}`:''} {event.time?event.time:''}</div>
      </div>
    </div>
  </div>
  
  <div class="pb-2">
    <p>{event.artiste || event.price}</p>
  </div>
  <div class="w-full">
    <a
      href={event.link}
      class="py-3 px-4 w-full block bg-slate-100 dark:bg-slate-700 text-center rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition ease-in-out delay-75"
      >Event link</a
    >
  </div>
</article>
