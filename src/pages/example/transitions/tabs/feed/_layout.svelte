<style>
  main {
    background: #0bf5cc;
    height: 100%;
  }
  * :global(.card) {
    background: white;
    width: 256px;
    height: 256px;
    display: inline-block;
    box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    margin: 24px;
  }
  main > :global(.transition) {
      overflow: auto;
      position: absolute;
      bottom: 0;
      top: 0;
  }
</style>

<!-- routify:options index=1 -->
<main>
  <slot />
</main>
