/* @flow */
import * as util from "./util"

export type Species = {
  name: string,
  category: string,
  type: "species"
}

export function create(name: string, category: string = "Interstellar"): Species {
  if (!name) throw new Error('name is required')
  let species = {name, type: "species", category}
  Object.freeze(species)
  return species
}

export const set: Set<Species> = new Set([
  create("Gek"),
  create("Vy'keen"),
  create("Korvax"),
  create("Traveler", "Vagrant")
])

const species_arr = [...set]

export const unknown_species = create("Unknown", "Unknown")

export const byName = (name: string): Species => util.find(species_arr, name, "name") || unknown_species
