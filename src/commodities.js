/* @flow */
import * as util from "./util"

type Commodity = {
  name: string,
  group: string,
  supply: string | null,
  demand: string | null,
  value: number | null
}

export function create(name: string, group: string, supply: string | null = null, demand: string | null = null, value: number | null = null): Commodity {
  if (!name || !group) throw new Error("name and group are required")
  let commodity = {name, group, supply, demand, value}
  Object.freeze(commodity)
  return commodity
}

const commodities: Set<Commodity> = new Set([
  create("Autonomous Positioning Unit", "Commodity", "Technology", "Power Generation", 30000.0),
  create("Bromide Salt", "Commodity", "Mining", "Manufacturing", 4000.0),
  create("Carbon Nanotubes", "Commodity", "Advanced Materials", "Scientific", 1000.0),
  create("Comet Droplets", "Commodity", "Trading", "Advanced Materials", 4000.0),
  create("Decommissioned Circuit Board", "Commodity", "Technology", "Power Generation", 1000.0),
  create("Decrypted User Data", "Commodity", "Trading", "Advanced Materials", 1000.0),
  create("De-Scented Pheromone Bottle", "Commodity", "Scientific", "Trading", 1000.0),
  create("Dirt", "Commodity", "Mining", "Manufacturing", 1000.0),
  create("Enormous Metal Cog", "Commodity", "Manufacturing", "Technology", 1000.0),
  create("Experimental Power Fluid", "Commodity", "Power Generation", "Mining"),
  create("Five Dimensional Torus", "Commodity", "Advanced Materials", "Scientific"),
  create("Fusion Core", "Commodity", "Power Generation", "Mining", 50000.0),
  create("High Capacity Vector Compressor", "Commodity", "Manufacturing", "Technology", 10000.0),
  create("Holographic Crankshaft", "Commodity", "Manufacturing", "Technology"),
  create("Industrial-Grade Battery", "Commodity", "Power Generation", "Mining"),
  create("Instability Injector", "Commodity", "Scientific", "Trading"),
  create("Ion Capacitor", "Commodity", "Technology", "Power Generation", 15000.0),
  create("Ion Sphere", "Commodity", "Trading", "Advanced Materials"),
  create("Neural Duct", "Commodity", "Scientific", "Trading"),
  create("Neutron Microscope", "Commodity", "Scientific", "Trading", 2000.0),
  create("Non-Stick Piston", "Commodity", "Manufacturing", "Technology"),
  create("Ohmic Gel", "Commodity", "Power Generation", "Mining", 4000.0),
  create("Optical Solvent", "Commodity", "Advanced Materials", "Scientific", 4000.0),
  create("Organic Piping", "Commodity", "Scientific", "Trading"),
  create("Polychromatic Zirconium", "Commodity", "Mining", "Manufacturing", 7000.0),
  create("Quantum Accelerator", "Commodity", "Technology", "Power Generation", 50000.0),
  create("Re-Latticed Arc Crystal", "Commodity", "Mining", "Manufacturing", 10000.0),
  create("Self-Repairing Heridium", "Commodity", "Advanced Materials", "Scientific"),
  create("Six-Pronged Mesh Decoupler", "Commodity", "Manufacturing", "Technology", 4000.0),
  create("Spark Canister", "Commodity", "Power Generation", "Mining", 1000.0),
  create("Star Silk", "Commodity", "Trading", "Advanced Materials"),
  create("Superconducting Fiber", "Commodity", "Advanced Materials", "Scientific"),
  create("Teleport Coordinators", "Commodity", "Trading", "Advanced Materials", 50000.0),
  create("Unrefined Pyrite Grease", "Commodity", "Mining", "Manufacturing"),
  create("Welding Soap", "Commodity", "Technology", "Power Generation", 6000.0),
  create("Atlas Stone", "Curiosity", undefined, undefined, 68750),
  create("Dimensional Matrix", "Curiosity", undefined, undefined, 15125),
  create("Fascination Bead", "Curiosity", undefined, undefined, 12375),
  create("Gek Charm", "Curiosity", undefined, undefined, 11000),
  create("Gek Relic", "Curiosity",  undefined, undefined, 26000),
  create("GekNip", "Curiosity", undefined, undefined, 20625),
  create("Grahgrah", "Curiosity", undefined, undefined, 13750),
  create("Korvax Casing", "Curiosity", undefined, undefined, 27000),
  create("Korvax Convergence Cube", "Curiosity", undefined, undefined, 25500),
  create("Neutrino Module", "Curiosity", undefined, undefined, 13750),
  create("Night Crystals", "Curiosity", undefined, undefined, 35000),
  create("Vy'keen Dagger", "Curiosity", undefined, undefined, 20625),
  create("Vy'keen Effigy", "Curiosity", undefined, undefined, 25437.5)
])
commodities.forEach(el => Object.freeze(el))

const commodity_arr = [...commodities]

export const unknown_commodity: Commodity = create("Unknown", "Unknown")

export const set = commodities

export const find = (search: any, field: string = "name"): Commodity => util.find(commodity_arr, search, field) || unknown_commodity
export const filter = (search: any, field: string = "group"): Array<Commodity> => util.filter(commodity_arr, search, field)
export const any = (search: any, field: string = "name"): Array<Commodity> => util.any(commodity_arr, search, field)
export const uniqueProperties = (field: string): Array<Commodity> => util.uniqueProperties(commodity_arr, field)

export const names = Object.freeze(uniqueProperties("name"))
export const groups = Object.freeze(uniqueProperties("group"))
export const supplies = Object.freeze(uniqueProperties("supply").filter(i => !!i))
export const demands = Object.freeze(uniqueProperties("demand").filter(i => !!i))
