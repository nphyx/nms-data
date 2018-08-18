/* @flow */
import * as materials from "../src/materials"
import * as util from "../src/util"

describe("materials module", () => {
  it("should export the set of materials", () => {
    materials.set.should.be.an.instanceOf(Set)
    materials.set.size.should.eql(58)
    for (let material of materials.set) material.should.be.an.Object().with.properties("name", "symbol", "group", "value")
  })
  it("should have immutable members", () => {
    for (let material of materials.set) {
      (() => material.foo = "bar").should.throw()
    }
  })
  it("should export the array of materials", () => {
    materials.array.should.be.an.instanceOf(Array)
    materials.array.length.should.eql(58)
    for (let material of materials.array) material.should.be.an.Object().with.properties("name", "symbol", "group", "value")
  })
  it("should have no duplicate entries", () => {
    let names = [...materials.set].map(el => el.name)
    let symbols = [...materials.set].map(el => el.symbol)
    names.filter(util.unique).length.should.eql(names.length)
    symbols.filter(util.unique).length.should.eql(symbols.length)
  }),
  describe("materials.groups", () => {
    it("should have a list of groups", () => {
      materials.groups.forEach(group => group.should.be.a.String())
    })
    it("should be immutable", () => {
      (() => materials.groups.push("foo")).should.throw()
    })
  })
  describe("materials.find", () => {
    it("should be a function", () => {
      materials.find.should.have.type("function")
    })
    it("should find an material by field", () => {
      materials.find("Au", "symbol").name.should.equal("Gold")
      materials.find("Gold", "name").symbol.should.equal("Au")
    })
    it("should search material symbols by default", () => {
      materials.find("Au").name.should.equal("Gold")
    })
    it("should be case-insensitive", () => {
      materials.find("AU").name.should.equal("Gold")
      materials.find("au").name.should.equal("Gold")
      materials.find("aU").name.should.equal("Gold")
    })
    it("should return the unknown material when nothing is found", () => {
      materials.find("Fake").name.should.equal("Unknown")
    })
  })
  describe("materials.filter", () => {
    it("should filter materials by field", () => {
      materials.filter("Fe", "symbol").map(el => el.name).should.deepEqual([
        "Ferrite Dust"
      ])
    })
    it("should search material groups by default", () => {
      materials.filter("Localized Mineral").length.should.eql(6)
      for (let material of materials.filter("Localized Mineral")) {
        material.group.should.eql("Localized Mineral")
      }
    })
    it("should be case-insensitive", () => {
      materials.filter("lOCALizeD mINeRaL", "group").length.should.eql(6)
    })
  })
  describe("materials.any", () => {
    it("should search for fields with any of a list of values", () => {
      materials.any(["Fuel", "Mineral", "Stellar"], "group").length.should.eql(17)
      for (let material of materials.any(["Fuel", "Mineral", "Goop"], "group")) {
        ["Fuel", "Mineral"].indexOf(material.group).should.not.eql(-1)
      }
      materials.any(["Gold", "Silver", "Platinum", "Iron"], "name").length.should.eql(3)
    })
    it("should search material symbols by default", () => {
      materials.any(["Fe", "Fe+", "Fe++", "Pb"]).map(el => el.name).should.deepEqual([
        "Ferrite Dust", "Pure Ferrite", "Magnetized Ferrite"
      ])
    })
    it("should be case-insensitive", () => {
      materials.any(["gold", "SILVER", "pLATinUM", "HeLIum"], "name").length.should.eql(3)
    })
  })
  describe("materials metadata", () => {
    it("should expose a generated immutable list of material groups", () => {
      materials.groups.should.be.an.Array()
      ;(() => materials.groups.push("foo")).should.throw()
      materials.groups.includes("Fuel").should.be.true()
      materials.groups.filter(util.unique).length.should.eql(materials.groups.length)
      // let's not bother testing all the groups since they may change
    })
    it("should expose a generated immutable list of material names", () => {
      materials.names.should.be.an.Array()
      ;(() => materials.names.push("foo")).should.throw()
      materials.names.includes("Gold").should.be.true()
      materials.names.filter(util.unique).length.should.eql(materials.names.length)
      // let's not bother testing all the names since they may change
    })
    it("should expose a generated immutable list of material symbols", () => {
      materials.symbols.should.be.an.Array()
      ;(() => materials.symbols.push("foo")).should.throw()
      materials.symbols.includes("Au").should.be.true()
      materials.symbols.filter(util.unique).length.should.eql(materials.symbols.length)
      // let's not bother testing all the symbols since they may change
    })
  })
})
