/* @flow */
import * as util from "./util"

export type Product = {
  group: string,
  name: string,
  symbol: string,
  materials: Map<string, number>,
  price: number
}

export function create(name: string, group: string, symbol: string, material_arr: ?Array<[string, number]>, price: ?number = 0): Product {
  if (!group || !name || !symbol) throw new Error("group, name, and symbol are required")
  let materials = material_arr ? new Map(material_arr) : new Map()
  let product = {group, name, symbol, materials, price: price || 0}
  Object.freeze(product)
  return product
}

export const set: Set<Product> = new Set([
  create("Aronium", "Alloy", "Aro", [["Ir", 125], ["C", 125]], 25000),
  create("Grantine", "Alloy", "Gra", [["Em", 125], ["Hr", 125]], 25000),
  create("Herox", "Alloy", "Her", [["Zn", 20], ["Pt", 20]], 25000),
  create("Iridesite", "Alloy", "Ii", [["Aro", 1], ["MG", 1], ["Gra", 1]], 150000),
  create("Dirty Bronze", "Alloy", "DB", [["Cu", 125], ["Fe", 125]], 25000),
  create("Lemmium", "Alloy", "Le", [["Pu", 125], ["Ti", 125]], 25000),
  create("Magno-Gold", "Alloy", "MG", [["Au", 125],["Fe", 125]], 2500),
  create("Geodesite", "Alloy", "Ge", [["DB", 1], ["Her", 1], ["Le", 1]], 15000),
  create("Carite Sheet", "Component", "CaS", [["Fe", 50]], 810.2),
  create("Suspension Fluid", "Component", "SFl", [["C", 50]], 1100),
  create("Electron Vapor", "Component", "EVa", [["Pu", 100], ["SFl", 1]], 4950),
  create("Antimatter", "Component", "AMa", [["EVa", 1], ["Hr", 50], ["Zn", 20]], 5233),
  create("Microdensity Fabric", "Component", "MFa", [["Pt", 10], ["Fe", 50]], 1615.3),
  create("Dynamic Resonator", "Component", "DRe", [["AMa", 2], ["MFa", 4], ["Ch", 100]], 27500),
  create("Bypass Chip", "Device", "BCh", [["Fe", 10], ["Pu", 10]], 3575),
  create("AtlasPass V1", "Device", "AP1", [["Fe", 25], ["Hr", 10]], 825),
  create("AtlasPass V2", "Device", "AP2", [["Zn", 25], ["Pt", 10]], 0),
  create("AtlasPass V3", "Device", "AP3", [["Ti", 25], ["Ch", 10]], 0),
  create("Shielding Shard", "Consumable", "SSd", [["Fe", 50], ["Pt", 20]], 343),
  create("Shielding Plate", "Consumable", "SPl", [["Fe", 100], ["Pt", 20]], 688),
  create("Shielding Sheet", "Consumable", "SSh", [["Fe", 150], ["Pt", 20]], 1031),
  create("Power Gel", "Consumable", "PGl", [["Pu", 50], ["C", 100]], 172),
  create("Power Canister", "Consumable", "PCa", [["Pu", 75],["C", 150]], 344),
  create("Power Reservoir", "Consumable", "PRe", [["Pu", 100],["C", 150]], 516),
  create("Warp Cell", "Consumable", "WCe", [["Th", 100], ["AMa", 1]], 46750),
  create("Unstable Plasma", "Consumable", "UPl", [["Th", 400], ["Pu", 200]], 27500),
  create("Voltaic Cell", "Curiosity",  "VCe", [["Mb", 50]], 1547.0),
  create("Glass", "Curiosity", "Gla", [["Fr", 250]], 48000.0),
  create("Unstable Gel", "Curiosity", "UGe", [["Cc", 200]], 80000.0),
  create("Weatherproof Rubber", "Curiosity", "WR", [["Ke", 50]], 1547.0),
  create("Poly Fibre", "Curiosity", "PFi", [["Sb", 200]], 200000.0),
  create("Acid", "Curiosity", "Aci", [["Fm", 600]], 288000.0),
  create("Lubricant", "Curiosity", "Lub", [["Gr", 400]], 160000.0),
  create("Heat Capacitor", "Curiosity", "HCa", [["So", 200]], 240000.0),
  create("Circuit Board", "Curiosity", "CBo", [["PFi", 1]], 1196250.0),
  create("Living Glass", "Curiosity", "LGl", [["Lub", 1], ["Gla", 1]], 696000.0),
  create("Liquid Explosive", "Curiosity", "LEx", [["UGe", 1]], 1000500.0),
  create("Organic Catalyst", "Curiosity", "OCa", [["TCo", 1], ["ECa", 1]], 400000),
  create("Semiconductor", "Curiosity", "Sem", [["TCo", 1], ["ASa", 1]]),
  create("Thermic Condensate", "Curiosity", "TCo", [["Su", 250], ["C", 25]], 50000),
  create("Enriched Carbon", "Curiosity", "ECa", [["Ra", 250], ["C", 25]], 50000),
  create("Ammonium Salt", "Curiosity", "ASa", [["Ni", 250], ["C", 25]], 50000),
  create("Hot Ice", "Curiosity", "HIc", [["ASa", 1], ["ECa", 1]], 400000),
  create("Fusion Accelerant", "Curiosity", "FAc", [["OCa", 1], ["ASa", 1]], 2000000),
  create("Superconductor", "Curiosity", "Sup", [["Sem", 1], ["ECa", 1]], 4000000),
  create("Quantum Processor", "Curiosity", "QPr", [["CBo", 1], ["Sup", 1]], 5200000),
  create("Freighter Fuel", "Curiosity", "FFu", [["LEx", 1], ["FAc", 1]], 5000000),
  create("Fusion Ignitor", "Curiosity", "FIg", [["FFu", 1], ["QPr", 1], ["Ge", 1]], 18000000),
  create("Cryo-Pump", "Curiosity", "CPu", [["HIc", 1], ["TCo", 1]], 2000000),
  create("Cryogenic Chamber", "Curiosity", "CCh", [["LGl", 1], ["CPu", 1]], 4800000),
  create("Stasis Device", "Curiosity", "SDe", [["QPr", 1], ["CCh", 1], ["Ir", 1]], 18000000)
])

const product_arr = [...set]

export const unknown_product = create("Unknown", "Unknown", "Un")


export const find = (search: any, field: string = "symbol") => util.find(product_arr, search, field) || unknown_product
export const filter = (search: any, field: string = "group") => util.filter(product_arr, search, field)
export const any = (search: any, field: string = "symbol") => util.any(product_arr, search, field)
export const uniqueProperties = (field: string) => util.uniqueProperties([...product_arr], field)

export const groups = Object.freeze(uniqueProperties("group"))
export const names = Object.freeze(product_arr.map(p => p.name))
export const symbols = Object.freeze(product_arr.map(p => p.symbol))
