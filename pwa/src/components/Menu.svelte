<script lang="ts">
  import { clickOutside} from "./helpers/clickOutside";
  import { fade } from "svelte/transition";

  let open = false;
</script>

<div class="absolute top-4 left-4 sm:max-w-xl mx-auto">
  <nav id="menu">
    <button
      class="text-gray-500 w-10 h-10 relative rounded-lg bg-white dark:bg-slate-800 focus:ring-4 focus:outline-none"
      on:click={() => (open = !open)}
    >
      <span class="sr-only">Open main menu</span>
      <div
        class="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <span
          aria-hidden="true"
          class={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out" ${
            open ? "rotate-45" : " -translate-y-1.5"
          }`}
        />
        <span
          aria-hidden="true"
          class={`block absolute  h-0.5 w-5 bg-current   transform transition duration-500 ease-in-out" ${
            open ? "opacity-0" : ""
          }`}
        />
        <span
          aria-hidden="true"
          class={`block absolute  h-0.5 w-5 bg-current transform  transition duration-500 ease-in-out" ${
            open ? "-rotate-45" : " translate-y-1.5"
          }`}
        />
      </div>
    </button>
  </nav>
  {#if open}
    <div
      use:clickOutside={"#menu"} on:click_outside={()=>{open = !open}}
      transition:fade
      id="dropdown-menu"
      class="mt-1 w-max z-10 bg-white dark:bg-slate-800 divide-y divide-gray-100 rounded-lg shadow absolute"
    >
      <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
        <li>
            <a
              href="/oukonva/"
              class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >Homepage</a
            >
          </li>
        <li>
          <a
            href="/oukonva/drinks"
            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >Drinks counter</a
          >
        </li>
      </ul>
    </div>
  {/if}
</div>
