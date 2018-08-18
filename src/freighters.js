/* @flow */
import * as util from "./util"
import {createOptionEntry} from "./ships"
import type {OptionEntry} from "./ships"
const freeze = Object.freeze.bind(Object)

export type FreighterModel = {
  name: string,
  category: string,
  features: OptionEntry[],
  segment_range: [number, number]
}

export type Freighter = {
  name: string,
  model: string,
  category: string,
  segments: number,
  inventory: [number, number],
  features: Map<string, string>,
  images: string[]
}

export type SerializedFreighter = {
    name: string,
    model: string,
    inventory: [number, number],
    segments: number,
    images: string[],
    features: Array<[string, string]>
}

export function createFreighterModel(name: string = "", category: string = "", segment_range: [number, number] = [0,0], features: OptionEntry[] = []): FreighterModel {
  freeze(segment_range)
  freeze(features)
  let model = {name, category, segment_range, features}
  freeze(model)
  return model
}

export const models = [
  createFreighterModel("Sojourner", "Cruiser", [2,6], [
    createOptionEntry("Superstructure", []),
    createOptionEntry("Bow", ["Blade", "Centrifuge", "Enterprise", "Galleon", "Hammerhead", "Oculus", "Revolver"]),
    createOptionEntry("Cargo Pods", ["Spherical", "Cylinder", "Trapezoidal", "Disc"]),
    createOptionEntry("Keel", ["Dagger", "Mallet"]),
    createOptionEntry("Aft Booster", ["Crook", "Stratus"])
  ]),
  createFreighterModel("Cargo", "Transport", [2,6], [
    createOptionEntry("Superstructure", []),
    createOptionEntry("Cargo Pods", ["Spherical", "Cylinder", "Trapezoidal", "Disc"]),
    createOptionEntry("Keel", ["Dagger", "Mallet"])
  ]),
  createFreighterModel("Sentinel", "Capital", [2,7], []),
  createFreighterModel("Venator", "Capital", [2,2], [
    createOptionEntry("Superstructure", []),
    createOptionEntry("Bow", [])
  ])
]
Object.freeze(models)

const unknown_model: FreighterModel = createFreighterModel("Unknown", "Unknown", [0,0], [])

export const freighterModelByName = (name: string): FreighterModel => util.find(models, name, "name") || unknown_model


export function create(options: SerializedFreighter) {
  const model: FreighterModel = freighterModelByName(options.model)
  const inventory: [number, number] = options.inventory || [0,1]
  const name: string = options.name || ""
  const images: Array<string> = options.images || []
  const segments: number = options.segments | 0
  const features: Map<string, string> = options.features ? new Map(options.features) : new Map()

  let freighter = {
    get name() { return name },
    get model() { return model.name },
    get model_definition() { return model },
    get category() { return model.category },
    get inventory() { return [inventory[0], inventory[1]] },
    get images() { return images },
    get segments() { return segments },
    get features() { return features }
  }
  freeze(freighter)
  return freighter
}

export function serialize(freighter: Freighter, stringify: boolean = false): SerializedFreighter | string {
  let prepared = {
    name: freighter.name,
    model: freighter.model,
    inventory: [freighter.inventory[0], freighter.inventory[1]],
    segments: freighter.segments,
    images: freighter.images,
    features: [...freighter.features]
  }
  if (stringify) return JSON.stringify(prepared)
  else return prepared
}

export function deserialize(serialized: SerializedFreighter | string) {
  let deserialized: SerializedFreighter
  if (typeof serialized === "string") deserialized = JSON.parse(serialized)
  else if (serialized instanceof Object) deserialized = serialized
  else throw new Error("invalid serialized freighter")
  return create(deserialized)
}
