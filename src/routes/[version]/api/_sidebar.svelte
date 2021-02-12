<script>
  export let apiLink;
  export let folders = [];
</script>

<aside class="menu toc">
  {#each folders as { items, dirname } (dirname)}
    <p class="menu-label">{dirname}</p>
    <ul class="menu-list">
      {#each items as item}
        <li>
          <a href={apiLink(item)}>
            <span
              class="tag"
              class:is-success={item.kind === 'class'}
              class:is-link={item.kind === 'variable'}
              class:is-warning={item.kind === 'function'}>
              {item.kind.slice(0, 1)}
            </span>
            <span class="space" />
            <span>&nbsp;{item.name}</span>
          </a>
        </li>
      {/each}
    </ul>
  {/each}
</aside>

<style>
  .menu-list li a {
    display: flex;
    align-items: center;
    line-height: 1;
  }
  .menu-list li a .space {
    width: 1em;
  }
</style>
