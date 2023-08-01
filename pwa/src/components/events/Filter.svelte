<script lang="ts">
  export let filter: string = "";
  export let events: any[] = [];
  let dropdown: any = null;
  const places: any[] = [...new Set(events.map((event) => event.place))];

  const select = (place: string) => {
    dropdown.classList.toggle("hidden");
    filter = place;
  };
</script>

<button
  id="dropdownDefaultButton"
  on:click={() => dropdown.classList.toggle("hidden")}
  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  type="button"
  >{filter !== "" ? filter : "All places"}
  <svg
    class="w-2.5 h-2.5 ml-2.5"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 10 6"
  >
    <path
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="m1 1 4 4 4-4"
    />
  </svg></button
>
<!-- Dropdown menu -->
<div
  id="dropdown"
  bind:this={dropdown}
  class="w-max z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 absolute"
>
  <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
    <li>
      <button
        on:click={() => select("")}
        class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
        >All places</button
      >
    </li>
    {#each places as place}
      <li>
        <button
          on:click={() => select(place)}
          class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >{place}</button
        >
      </li>
    {/each}
  </ul>
</div>
