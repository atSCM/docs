<script context="module">
  export async function preload({ params: { version } }) {
    const topics = await this.fetch(`${version}/docs/toc.json`).then(r => r.json());

    return { topics };
  }
</script>

<script>
  import TableOfContents from './_toc.svelte';

  export let topics;
</script>

<section class="section">
  <div class="container">
    <div class="columns">
      <div class="column">
        <slot />
      </div>
      <div class="column is-3">
        <TableOfContents {topics} />
      </div>
    </div>
  </div>
</section>
