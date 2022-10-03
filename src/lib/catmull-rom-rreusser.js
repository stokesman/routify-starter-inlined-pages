// Pared-down from:
// https://github.com/rreusser/demos/blob/master/catmull-rom/index.js

const CatmullRomExp = 0.5; // Uniform=0, Centripetal=0.5, 'Chordal'=1

/**
 * @param pList {[number,number][]} Points of the path
 * @param curviness {number} Extent of the curve between points. Default is 1
 * and larger numbers may produce overshooting loops.
 */
export const toPath = (pList, curviness = 1) => {
  if (pList.length < 3) return `M${pList.join("L")}`;

  let path = `M${pList[0]}`;
  const tangents = [];
  for (let i = 1; i < pList.length - 1; i++)
    tangents.push(makeTangent(pList[i - 1], pList[i], pList[i + 1], curviness));

  path += `Q${tangents[0][0]} ${pList[1]}`;
  for (let i = 2; i < pList.length - 1; i++)
    path += `C${tangents[i - 2][1]} ${tangents[i - 1][0]} ${pList[i]}`;

  path += `Q${tangents[pList.length - 3][1]} ${pList[pList.length - 1]}`;
  return path;
};

function makeTangent(prevpt, thispt, nextpt, curviness) {
  const d1x = prevpt[0] - thispt[0],
    d1y = prevpt[1] - thispt[1],
    d2x = nextpt[0] - thispt[0],
    d2y = nextpt[1] - thispt[1],
    d1a = (d1x * d1x + d1y * d1y) ** (CatmullRomExp / 2),
    d2a = (d2x * d2x + d2y * d2y) ** (CatmullRomExp / 2),
    numx = (d2a * d2a * d1x - d1a * d1a * d2x) * curviness,
    numy = (d2a * d2a * d1y - d1a * d1a * d2y) * curviness,
    denom1 = 3 * d2a * (d1a + d2a),
    denom2 = 3 * d1a * (d1a + d2a);
  return [
    [
      thispt[0] + (denom1 && numx / denom1),
      thispt[1] + (denom1 && numy / denom1),
    ],
    [
      thispt[0] - (denom2 && numx / denom2),
      thispt[1] - (denom2 && numy / denom2),
    ],
  ];
}
