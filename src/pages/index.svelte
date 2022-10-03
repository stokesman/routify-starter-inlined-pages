<script>
    import { metatags } from '@roxi/routify'
    import Plotscape from '../lib/components/plotscape.svelte'
    
    metatags.title = 'My Routify app'
    metatags.description = 'Description coming soon...'
    
    let dot;
    let distance;

	function travel(to) {
        distance = to
	}
</script>

<Plotscape
    class="scape"
    plots={{
        motionPath: ['h1', [.90, .2], [.66, 1.1], [.33, 1.12], 'h2 [ndex="1"]', 'h2 [ndex="2"]']
    }}
    let:motionPath
>
<path d={motionPath} class="pathy"/>
<circle
    bind:this={dot}
    r="10"
    style:offset-path={`path('${ motionPath }')`}
    style:offset-distance={`${ distance }%`}
    style:transition="offset-distance ease 987ms"
/>
</Plotscape>
<h1 on:mouseover={() => travel(0)}>Routify Repro Attempt</h1>

<p>
    Meant to test a lack of onMount cleanup from a sub-component when changing pages. Failure to reproduce as of yet.
</p>

<h2 on:mouseover={() => travel(100)}>
    <span ndex="1"/>Moar pages<span ndex="2"/>
</h2>
<a href="./one">One</a>

<style>
 h2 > span {
     display: inline-block;
     transform: translateY(200%);
 }
</style>