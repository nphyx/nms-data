/* @flow */
import * as products from "../src/products"
import * as materials from "../src/materials"
import * as util from "../src/util"

describe("products module", () => {
  it("should export the set of products", () => {
    products.set.should.be.an.instanceOf(Set)
    for (let product of products.set) product.should.be.an.Object().with.properties("name", "symbol", "group", "price")
  })
  it("should export the array of products", () => {
    products.array.should.be.an.instanceOf(Array)
    for (let product of products.array) product.should.be.an.Object().with.properties("name", "symbol", "group", "price")
  })
  it("should have immutable members", () => {
    for (let product of products.set) {
      (() => product.foo = "bar").should.throw()
    }
  })
  it("should have no duplicate entries", () => {
    let names = [...products].map(el => el.name)
    let symbols = [...products].map(el => el.symbol)
    names.filter(util.unique).length.should.eql(names.length)
    symbols.filter(util.unique).length.should.eql(symbols.length)
  })
  it("should not collide with element symbols", () => {
    // make a nice paired map that will be spit out if there are any results, so we can fix them easily
    let colliding_materials = materials.any(products.symbols, "symbol")
    let colliding_products = products.any(colliding_materials.map(el => el.symbol), "symbol")
    colliding_materials.sort((a, b) => a.symbol > b.symbol)
    colliding_products.sort((a, b) => a.symbol > b.symbol)
    let collision_map = colliding_materials.map((el, i) => [el.name, colliding_products[i].name])
    collision_map.should.deepEqual([])
  })
  describe("products.create", () => {
    it("should require group, name, and symbol", () => {
      (() => products.create()).should.throw()
      ;(() => products.create(undefined, "foo")).should.throw()
      ;(() => products.create(undefined, undefined, "foo")).should.throw()
      ;(() => products.create("foo")).should.throw()
      ;(() => products.create("foo", "bar", "baz")).should.not.throw()
    })
    it("should create a product with default value for price", () => {
      let product = products.create("foo", "bar", "baz")
      product.name.should.eql("foo")
      product.group.should.eql("bar")
      product.symbol.should.eql("baz")
      product.price.should.eql(0)
    })
  })
  describe("products.find", () => {
    it("should be a function", () => {
      products.find.should.have.type("function")
    })
    it("should search element symbols by default", () => {
      products.find("Aro").name.should.equal("Aronium")
    })
    it("should find an element by field", () => {
      products.find("Aronium", "name").symbol.should.equal("Aro")
    })
    it("should be case-insensitive", () => {
      products.find("Aro").name.should.equal("Aronium")
      products.find("aro").name.should.equal("Aronium")
      products.find("aRo").name.should.equal("Aronium")
    })
    it("should return the unknown product when nothing is found", () => {
      products.find("Fake").name.should.equal("Unknown")
    })
  })
  describe("products.filter", () => {
    it("should search element groups by default", () => {
      let devices = products.filter("Device")
      devices.length.should.eql(3)
      for (let device of devices) {
        device.group.should.eql("Device")
      }
    })
    it("should filter products by field", () => {
      let devices = products.filter("Device", "group")
      devices.length.should.eql(3)
      for (let device of devices) {
        device.group.should.eql("Device")
      }
    })
    it("should be case-insensitive", () => {
      products.filter("alloy", "group").length.should.eql(8)
      products.filter("DEVICE", "group").length.should.eql(3)
    })
  })
  describe("products.any", () => {
    it("should search for fields with any of a list of values", () => {
      let prods = products.any(["Alloy", "Device"], "group")
      prods.length.should.eql(11)
      for (let prod of prods) {
        ["Alloy", "Device"].indexOf(prod.group).should.not.eql(-1)
      }
      products.any(["Aronium", "Herox", "Steel"], "name").length.should.eql(2)
    })
    it("should search element symbols by default", () => {
      products.any(["Aro", "Her", "foo"]).map(el => el.name).should.deepEqual([
        "Aronium", "Herox"
      ])
    })
    it("should be case-insensitive", () => {
      products.any(["aRONIUM", "HEROX", "steel"], "name").length.should.eql(2)
    })
  })

  describe("products metadata", () => {
    it("should expose a generated immutable list of product groups", () => {
      products.groups.should.be.an.Array()
      ;(() => products.groups.push("foo")).should.throw()
      products.groups.includes("Consumable").should.be.true()
      products.groups.filter(util.unique).length.should.eql(products.groups.length)
      // let's not bother testing all the groups since they may change
    })
    it("should expose a generated immutable list of product names", () => {
      products.names.should.be.an.Array()
      ;(() => products.names.push("foo")).should.throw()
      products.names.includes("Aronium").should.be.true()
      products.names.filter(util.unique).length.should.eql(products.names.length)
      // let's not bother testing all the names since they may change
    })
    it("should expose a generated immutable list of product symbols", () => {
      products.symbols.should.be.an.Array()
      ;(() => products.symbols.push("foo")).should.throw()
      products.symbols.includes("Aro").should.be.true()
      products.symbols.filter(util.unique).length.should.eql(products.symbols.length)
      // let's not bother testing all the symbols since they may change
    })
  })
})
