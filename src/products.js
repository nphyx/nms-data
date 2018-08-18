/* @flow */
import * as util from "./util"

export type Product = {
  group: string,
  name: string,
  symbol: string,
  price: number
}

export function create(name: string, group: string, symbol: string, price: ?number = 0): Product {
  if (!group || !name || !symbol) throw new Error("group, name, and symbol are required")
  let product = {group, name, symbol, price: price || 0}
  Object.freeze(product)
  return product
}

export const array: Array<Product> = [
  create("Aronium", "Alloy", "Aro", 25000),
  create("Grantine", "Alloy", "Gra", 25000),
  create("Herox", "Alloy", "Her", 25000),
  create("Iridesite", "Alloy", "Ii", 150000),
  create("Dirty Bronze", "Alloy", "DB", 25000),
  create("Lemmium", "Alloy", "Le", 25000),
  create("Magno-Gold", "Alloy", "MG", 2500),
  create("Geodesite", "Alloy", "Ge", 15000),
  create("Carite Sheet", "Component", "CaS", 810.2),
  create("Suspension Fluid", "Component", "SFl", 1100),
  create("Electron Vapor", "Component", "EVa", 4950),
  create("Antimatter", "Component", "AMa", 5233),
  create("Microdensity Fabric", "Component", "MFa", 1615.3),
  create("Dynamic Resonator", "Component", "DRe", 27500),
  create("Bypass Chip", "Device", "BCh", 3575),
  create("AtlasPass V1", "Device", "AP1", 825),
  create("AtlasPass V2", "Device", "AP2", 0),
  create("AtlasPass V3", "Device", "AP3", 0),
  create("Shielding Shard", "Consumable", "SSd", 343),
  create("Shielding Plate", "Consumable", "SPl", 688),
  create("Shielding Sheet", "Consumable", "SSh", 1031),
  create("Power Gel", "Consumable", "PGl", 172),
  create("Power Canister", "Consumable", "PCa", 344),
  create("Power Reservoir", "Consumable", "PRe", 516),
  create("Warp Cell", "Consumable", "WCe", 46750),
  create("Unstable Plasma", "Consumable", "UPl", 27500),
  create("Voltaic Cell", "Curiosity",  "VCe", 1547.0),
  create("Glass", "Curiosity", "Gla", 48000.0),
  create("Unstable Gel", "Curiosity", "UGe", 80000.0),
  create("Weatherproof Rubber", "Curiosity", "WR", 1547.0),
  create("Poly Fibre", "Curiosity", "PFi", 200000.0),
  create("Acid", "Curiosity", "Aci", 288000.0),
  create("Lubricant", "Curiosity", "Lub", 160000.0),
  create("Heat Capacitor", "Curiosity", "HCa", 240000.0),
  create("Circuit Board", "Curiosity", "CBo", 1196250.0),
  create("Living Glass", "Curiosity", "LGl", 696000.0),
  create("Liquid Explosive", "Curiosity", "LEx", 1000500.0),
  create("Organic Catalyst", "Curiosity", "OCa", 400000),
  create("Semiconductor", "Curiosity", "Sem"),
  create("Thermic Condensate", "Curiosity", "TCo", 50000),
  create("Enriched Carbon", "Curiosity", "ECa", 50000),
  create("Ammonium Salt", "Curiosity", "ASa", 50000),
  create("Hot Ice", "Curiosity", "HIc", 400000),
  create("Fusion Accelerant", "Curiosity", "FAc", 2000000),
  create("Superconductor", "Curiosity", "Sup", 4000000),
  create("Quantum Processor", "Curiosity", "QPr", 5200000),
  create("Freighter Fuel", "Curiosity", "FFu", 5000000),
  create("Fusion Ignitor", "Curiosity", "FIg", 18000000),
  create("Cryo-Pump", "Curiosity", "CPu", 2000000),
  create("Cryogenic Chamber", "Curiosity", "CCh", 4800000),
  create("Stasis Device", "Curiosity", "SDe", 18000000)
]
array.forEach(p => Object.freeze(p))

export const set: Set<Product> = Object.freeze(new Set(array))
export const unknown = create("Unknown", "Unknown", "Un")

export const find = (search: any, field: string = "symbol") => util.find(array, search, field) || unknown
export const filter = (search: any, field: string = "group") => util.filter(array, search, field)
export const any = (search: any, field: string = "symbol") => util.any(array, search, field)
export const uniqueProperties = (field: string) => util.uniqueProperties(array, field)

export const groups = Object.freeze(uniqueProperties("group"))
export const names = Object.freeze(array.map(p => p.name))
export const symbols = Object.freeze(array.map(p => p.symbol))
