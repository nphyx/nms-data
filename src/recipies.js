/* @flow */
export type Recipe = {
  materials: Array<string>,
  quantities: Array<number>,
  product: string,
  output: number
}

const recipe_set: Set<Recipe> = new Set([
  {product: "C02", materials: ["Fe", "NH3"], quantities: [1, 2], output: 1},
  {product: "C02", materials: ["Fc", "NACl"], quantities: [2, 1], output: 1},
  {product: "C02", materials: ["Fc", "Fe"], quantities: [1, 1], output: 1},
  {product: "P", materials: ["Fe", "CO2"], quantities: [1, 2], output: 1},
  {product: "P", materials: ["So", "NACl"], quantities: [2, 1], output: 1},
  {product: "P", materials: ["So", "Fe"], quantities: [1, 1], output: 2},
  {product: "Py", materials: ["Fe+", "U"], quantities: [1, 2], output: 1},
  {product: "Py", materials: ["Cf", "NACl"], quantities: [2, 1], output: 1},
  {product: "Py", materials: ["Cf", "Fe"], quantities: [1, 1], output: 1},
  {product: "Pf", materials: ["Fe", "Py"], quantities: [1, 2], output: 1},
  {product: "Pf", materials: ["Sb", "NACl"], quantities: [2, 1], output: 1},
  {product: "Pf", materials: ["Sb", "Fe"], quantities: [1, 1], output: 2},
  {product: "U", materials: ["Fe", "P"], quantities: [1, 2], output: 1},
  {product: "U", materials: ["Gr", "NACl"], quantities: [2, 1], output: 1},
  {product: "U", materials: ["Gr", "Fe"], quantities: [1, 1], output: 2},
  {product: "NH3", materials: ["Fe", "Pf"], quantities: [1, 2], output: 1},
  {product: "NH3", materials: ["Fm", "NACl"], quantities: [2, 1], output: 1},
  {product: "NH3", materials: ["Fm", "Fe"], quantities: [1, 1], output: 1},
  {product: "Fe", materials: ["Fe0"], quantities: [5], output: 1},
  {product: "Fe+", materials: ["Fe"], quantities: [2], output: 1},
  {product: "Fe++", materials: ["Fe+"], quantities: [2], output: 1},
  {product: "Na+", materials: ["Na"], quantities: [2], output: 1},
  {product: "Co+", materials: ["Co"], quantities: [2], output: 1},
  {product: "C+", materials: ["C"], quantities: [2], output: 1},
  {product: "Cl", materials: ["NaCl"], quantities: [2], output: 1},
  {product: "D", materials: ["H"], quantities: [2], output: 1},
  {product: "Ch", materials: ["Cu"], quantities: [2], output: 1},
  {product: "Ch", materials: ["Cu+"], quantities: [1], output: 1},
  {product: "Ch", materials: ["Em"], quantities: [1], output: 1},
  {product: "Ch", materials: ["Em+"], quantities: [1], output: 2},
  {product: "Ch", materials: ["Cd"], quantities: [1], output: 2},
  {product: "Ch", materials: ["Cd+"], quantities: [1], output: 3},
  {product: "Ch", materials: ["In"], quantities: [1], output: 3},
  {product: "Ch", materials: ["In+"], quantities: [1], output: 6}
])

export const set = Object.freeze(recipe_set)
export const array = [...recipe_set]
