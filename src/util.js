/* @flow */
/**
 * Utility functions used throughout the NMS data modules
 */

export function maybeLowerCase<T>(val: T): T {
  return (typeof val === "string") ? val.toLowerCase() : val
}

export function unique<T>(value: T, index: number, self: Array<any>): boolean {
  return self.indexOf(value) === index
}

export function uniqueProperties(arr: Array<any>, field: string): Array<any> {
  return arr.map(el => el[field]).filter(unique)
}

export function find(arr: Array<any>, search: any, field: ?string): any {
  search = maybeLowerCase(search)
  return arr.find(el => maybeLowerCase(field ? el[field] : el) === search)
}

export function filter(arr: Array<any>, search: any, field: string): Array<any> {
  search = maybeLowerCase(search)
  return arr.filter(el => maybeLowerCase(field ? el[field] : el) === search)
}

export function any<T: Array<any>>(arr: T, search: any, field: string): T {
  search = search.map(maybeLowerCase)
  return arr.filter(el =>
    search.find(value => value === maybeLowerCase(field ? el[field] : el)) !== undefined
  )
}
