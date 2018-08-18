/* @flow */
import * as util from "./util"

export type Platform = {
  name: string,
  long_name: string,
  type: "platform"
}

export function create(name: string, long_name: string): Platform {
  const platform = {name, long_name, type: "platform"}
  Object.freeze(platform)
  return platform
}

export const set: Set<Platform> = new Set([
  create("PS4", "Playstation 4"),
  create("PC", "Windows PC"),
  create("XB1", "Xbox One")
])

const platform_arr = [...set]

export const unknown_platform = create("Unk", "Unknown")

export const byName = (name: string): Platform => util.find(platform_arr, name, "name") || unknown_platform
