<script lang="ts">
  import SEO from '../components/SEO.svelte';

  export let status: number;
  export let error: Error;

  function goBack() {
    history.back();
  }

  const dev = process.env.NODE_ENV === 'development';

  const description = status < 500 || dev ? error.message : 'An error ocurred';

  if (dev) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
</script>

<SEO title={status} {description} />

<section class="hero is-fullheight-with-navbar">
  <div class="hero-body">
    <div class="container has-text-centered">
      <h1 class="title">{status}</h1>
      <p class="subtitle">{status < 500 || dev ? error.message : 'An error ocurred'}</p>

      {#if dev && error.stack}
        <div class="content">
          <pre>{error.stack}</pre>
        </div>
      {/if}

      <div class="buttons is-centered">
        <button class="button" on:click={goBack}>Go back</button>
      </div>
    </div>
  </div>
</section>

<style>
  h1 {
    font-size: 2.8em;
    font-weight: 700;
    margin: 0 0 0.5em 0;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }
</style>
