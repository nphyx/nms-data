/* @flow */
import * as util from "./util"
const freeze = Object.freeze.bind(Object)

export type OptionEntry = {
  name: string,
  options: Set<string>,
  excludes: Map<string, string>,
  multi: boolean
}

export type ShipModel = {
  name: string,
  category: string,
  features: OptionEntry[]
}

export type Ship = {
  name: string,
  model: string,
  model_definition: ShipModel,
  category: string,
  inventory: [number, number],
  features: Map<string, string>,
  images: string[]
}

export type SerializedShip = {
  name: string,
  model: string,
  inventory: [number, number],
  images: string[],
  features: [string, string][]
}

// exported for testing purposes, not publicly useful
export function createOptionEntry(name: string = "", options_array: ?Array<string>,
  excludes_array: ?Array<[string, string]>, multi: ?boolean = false): OptionEntry {
  let options: Set<string>, excludes: Map<string, string>;
  if (options_array instanceof Array) options = new Set(options_array)
  else options = new Set()
  if (excludes_array instanceof Array) excludes = new Map(excludes_array)
  else excludes = new Map()
  freeze(options)
  freeze(excludes)
  multi = multi ? true : false
  let opt = {name, options, excludes, multi}
  freeze(opt)
  return opt
}

export function createShipModel(name: string = "", category: string = "", features: OptionEntry[] = []): ShipModel {
  freeze(features)
  let type = {name, category, features}
  freeze(type)
  return type
}

export const models: ShipModel[] = [
  createShipModel("Avia", "Hauler", [
    createOptionEntry("Hull", ["Patagon-S", "Patagon-XS", "Patagon-LX", "Patagon-L7", "Katuo-S", "Katuo-Z", "Katuo-LX", "Katuo-EX"]),
    createOptionEntry("Tail", ["VLS-Aftershock", "Alula", "Rectrix", "Velotus", "RTX-Ibis"]),
    createOptionEntry("Wings", ["D-Flect", "Tie", "Tern", "Y-Tern", "Polyhedral", "Thrust", "Ibis", "E-Wing", "C-Wing", "Aftershock"]),
    createOptionEntry("High-Angle Wing Incidence", ["Yes", "No"]),
    createOptionEntry("Booster", ["Vertiblade", "2Rpedo", "Sabre-05", "Ionarch", "Serenity"], [["Storage", "FRZR9000"]]),
    createOptionEntry("Storage", ["Fluxus", "Fluxus + Shield Reinforcement", "FRZR9000"])
  ]),
  createShipModel("Comette", "Fighter", [
    createOptionEntry("Body", ["Poly", "Parabola", "Poly GT", "Parabola X"]),
    createOptionEntry("Engine",["Gamma", "Atlas", "Delta"]),
    createOptionEntry("Nose", ["Stan", "Scout", "Viper", "Fink", "X-One", "Lancer"]),
    createOptionEntry("Wings", ["Gull", "Quasar", "Starjumper", "Starscream", "Shockwave", "Jupiter", "Mecha", "ZX-95", "Vulture", "Artoo", "Halo", "Aftershock", "Bowie", "Tie", "E-Wing"], undefined, true),
    createOptionEntry("Fins", ["Razor"]),
    createOptionEntry("Boosters", ["Stratus", "Firefly", "Serenity", "Swordfish"])
  ]),
  createShipModel("Izoni", "Explorer", [
    createOptionEntry("Canopy", ["Sphaira", "Corsair"]),
    createOptionEntry("Fuselage", ["Starhopper", "K-Basse"]),
    createOptionEntry("Starhopper Optional Equipment", ["Spectrometer", "Doppler Module", "Stabilizers"], [["Fuselage", "K-Basse"]]),
    createOptionEntry("Starboard Wings & Solar Technology", ["Vorshex", "Vorshex Dual", "HEXR4200", "T-Bow", "Xtara", "Janus", "Discova", "Carusa", "Longbow", "Gravos"]),
    createOptionEntry("Starboard Boosters", ["Autonami", "Ajairu", "Proteus", "Nucleo", "Xenia"]),
    createOptionEntry("Port Wings & Solar Technology", ["Vorshex", "Vorshex Dual", "HEXR4200", "T-Bow", "Xtara", "Janus", "Discova", "Carusa", "Longbow", "Gravos"]),
    createOptionEntry("Port Boosters", ["Autonami", "Ajairu", "Proteus", "Nucleo", "Xenia"])
  ]),
  createShipModel("Ekizo", "Exotic", [
    createOptionEntry("Fuselage", ["Swordfish", "Strik", "Ovu"]),
    createOptionEntry("Boosters", ["Xeres", "Contra", "Aurora", "Duetta"]),
    createOptionEntry("Wings", ["Obelik", "Nemo", "Glidus", "Ein", "Dacro"])
  ]),
  createShipModel("Ekizo 267 Special", "Exotic", []),
  createShipModel("Nobody Cares :(", "Shuttle",  [])
]

const unknown_model: ShipModel = createShipModel("Unknown", "Unknown", [])

export const shipModelByName = (name: string): ShipModel => util.find(models, name, "name") || unknown_model

// TODO validate schema, images, features adding + removing
export function create(options: SerializedShip): Ship {
  const model = shipModelByName(options.model)
  const inventory: [number, number] = options.inventory || [0,1]
  const name = options.name || ""
  const images = options.images || []
  const features = options.features ? new Map(options.features) : new Map()
  freeze(images)

  let ship = {
    get name() { return name },
    get model() { return model.name },
    get model_definition() { return model },
    get category() { return model.category },
    get inventory() { return [inventory[0], inventory[1]] },
    get images() { return images },
    get features() { return features }
  }
  freeze(ship)
  return ship
}

export function serialize(ship: Ship, stringify: boolean = false): SerializedShip | string {
  let prepared = {
    name: ship.name,
    model: ship.model,
    inventory: ship.inventory,
    images: ship.images,
    features: [...ship.features]
  }
  if (stringify) return JSON.stringify(prepared)
  else return prepared
}

export function deserialize(serialized: SerializedShip | string): Ship {
  let deserialized: SerializedShip
  if (typeof serialized === "string") deserialized = JSON.parse(serialized)
  else if (serialized instanceof Object) deserialized = serialized
  else throw new Error("invalid serialized ship")
  return create(deserialized)
}
