<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  let show = false;

  onMount(() => {
    show = sessionStorage.getItem('cookiesAccepted') !== 'true';
  });

  function accept() {
    sessionStorage.setItem('cookiesAccepted', 'true');
    show = false;
  }
</script>

{#if show}
  <div class="box notification cookie-notice is-light is-flex-desktop is-size-7" transition:fade>
    <div class="text">
      <strong>Cookies:</strong>
      This site uses cookies. Cookies store your preferred settings and other information that will help
      us improve our service. By using our website, you agree to the use of cookies.
    </div>
    <button class="button is-dark is-small" type="submit" on:click={accept}>
      Close and accept
    </button>
  </div>
{/if}

<style>
  .cookie-notice {
    position: fixed;
    left: 5px;
    bottom: 5px;
    right: 5px;
    align-items: center;
    text-align: right;
    z-index: 1000;
    padding: 0.75rem 1rem;
    overflow: hidden;
  }

  .text,
  .button {
    margin: 0.5em;
    text-align: left;
  }

  .text {
    flex: 1;
  }
</style>
