/* @flow */
import * as util from "./util"

export type EconomyType = {
  name: string,
  subtypes: Set<string>,
  color_code: string
}

export type WealthType = {
  name: string,
  subtypes: Set<string>,
  rarity: string
}

export type SerializedEconomy = {
  type?: string,
  subtype?: string,
  wealth_type?: string,
  wealth_subtype?: string,
  markets: [number, number]
}

export function createEconomyType(name: string, subtype_array: string[], color_code: string): EconomyType {
  let subtypes: Set<string> = new Set(subtype_array)
  return Object.freeze({name, subtypes, color_code})
}

export function createWealthType(name: string, subtype_array: string[], rarity: string): WealthType {
  let subtypes: Set<string> = new Set(subtype_array)
  return Object.freeze({name, subtypes, rarity})
}

export const unknown_economy: EconomyType = createEconomyType("Unknown", ["Unknown"], "")
export const unknown_wealth: WealthType = createWealthType("Unknown", ["Unknown"], "")

export const types: Array<Object> = Object.freeze([
  createEconomyType("Trading", ["Mercantile", "Trading", "Shipping", "Commercial"], "Purple"),
  createEconomyType("Advanced Materials", ["Material Fusion", "Alchemical", "Metal Processing", "Ore Processing"], "Purple"),
  createEconomyType("Scientific", ["Research", "Scientific", "Experimental", "Mathematical"], "Dark Blue"),
  createEconomyType("Mining", ["Mining", "Minerals", "Ore Extraction", "Prospecting"], "Orange"),
  createEconomyType("Manufacturing", ["Manufacturing", "Industrial", "Construction", "Mass Production"], "Yellow"),
  createEconomyType("Technology", ["High Tech", "Technology", "Nano-construction", "Engineering"], "Light Blue"),
  createEconomyType("Power Generation", ["Power Generation", "Energy Supply", "Fuel Generation", "High Voltage"], "Red")
])

export const wealth_types: Array<Object> = Object.freeze([
  createWealthType("Low", ["Declining", "Destitute", "Failing", "Fledgling", "Low supply", "Struggling", "Unsuccessful", "Unpromising"], "Common"),
  createWealthType("Medium", ["Adequate", "Balanced", "Comfortable", "Developing", "Medium Supply", "Promising", "Satisfactory", "Sustainable"], "Common"),
  createWealthType("High", ["Advanced", "Affluent", "Booming", "Flourishing", "High Supply", "Opulent", "Prosperous", "Wealthy"], "Rare")
])

export const economyTypeByName = (name: ?string): EconomyType => util.find(types, name, "name") || unknown_economy
const economyTypeBySubtype = (name: ?string): EconomyType => types.find(economy => !!util.find([...economy.subtypes], name)) || unknown_economy

const wealthTypeByName = (name: ?string): WealthType => util.find(wealth_types, name, "name") || unknown_wealth
const wealthTypeBySubtype = (name: ?string): WealthType => wealth_types.find(wealth => !!util.find([...wealth.subtypes], name)) || unknown_wealth

export type Economy = {
  buy: number,
  markets: [number, number],
  sell: number,
  subtype: string,
  type: string,
  type_definition: EconomyType,
  wealth_definition: WealthType,
  wealth_subtype: string,
  wealth_type: string
}

export function create(options: SerializedEconomy): Economy {
  let wealth_type: WealthType, economy_type: EconomyType, markets: [number, number], subtype: string, wealth_subtype: string
  if (options.wealth_subtype) {
    wealth_type = wealthTypeBySubtype(options.wealth_subtype)
  } else if (options.wealth_type) {
    wealth_type = wealthTypeByName(options.wealth_type)
  } else throw new Error("wealth type or subtype is required")
  if (options.subtype) {
    economy_type = economyTypeBySubtype(options.subtype)
  } else if (options.type) {
    economy_type = economyTypeByName(options.type)
  } else throw new Error("economy type or subtype is required")
  markets = Object.freeze(options.markets || [0,0])
  subtype = options.subtype || ""
  wealth_subtype = options.wealth_subtype || ""

  const economy = {
    get buy() { return markets[0] },
    get markets() { return markets },
    get sell() { return markets[1] },
    get subtype() { return subtype },
    get type() { return economy_type.name},
    get type_definition() { return economy_type },
    get wealth_definition() { return wealth_type },
    get wealth_subtype() { return wealth_subtype },
    get wealth_type() { return wealth_type.name}
  }
  Object.freeze(economy)
  return economy
}

export function serialize(economy: Economy, stringify: boolean = false) {
  let prepared: SerializedEconomy = Object.freeze({
    type: economy.type,
    subtype: economy.subtype,
    wealth_type: economy.wealth_type,
    wealth_subtype: economy.wealth_subtype,
    markets: [economy.buy, economy.sell]
  })
  if (stringify) return JSON.stringify(prepared)
  else return prepared
}

export function deserialize(serialized: string | SerializedEconomy) {
  if (typeof serialized === "string") serialized = JSON.parse(serialized)
  return create(serialized)
}

const economies = Object.freeze({createEconomyType, createWealthType,
  types, wealth_types, create, economyTypeByName,
  economyTypeBySubtype, wealthTypeByName, wealthTypeBySubtype, serialize, deserialize
})

export default economies
