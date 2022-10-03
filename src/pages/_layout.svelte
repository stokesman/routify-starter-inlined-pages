<!-- routify:options preload="proximity" -->
<div><slot /></div>

<style>
    div {
        position: relative;
    }

    div :global(.pathy) {
        fill: none;
        stroke: gold;
        stroke-width: 8px;
    }
    
    div :global(.scape) {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        height: 100%;
    }
</style>
