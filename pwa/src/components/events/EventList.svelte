<script lang="ts">
  import Event from "./Event.svelte";
  import Filter from "./Filter.svelte";
  import { fetchFromLambda } from "./storagge";
  let events: any[] = [];

  const promise = fetchFromLambda();
  promise.then((e) => (events = e));
  let filter = "";
  $: filteredEvents =
    filter !== "" ? events.filter((e) => e.place === filter) : events;
</script>

{#await promise then}
  <div class="max-w-7xl mx-4 flex flex-row-reverse xl:mx-auto">
    <Filter {events} bind:filter />
  </div>
  <div class="flex">
    <div
      class="box-border max-w-7xl mx-4 sm:columns-1 md:columns-2 lg:columns-3 xl:mx-auto xl:columns-3 mt-4"
    >
      {#each filteredEvents as event}
        <Event {event} />
      {/each}
    </div>
  </div>
{:catch error}
  <p style="text-red-200">{error.message}</p>
{/await}
