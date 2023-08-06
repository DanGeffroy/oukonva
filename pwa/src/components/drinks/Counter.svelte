<script>
  import Alert from "./Alert.svelte";
  import Waves from "./Waves.svelte";
  let count = JSON.parse(localStorage.getItem("count") || "0");
  window.addEventListener("storage", (event) => {
    count = JSON.parse(event.newValue);
  });
  $: {
    localStorage.setItem("count", JSON.stringify(count));
  }
  document.getElementById("splash-screen")?.classList.toggle("hidden");
  document.getElementById("header-title")?.classList.toggle("hidden");

  const resetDrinks = () => {
    if (window.confirm("Do you really want to reset your drinks?")) {
      count = 0;
    }
  };
</script>

<Waves {count} />

<div class="w-full box-border max-w-7xl xl:mx-auto mt-4 flex">
  <div class="w-1/2 pl-10 pr-5">
    <button
      class="py-3 px-4 w-full block bg-slate-100 dark:bg-slate-700 text-center rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition ease-in-out delay-75"
      on:click={() => count--}>Remove drink -</button
    >
  </div>
  <div class="w-1/2 pl-5 pr-10">
    <button
      class="py-3 px-4 w-full block bg-slate-100 dark:bg-slate-700 text-center rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition ease-in-out delay-75"
      on:click={() => count++}>Add drink +</button
    >
  </div>
</div>

<div class="w-full flex">
  <span class="text-4xl m-auto mt-52">
    {count >= 0
      ? `${count} Drink${count > 1 ? "s" : ""}`
      : `lost ${count} Drink${count < -1 ? "s" : ""}`}
  </span>
</div>
<Alert {count} />

<button
  class="py-3 px-4 fixed bottom-4 right-4 block bg-slate-100 dark:bg-slate-700 text-center rounded-lg font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition ease-in-out delay-75"
  on:click={() => resetDrinks()}>Reset drinks</button
>
