/* @flow */
import * as util from "./util"

export type Mode = {
  name: string,
  type: "mode"
}

export function create(name: string): Mode {
  if (!name) throw new Error("name is required")
  let mode: Mode = {name, type: "mode"}
  Object.freeze(mode)
  return mode
}

const modes: Set<Mode> = new Set([
  create("Normal"),
  create("Survival"),
  create("Permadeath"),
  create("Creative")
])

export const set = modes
const modes_arr = [...modes]

export const unknown_mode: Mode = create("Unknown")
Object.freeze(unknown_mode)

export const byName = (name: string): Mode => util.find(modes_arr, name, "name") || unknown_mode
