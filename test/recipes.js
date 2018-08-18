/* @flow */
import * as recipes from "../src/recipes"
import * as materials from "../src/materials"
import * as products from "../src/products"

describe("the recipes module", () => {
  it("should export the set of recipes", () => {
    recipes.set.should.be.an.instanceOf(Set)
    for (let recipe of recipes.set) recipe.should.be.an.Object().with.properties("type", "materials", "quantities", "product", "output")
  })
  it("should export the array of recipes", () => {
    recipes.array.should.be.an.instanceOf(Array)
    for (let recipe of recipes.array) recipe.should.be.an.Object().with.properties("type", "materials", "quantities", "product", "output")
  })
  it("should have immutable members", () => {
    for (let recipe of recipes.set) {
      (() => recipe.foo = "bar").should.throw()
    }
  })
  it("should have valid products for each recipe", () => {
    for (let recipe of recipes.set) {
      const found = materials.find(recipe.product) !== materials.unknown ||
        products.find(recipe.product) !== products.unknown
      found.should.be.true()
    }
  })
  it("should have valid materials for each recipe", () => {
    for (let recipe of recipes.set) {
      const found = materials.any(recipe.materials).concat(products.any(recipe.materials))
      found.length.should.eql(recipe.materials.length, `${recipe.product} (${recipes.array.indexOf(recipe)}) (found: ${found.map(f => f.symbol)})`)
    }
  })
  it("should have matching materials and quantities for each recipe", () => {
    for (let recipe of recipes.set) {
      recipe.materials.length.should.eql(recipe.quantities.length)
    }
  })
  it("should return a list of recipes by required materials", () => {
    // this will break if more salt recipes are added
    recipes.byMaterial("NaCl").length.should.eql(7)
  })
})
