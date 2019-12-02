<script>
  import { stores } from '@sapper/app';
  import { exactVersion } from './_helpers.js';

  export let segment;

  const { page } = stores();

  $: displayedVersion = exactVersion($page.params.version);
</script>

{#if $page.query.requested && $page.query.requested !== displayedVersion}
  <div class="message-section">
    <div class="container">
      <div class="message is-danger">
        <div class="message-body">
          <div class="level">
            <div class="level-left">
              <p>
                The exact version you requested couldn't be found. Showing
                <em>{displayedVersion}</em>
                instead.
              </p>
            </div>
            <div class="level-right">
              <div class="buttons is-right">
                {#if $page.params.version !== 'latest'}
                  <a href="latest/{segment || ''}" class="button is-text">Show latest instead</a>
                {/if}

                <a href={$page.path} class="button is-danger is-light" sapper-noscroll>Okay</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<slot />
