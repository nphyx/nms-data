/* @flow */
import * as recipes from "../src/recipes"
import * as materials from "../src/materials"
import * as products from "../src/products"
import * as util from "../src/util"

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
      const mats = recipe.materials.filter(m => m !== "*") // we can exclude the fake "any" material
      const found = materials.any(mats).concat(products.any(mats))
      found.length.should.eql(mats.length, `${recipe.product} (${recipes.array.indexOf(recipe)}) (found: ${found.map(f => f.symbol)})`)
    }
  })
  it("should have matching materials and quantities for each recipe", () => {
    for (let recipe of recipes.set) {
      recipe.materials.length.should.eql(recipe.quantities.length)
    }
  })
  it("should return a list of recipes by required materials", () => {
    // this will break if more salt recipes are added
    recipes.byMaterial("NaCl").length.should.eql(8)
  })
  it("should return a list of recipes by product", () => {
    // this will break if more CO2 recipes are added
    recipes.byProduct("CO2").length.should.eql(4)
  })
  describe("recipes.find", () => {
    it("should be a function", () => {
      recipes.find.should.have.type("function")
    })
    it("should find a recipe by field", () => {
      recipes.find("Fe", "product").type.should.equal("refined")
    })
    it("should search recipe products by default", () => {
      recipes.find("Fe").type.should.equal("refined")
    })
    it("should be case-insensitive", () => {
      recipes.find("FE").type.should.equal("refined")
      recipes.find("fe").type.should.equal("refined")
      recipes.find("fE").type.should.equal("refined")
    })
    it("should return the unknown recipe when nothing is found", () => {
      const found = recipes.find("Fake")
      found.should.deepEqual({
        type: "unknown",
        product: "Unk",
        materials: [],
        quantities: [],
        output: 0
      })
    })
  })
  describe("recipes.filter", () => {
    it("should filter recipes by field", () => {
      recipes.filter("Fe", "product").should.have.length(1)
      recipes.filter("Fe+", "product").should.have.length(2)
      recipes.filter("crafted", "type").should.have.length(38)
    })
    it("should search recipe products by default", () => {
      recipes.filter("Fe+").length.should.eql(2)
      for (let material of recipes.filter("Fe+")) {
        material.product.should.eql("Fe+")
      }
    })
    it("should be case-insensitive", () => {
      recipes.filter("fE+", "product").length.should.eql(2)
      recipes.filter("FE+", "product").length.should.eql(2)
    })
  })
  describe("recipes.any", () => {
    it("should search for fields with any of a list of values", () => {
      const search = ["Fe", "Fe+", "Fe++", "FeO", "Fe*"]
      const found = recipes.any(search, "product")
      found.length.should.eql(11)
      for (let recipe of found) {
        search.indexOf(recipe.product).should.not.eql(-1)
      }
      recipes.any([1], "output").length.should.eql(79)
    })
    it("should search recipe products by default", () => {
      recipes.any(["Fe", "Fe+", "Fe++", "Pb"]).length.should.eql(7)
    })
    it("should be case-insensitive", () => {
      recipes.any(["fE", "FE+", "fe++", "pb"]).length.should.eql(7)
    })
  })
  describe("materials metadata", () => {
    it("should expose a generated immutable list of recipe types", () => {
      recipes.types.should.be.an.Array()
      ;(() => recipes.types.push("foo")).should.throw()
      recipes.types.includes("crafted").should.be.true()
      recipes.types.includes("refined").should.be.true()
      recipes.types.filter(util.unique).length.should.eql(recipes.types.length)
    })
    it("should expose a generated immutable list of products", () => {
      recipes.products.should.be.an.Array()
      ;(() => recipes.products.push("foo")).should.throw()
      recipes.products.includes("CO2").should.be.true()
      recipes.products.filter(util.unique).length.should.eql(recipes.products.length)
      // let's not bother testing all the names since they may change
    })
  })
})
