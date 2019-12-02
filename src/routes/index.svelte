<script>
  import { description } from '../content/texts';
  import SEO from '../components/SEO.svelte';
</script>

<SEO title="atscm – {description}" addName={false} {description} />

<section class="hero is-fullheight-with-navbar">
  <div class="hero-body">
    <div class="container has-text-centered">
      <h1 class="title">atscm</h1>
      <p class="subtitle">{description}</p>

      <div class="buttons is-centered">
        <a href="latest" class="button is-link">Documentation</a>
      </div>
    </div>
  </div>
</section>

<!-- <section class="section">
  <div class="container">
    <div class="columns">
      <div class="column">
        <a href="latest/manual/get-started" class="box content">
          <h2 class="title is-5">Get started with atscm</h2>
          <p>Learn how to create and setup a new atvise project with atscm.</p>
        </a>
      </div>
      <div class="column">
        <a href="latest/manual/get-started" class="box content">
          <h2 class="title is-5">Migrate to atscm</h2>
          <p>Learn how to setup an existing project with atscm.</p>
        </a>
      </div>
    </div>
  </div>
</section> -->

<!-- Additional routes to export -->
<div style="display: none">
  <a href="search-index.json">Search index</a>
  <a href="from-cli/?version=export">From CLI</a>
</div>
