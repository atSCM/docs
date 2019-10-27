<script>
  import { slide } from 'svelte/transition';

  export let summary;

  let open = true;
</script>

<style>
  .details-content {
    overflow: hidden;
  }
</style>

<div class="details">
  <p class="button summary" on:click|preventDefault={() => (open = !open)}>
    <slot name="summary" {open}>{summary}</slot>
  </p>

  {#if open}
    <div class="details-content" transition:slide|local>
      <slot />
    </div>
  {/if}
</div>
