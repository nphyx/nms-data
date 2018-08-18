/* @flow */
import * as util from "./util"

export type Version = {
  name: string,
  updates: Set<string>,
  type: "version"
}

export function create(name: string = "", updates: Array<string> = []): Version {
  let version = {name, updates: new Set(updates), type: "version"}
  Object.freeze(version)
  return version
}

export const set: Set<Version> = new Set([
  create("Vanilla", ["1.03", "1.04", "1.05", "1.06", "1.07", "1.08", "1.09"]),
  create("Foundation", ["1.10", "1.12", "1.13"]),
  create("Pathfinder", ["1.20", "1.22", "1.23", "1.24"]),
  create("Atlas Rises", ["1.30", "1.31", "1.32", "1.33", "1.34", "1.35", "1.36", "1.37", "1.38"]),
  create("Next", ["1.40"])
])

const version_arr = [...set]

export const unknown_version = create("Unknown", [])

export const byName  = (name: string): Version => util.find(version_arr, name, "name") || unknown_version
export const byUpdate = (number: string): Version => version_arr.find(v => v.updates.has(number)) || unknown_version
