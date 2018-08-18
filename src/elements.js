/* @flow */
import * as util from "./util"

export type Element = {
  name: string,
  symbol: string,
  group: string,
  rarity: string
}

const element_set: Set<Element>  = new Set([
  {name: "Iron", symbol: "Fe", group: "Oxide", rarity: "Common"},
  {name: "Zinc", symbol: "Zn", group: "Oxide", rarity: "Uncommon"},
  {name: "Titanium", symbol: "Ti", group: "Oxide", rarity: "Rare"},

  {name: "Heridium", symbol: "Hr", group: "Silicate", rarity: "Common"},
  {name: "Platinum", symbol: "Pt", group: "Silicate", rarity: "Uncommon"},
  {name: "Chrysonite", symbol: "Ch", group: "Silicate", rarity: "Rare"},

  {name: "Carbon", symbol: "C", group: "Isotope", rarity: "Common"},
  {name: "Thamium9", symbol: "Th", group: "Isotope", rarity: "Uncommon"},
  {name: "Plutonium", symbol: "Pu", group: "Isotope", rarity: "Rare"},

  {name: "Nickel", symbol: "Ni", group: "Neutral", rarity: "Common"},
  {name: "Copper", symbol: "Cu", group: "Neutral", rarity: "Uncommon"},
  {name: "Iridium", symbol: "Ir", group: "Neutral", rarity: "Uncommon"},
  {name: "Aluminium", symbol: "Al", group: "Neutral", rarity: "Rare"},
  {name: "Cactus Flesh", symbol: "Cc", group: "Neutral", rarity: "Rare"},
  {name: "Coprite", symbol: "Cr", group: "Neutral", rarity: "Rare"},
  {name: "Emeril", symbol: "Em", group: "Neutral", rarity: "Rare"},
  {name: "Frost Crystal", symbol: "Fr", group: "Neutral", rarity: "Rare"},
  {name: "Fungal Mould", symbol: "Fm", group: "Neutral", rarity: "Rare"},
  {name: "Gold", symbol: "Au", group: "Neutral", rarity: "Rare"},
  {name: "Mordite", symbol: "Mo", group: "Neutral", rarity: "Rare"},
  {name: "Pugneum", symbol: "Pg", group: "Neutral", rarity: "Rare"},
  {name: "Solanium", symbol: "So", group: "Neutral", rarity: "Rare"},
  {name: "Star Bulb", symbol: "Sb", group: "Neutral", rarity: "Rare"},
  {name: "Tropheum", symbol: "Tr", group: "Neutral", rarity: "Rare"},

  {name: "Armadium", symbol: "Ar", group: "Exotic", rarity: "Rare"},
  {name: "Detritum", symbol: "De", group: "Exotic", rarity: "Rare"},
  {name: "Gamma Root", symbol: "Gr", group: "Exotic", rarity: "Rare"},
  {name: "Kelp Sac", symbol: "Ke", group: "Exotic", rarity: "Rare"},
  {name: "Marrow Bulb", symbol: "Mb", group: "Exotic", rarity: "Rare"},
  {name: "Rubeum", symbol: "Ru", group: "Exotic", rarity: "Rare"},
  {name: "Viridium", symbol: "Vi", group: "Exotic", rarity: "Rare"},
  {name: "Calium", symbol: "Ca", group: "Exotic", rarity: "Very Rare"},
  {name: "Cymatygen", symbol: "Cy", group: "Exotic", rarity: "Very Rare"},
  {name: "Murrine", symbol: "Mu", group: "Exotic", rarity: "Very Rare"},
  {name: "Omegon", symbol: "Om", group: "Exotic", rarity: "Very Rare"},
  {name: "Radnox", symbol: "Ra", group: "Exotic", rarity: "Very Rare"},

  {name: "Sulphurine", symbol: "Su", group: "Gas", rarity: "Common"},
  {name: "Radon", symbol: "Rn", group: "Gas", rarity: "Common"},
  {name: "Nitrogen", symbol: "N", group: "Gas", rarity: "Common"}
])
element_set.forEach(el => Object.freeze(el))

const element_arr: Array<Element> = [...element_set]
const unknown_element: Element = {name: "Unknown", symbol: "", group: "", rarity: ""}
Object.freeze(unknown_element)

export const set = element_set
export const find = (search: any, field: string = "symbol") => util.find(element_arr, search, field) || unknown_element
export const filter = (search: any, field: string = "group") => util.filter(element_arr, search, field)
export const any = (search: any, field: string = "symbol"): Array<Element> => util.any(element_arr, search, field)
export const uniqueProperties = (field: string) => util.uniqueProperties(element_arr, field)


export const groups = Object.freeze(uniqueProperties("group"))
export const names = Object.freeze(uniqueProperties("name"))
export const symbols = Object.freeze(uniqueProperties("symbol"))
export const rarities = Object.freeze(uniqueProperties("rarity"))
