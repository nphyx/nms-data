/* @flow */
export type Recipe = {
  type: "refined" | "crafted",
  materials: Array<string>,
  quantities: Array<number>,
  product: string,
  output: number
}

export const array: Array<Recipe> = [
  {type: "refined", product: "CO2", materials: ["Fe", "NH3"], quantities: [1, 2], output: 1},
  {type: "refined", product: "CO2", materials: ["Fr", "NaCl"], quantities: [2, 1], output: 1},
  {type: "refined", product: "CO2", materials: ["Fr", "Fe"], quantities: [1, 1], output: 1},
  {type: "refined", product: "P", materials: ["Fe", "CO2"], quantities: [1, 2], output: 1},
  {type: "refined", product: "P", materials: ["So", "NaCl"], quantities: [2, 1], output: 1},
  {type: "refined", product: "P", materials: ["So", "Fe"], quantities: [1, 1], output: 2},
  {type: "refined", product: "Py", materials: ["Fe+", "U"], quantities: [1, 2], output: 1},
  {type: "refined", product: "Py", materials: ["Cc", "NaCl"], quantities: [2, 1], output: 1},
  {type: "refined", product: "Py", materials: ["Cc", "Fe"], quantities: [1, 1], output: 1},
  {type: "refined", product: "Pf", materials: ["Fe", "Py"], quantities: [1, 2], output: 1},
  {type: "refined", product: "Pf", materials: ["Sb", "NaCl"], quantities: [2, 1], output: 1},
  {type: "refined", product: "Pf", materials: ["Sb", "Fe"], quantities: [1, 1], output: 2},
  {type: "refined", product: "U", materials: ["Fe", "P"], quantities: [1, 2], output: 1},
  {type: "refined", product: "U", materials: ["Gr", "NaCl"], quantities: [2, 1], output: 1},
  {type: "refined", product: "U", materials: ["Gr", "Fe"], quantities: [1, 1], output: 2},
  {type: "refined", product: "NH3", materials: ["Fe", "Pf"], quantities: [1, 2], output: 1},
  {type: "refined", product: "NH3", materials: ["Fm", "NaCl"], quantities: [2, 1], output: 1},
  {type: "refined", product: "NH3", materials: ["Fm", "Fe"], quantities: [1, 1], output: 1},
  // rust: {type: "refined", product: "Fe", materials: ["Fe0"], quantities: [5], output: 1},
  {type: "refined", product: "Fe+", materials: ["Fe"], quantities: [2], output: 1},
  {type: "refined", product: "Fe++", materials: ["Fe+"], quantities: [2], output: 1},
  {type: "refined", product: "Na+", materials: ["Na"], quantities: [2], output: 1},
  {type: "refined", product: "Co+", materials: ["Co"], quantities: [2], output: 1},
  {type: "refined", product: "C+", materials: ["C"], quantities: [2], output: 1},
  {type: "refined", product: "Cl", materials: ["NaCl"], quantities: [2], output: 1},
  {type: "refined", product: "D", materials: ["H"], quantities: [2], output: 1},
  {type: "refined", product: "Ch", materials: ["Cu"], quantities: [2], output: 1},
  {type: "refined", product: "Ch", materials: ["Cu+"], quantities: [1], output: 1},
  {type: "refined", product: "Ch", materials: ["Em"], quantities: [1], output: 1},
  {type: "refined", product: "Ch", materials: ["Em+"], quantities: [1], output: 2},
  {type: "refined", product: "Ch", materials: ["Cd"], quantities: [1], output: 2},
  {type: "refined", product: "Ch", materials: ["Cd+"], quantities: [1], output: 3},
  {type: "refined", product: "Ch", materials: ["In"], quantities: [1], output: 3},
  {type: "refined", product: "Ch", materials: ["In+"], quantities: [1], output: 6},

  // aronium {type: "crafted", product: "Aro", materials: ["Ir", "C"], quantities: [125, 125], output: 1},
  // grantine {type: "crafted", product: "Gra", materials: ["Em", "Hr"], quantities: [125, 125], output: 1},
  // herox {type: "crafted", product: "Her", materials: ["Zn", "Pt"], quantities: [20, 20], output: 1},
  // {type: "crafted", product: "Le",  materials: ["Pu", "Ti"], quantities: [125, 125], output: 1},
  {type: "crafted", product: "AMa",  materials: ["Ch", "C+"], quantities: [25, 20], output: 1},
  {type: "crafted", product: "AP1", materials: ["Cu", "MPr"], quantities: [200, 1], output: 1},
  {type: "crafted", product: "AP2", materials: ["Cd", "MPr"], quantities: [200, 1], output: 1},
  {type: "crafted", product: "AP3", materials: ["Em", "MPr"], quantities: [200, 1], output: 1},
  {type: "crafted", product: "ASa", materials: ["N", "C"], quantities: [250, 25], output: 1},
  {type: "crafted", product: "Aci", materials: ["Fm"], quantities: [600], output: 1},
  {type: "crafted", product: "CBo", materials: ["PFi"], quantities: [1], output: 1},
  {type: "crafted", product: "CCh", materials: ["LGl", "CPu"], quantities: [1, 1], output: 1},
  {type: "crafted", product: "CPu", materials: ["HIc", "TCo"], quantities: [1, 1], output: 1},
  {type: "crafted", product: "CaS",  materials: ["Fe"], quantities: [50], output: 1},
  {type: "crafted", product: "DB", materials: ["Cu", "Fe"], quantities: [125, 125], output: 1},
  {type: "crafted", product: "DRe", materials: ["AMa", "MFa", "Ch"], quantities: [2, 4, 100], output: 1},
  {type: "crafted", product: "ECa", materials: ["Rn", "C"], quantities: [250, 25], output: 1},
  {type: "crafted", product: "FAc", materials: ["OCa", "ASa"], quantities: [1, 1], output: 1},
  {type: "crafted", product: "FFu", materials: ["LEx", "FAc"], quantities: [1, 1], output: 1},
  {type: "crafted", product: "FIg", materials: ["FFu", "QPr", "Ge"], quantities: [1, 1, 1], output: 1},
  {type: "crafted", product: "Ge",   materials: ["DB", "Her", "Le"], quantities: [1, 1, 1], output: 1},
  {type: "crafted", product: "Gla", materials: ["Fr"], quantities: [250], output: 1},
  {type: "crafted", product: "HCa", materials: ["So"], quantities: [200], output: 1},
  {type: "crafted", product: "HIc", materials: ["ASa", "ECa"], quantities: [1, 1], output: 1},
  {type: "crafted", product: "Ii", materials: ["Aro", "MG", "Gra"], quantities: [1, 1, 1], output: 1},
  {type: "crafted", product: "LEx", materials: ["UGe"], quantities: [1], output: 1},
  {type: "crafted", product: "LGl", materials: ["Lub", "Gla"], quantities: [1, 1], output: 1},
  {type: "crafted", product: "Lub", materials: ["Gr"], quantities: [400], output: 1},
  {type: "crafted", product: "MFa", materials: ["Pt", "Fe"], quantities: [10, 50], output: 1},
  {type: "crafted", product: "MG", materials: ["Au", "Fe"], quantities: [125, 125], output: 1},
  {type: "crafted", product: "OCa", materials: ["TCo", "ECa"], quantities: [1, 1], output: 1},
  {type: "crafted", product: "PFi", materials: ["Sb"], quantities: [200], output: 1},
  {type: "crafted", product: "QPr", materials: ["CBo", "Sup"], quantities: [1, 1], output: 1},
  {type: "crafted", product: "SDe", materials: ["QPr", "CCh", "Ii"], quantities: [1, 1, 1], output: 1},
  {type: "crafted", product: "Sem", materials: ["TCo", "ASa"], quantities: [1, 1], output: 1},
  {type: "crafted", product: "Sup", materials: ["Sem", "ECa"], quantities: [1, 1], output: 1},
  {type: "crafted", product: "TCo", materials: ["Su", "C"], quantities: [250, 25], output: 1},
  {type: "crafted", product: "UGe", materials: ["Cc"], quantities: [200], output: 1},
  {type: "crafted", product: "UPl", materials: ["O2", "MPl"], quantities: [400, 200], output: 1},
  {type: "crafted", product: "VCe", materials: ["Mb"], quantities: [50], output: 1},
  {type: "crafted", product: "WCe", materials: ["AHo", "AMa"], quantities: [1, 1], output: 1},
  {type: "crafted", product: "WR", materials: ["Ke"], quantities: [50], output: 1}
]

array.forEach(r => Object.freeze(r))
export const set = Object.freeze(new Set(array))

export const byMaterial = (material: string): Array<Recipe> => array.filter(i => i.materials.includes(material))