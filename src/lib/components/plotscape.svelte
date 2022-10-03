<script context="module">
  import { toPath } from '../catmull-rom-rreusser'

  // const dotMap = new WeakMap;
  // const plotPoints = (svg, points) => {
  //   const dot = document.createElementNS(svg.namespaceURI, 'circle');
  //   let dotList
  //   if (dotMap.has(svg)){
  //     dotList = dotMap.get(svg);
  //     for (const aDot of dotList) svg.removeChild(aDot);
  //   }
  //   dotList = [];
  //   for (const [x, y] of points) {
  //     const aDot = dot.cloneNode();
  //     aDot.setAttribute('cx', x);
  //     aDot.setAttribute('cy', y);
  //     aDot.setAttribute('r', 5);
  //     aDot.setAttribute('fill', 'deeppink');
  //     svg.appendChild(aDot);
  //     dotList.push(aDot);
  //   }
  //   dotMap.set(svg, dotList);
  // }

  const resolvePath = (node, plot) => {
    const points = [];
    const doc = node.ownerDocument;
    const { x: xOffset, y: yOffset, width, height } = node.getBoundingClientRect();
    for (const item of plot)
      if (typeof item === 'string') {
        const plotNode = doc.querySelector(item);
        // Existence must be checked because these elements may be outside of
        // the parent component and may be unavailable.
        if (plotNode) {
          const { x, y } = plotNode.getBoundingClientRect();
          points.push([x - xOffset, y - yOffset])
        }
      } else {
        const [x, y] = item;
        points.push([x * width, y * height])
      }
    points.push(points.at(-1))
    // console.log({points});
    // plotPoints(node.ownerSVGElement, points);
    return toPath(points);
  }

  const scapeMap = new Map;
  let sizeObserver
  if ('ResizeObserver' in window)
    sizeObserver = new ResizeObserver(entries => {
      for (const { target } of entries) {
        const { onResolve, plots } = scapeMap.get(target)
        const paths = {};
        for (const [name, plot] of Object.entries(plots))
          paths[name] = resolvePath( target, plot );
        onResolve(paths);
      }
    })
</script>

<script>
  import { onMount } from 'svelte';

  let plots;
  let classProp;
  export { classProp as class, plots };

  let extent;
  let paths;

  onMount(() => {
    if (!sizeObserver) return;
    scapeMap.set(extent, {
      plots,
      onResolve: pathList => { paths = pathList },
    });
    sizeObserver.observe(extent);
    return () => {
      console.log('DSTROY!!!!!', sizeObserver, extent);
      sizeObserver.unobserve(extent)
    }
  })
</script>

<svg class={classProp}>
  <rect bind:this={extent} width="100%" height="100%" fill="none"/>
  <slot {...paths}/>
</svg>

<style>
    svg {
        overflow: visible;
    }
</style>