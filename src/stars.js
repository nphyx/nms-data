/* @flow */
import * as materials from "./materials"
import * as util from "./util"
import type {Element} from "./materials"

type StarColor = {
  name: string,
  rarity: string,
  symbols: Set<string>,
  materials: Set<Element>
}

export type Star = {
  color: string,
  color_definition: StarColor,
  spectral_class: string,
  brightness: number,
  rarity: string,
  materials: Set<Element>
}

export type SerializedStar = {
  color: string,
  spectral_class: string
}

const match_spectral_brightness = new RegExp(/([0-9]+)/g)

export function createStarColor(name: ?string, rarity: ?string,
  symbols_array: string[], materials_array: string[] = []): StarColor {
  if (!name) throw new Error('name is required')
  if (!rarity) throw new Error('rarity is required')
  if (!symbols_array || !(symbols_array instanceof Array)) throw new Error('symbols is required')
  let symbols: Set<string> = new Set(symbols_array)
  let els: Set<Element> = new Set(materials.any(materials_array))
  let star_color = {name, rarity, symbols, materials: els}
  Object.freeze(star_color)
  return star_color
}

export const star_colors = Object.freeze([
  createStarColor("Yellow", "Common", ["F"]),
  createStarColor("Red", "Uncommon", ["M","K"], ["Ru"]),
  createStarColor("Green", "Rare", ["E"], ["Vi"]),
  createStarColor("Blue", "Rare", ["B","O"], ["Cy"])
])

export const unknown_color: StarColor = createStarColor("Unknown", "Unknown", [])

export const starColorByName = (color: string): StarColor => util.find(star_colors, color, "name") || unknown_color

export function starColorBySpectralClass(string: string): StarColor {
  if (string.length === 0) return unknown_color
  let symbol = string.charAt(0).toUpperCase()
  return star_colors.find(c => c.symbols.has(symbol)) || unknown_color
}

export function brightnessFromSpectralClass(spectral_class: string): number {
  return parseInt((spectral_class.match(match_spectral_brightness) || [""])[0])
}

export function create(options: SerializedStar): Star {
  let star_color: StarColor
  if (options.spectral_class) star_color = starColorBySpectralClass(options.spectral_class)
  else if (options.color) star_color = starColorByName(options.color)
  else throw new Error("star must have class or spectral class")
  const spectral_class = options.spectral_class || ""

  const star = {
    get color() { return star_color.name },
    get color_definition() { return star_color },
    get spectral_class() { return spectral_class },
    get brightness() { return brightnessFromSpectralClass(spectral_class) },
    get rarity() { return star_color.rarity },
    get materials() { return star_color.materials }
  }
  Object.freeze(star)
  return star
}

export function serialize(star: Star, stringify: boolean = false): SerializedStar | string {
  let prepared = {
    color: star.color,
    spectral_class: star.spectral_class
  }
  if (stringify) return JSON.stringify(prepared)
  else return prepared
}

export function deserialize(serialized: SerializedStar | string): Star {
  if (typeof serialized === "string") serialized = JSON.parse(serialized)
  return create(serialized)
}
