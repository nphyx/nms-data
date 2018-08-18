/* @flow */
import * as util from "./util"

export type Material = {
  name: string,
  symbol: string,
  group: string,
  value: number
}

export const array: Array<Material>  = [
  {name: "Anything", symbol: "*", group: "Any Material", value: 0.0}, // used in recipes, not real!
  {name: "Dioxite", symbol: "CO2", group: "Localized Mineral", value: 62.0},
  {name: "Phosphorus", symbol: "P", group: "Localized Mineral", value: 62.0},
  {name: "Pyrite", symbol: "Py", group: "Localized Mineral", value: 62.0},
  {name: "Paraffinium", symbol: "Pf", group: "Localized Mineral", value: 62.0},
  {name: "Uranium", symbol: "U", group: "Localized Mineral", value: 62.0},
  {name: "Ammonia", symbol: "NH3", group: "Localized Mineral", value: 62.0},

  {name: "Ferrite Dust", symbol: "Fe", group: "Metallic Mineral", value: 14.0},
  {name: "Pure Ferrite", symbol: "Fe+", group: "Metallic Mineral", value: 28.0},
  {name: "Magnetized Ferrite", symbol: "Fe++", group: "Metallic Mineral", value: 82.0},

  {name: "Sodium", symbol: "Na", group: "Catalyst Mineral", value: 41.0},
  {name: "Sodium Nitrate", symbol: "Na+", group: "Catalyst Mineral", value: 82.0},

  {name: "Cobalt", symbol: "Co", group: "Mineral", value: 198.0},
  {name: "Ionized Cobalt", symbol: "Co+", group: "Mineral", value: 401.0},

  {name: "Carbon", symbol: "C", group: "Organic", value: 12.0},
  {name: "Condensed Carbon", symbol: "C+", group: "Organic", value: 24.0},

  {name: "Salt", symbol: "NaCl", group: "Mineral", value: 299.0},
  {name: "Chlorine", symbol: "Cl", group: "Mineral", value: 602.0},

  {name: "Oxygen", symbol: "O2", group: "Fuel", value: 34.0},
  {name: "Di-hydrogen", symbol: "H", group: "Fuel", value: 34.0},
  {name: "Deuterium", symbol: "D", group: "Fuel", value: 34.0},
  {name: "Tritium", symbol: "H3", group: "Fuel", value: 6.0},

  {name: "Copper", symbol: "Cu", group: "Stellar", value: 110.0},
  {name: "Cadmium", symbol: "Cd", group: "Stellar", value: 234.0},
  {name: "Emeril", symbol: "Em", group: "Stellar", value: 275.0},
  {name: "Indium", symbol: "In", group: "Stellar", value: 464.0},
  {name: "Activated Copper", symbol: "Cu+", group: "Stellar", value: 245.0},
  {name: "Activated Cadmium", symbol: "Cd+", group: "Stellar", value: 450.0},
  {name: "Activated Emeril", symbol: "Em+", group: "Stellar", value: 696.0},
  {name: "Activated Indium", symbol: "In+", group: "Stellar", value: 949.0},
  {name: "Chromatic metal", symbol: "Ch", group: "Stellar", value: 245.0},

  {name: "Silver", symbol: "Ag", group: "Asteroid Mineral", value: 101.0},
  {name: "Gold", symbol: "Au", group: "Asteroid Mineral", value: 220.0},
  {name: "Platinum", symbol: "Pt", group: "Asteroid Mineral", value: 55.0},

  {name: "Rare Metal Element", symbol: "Fe*", group: "Concentrated Mineral", value: 4200.0},
  {name: "TetraCobalt", symbol: "Co*", group: "Concentrated Mineral", value: 6150.0},
  {name: "Superoxide Crystal", symbol: "O2*", group: "Concentrated Mineral", value: 5100.0},
  {name: "Carbon Crystal", symbol: "C*", group: "Concentrated Mineral", value: 3600.0},
  {name: "Destabilized Sodium", symbol: "Na*", group: "Concentrated Mineral", value: 12300.0},

  {name: "Sulphurine", symbol: "Su", group: "Compressed Atmospheric Gas", value: 20.0},
  {name: "Radon", symbol: "Rn", group: "Compressed Atmospheric Gas", value: 20.0},
  {name: "Nitrogen", symbol: "N", group: "Compressed Atmospheric Gas", value: 20.0},

  {name: "Cactus Flesh", symbol: "Cc", group: "Agricultural Product", value: 28.0},
  {name: "Coprite", symbol: "Cr", group: "Agricultural Product", value: 30.0},
  {name: "Frost Crystal", symbol: "Fr", group: "Agricultural Product", value: 12.0},
  {name: "Fungal Mould", symbol: "Fm", group: "Agricultural Product", value: 16.0},
  {name: "Mordite", symbol: "Mo", group: "Agricultural Product", value: 40.0},
  {name: "Solanium", symbol: "So", group: "Agricultural Product", value: 70.0},
  {name: "Star Bulb", symbol: "Sb", group: "Agricultural Product", value: 32.0},
  {name: "Gamma Root", symbol: "Gr", group: "Agricultural Product", value: 16.0},
  {name: "Marrow Bulb", symbol: "Mb", group: "Netural/Exotic Material", value: 16.0},
  {name: "Kelp Sac", symbol: "Ke", group: "Neutral/Exotic Material", value: 41.0},
  {name: "Pugneum", symbol: "Pg", group: "Anomolous Material", value: 138.0},

  {name: "Rusted Metal", symbol: "FeO", group: "Junk", value: 20.0},
  {name: "Residual Goop", symbol: "RG", group: "Junk", value: 20.0},
  {name: "Viscous Fluids", symbol: "VF", group: "Junk", value: 20.0},
  {name: "Living Slime", symbol: "LS", group: "Junk", value: 40.0},
  {name: "Runaway Mould", symbol: "RM", group: "Junk", value: 25.0}
]

const unknown: Material = Object.freeze({name: "Unknown", symbol: "", group: "", value: 0.0})

array.forEach(m => Object.freeze(m))
Object.freeze(array)
export const set = Object.freeze(new Set(array))
Object.freeze(unknown)

export const find = (search: any, field: string = "symbol") => util.find(array, search, field) || unknown
export const filter = (search: any, field: string = "group") => util.filter(array, search, field)
export const any = (search: any, field: string = "symbol"): Array<Element> => util.any(array, search, field)
export const uniqueProperties = (field: string) => util.uniqueProperties(array, field)


export const groups = Object.freeze(uniqueProperties("group"))
export const names = Object.freeze(uniqueProperties("name"))
export const symbols = Object.freeze(uniqueProperties("symbol"))
