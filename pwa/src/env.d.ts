/// <reference types="astro/client" />
declare namespace svelte.JSX {
    interface HTMLAttributes<T> {
      'on:click_outside': () => void
    }
  }