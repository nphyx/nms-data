/* @flow */
import * as elements from "../src/elements"
import * as util from "../src/util"

describe("elements module", () => {
  it("should export the set of elements", () => {
    elements.set.should.be.an.instanceOf(Set)
    elements.set.size.should.eql(39)
    for (let element of elements.set) element.should.be.an.Object().with.properties("name", "symbol", "group", "rarity")
  })
  it("should have immutable members", () => {
    for (let element of elements.set) {
      (() => element.foo = "bar").should.throw()
    }
  })
  it("should have no duplicate entries", () => {
    let names = [...elements.set].map(el => el.name)
    let symbols = [...elements.set].map(el => el.symbol)
    names.filter(util.unique).length.should.eql(names.length)
    symbols.filter(util.unique).length.should.eql(symbols.length)
  }),
  describe("elements.groups", () => {
    it("should have a list of groups", () => {
      elements.groups.should.deepEqual(["Oxide", "Silicate", "Isotope", "Neutral", "Exotic", "Gas"])
    })
    it("should be immutable", () => {
      (() => elements.groups.push("foo")).should.throw()
    })
  })
  describe("elements.rarities", () => {
    it("should have a list of rarities", () => {
      elements.rarities.should.deepEqual(["Common", "Uncommon", "Rare", "Very Rare"])
    })
    it("should be immutable", () => {
      (() => elements.rarities.push("foo")).should.throw()
    })
  })
  describe("elements.find", () => {
    it("should be a function", () => {
      elements.find.should.have.type("function")
    })
    it("should find an element by field", () => {
      elements.find("Au", "symbol").name.should.equal("Gold")
      elements.find("Aluminium", "name").symbol.should.equal("Al")
    })
    it("should search element symbols by default", () => {
      elements.find("Au").name.should.equal("Gold")
    })
    it("should be case-insensitive", () => {
      elements.find("AU").name.should.equal("Gold")
      elements.find("au").name.should.equal("Gold")
      elements.find("aU").name.should.equal("Gold")
    })
    it("should return the unknown element when nothing is found", () => {
      elements.find("Fake").name.should.equal("Unknown")
    })
  })
  describe("elements.filter", () => {
    it("should filter elements by field", () => {
      elements.filter("Silicate", "group").length.should.eql(3)
      for (let element of elements.filter("Silicate", "group")) {
        element.group.should.eql("Silicate")
      }
      elements.filter("Uncommon", "rarity").length.should.eql(5)
    })
    it("should search element groups by default", () => {
      elements.filter("Silicate").length.should.eql(3)
      for (let element of elements.filter("Silicate", "group")) {
        element.group.should.eql("Silicate")
      }
    })
    it("should be case-insensitive", () => {
      elements.filter("silicate", "group").length.should.eql(3)
      elements.filter("UNCOMMON", "rarity").length.should.eql(5)
    })
  })
  describe("elements.any", () => {
    it("should search for fields with any of a list of values", () => {
      elements.any(["Gas", "Isotope", "Metal"], "group").length.should.eql(6)
      for (let element of elements.any(["Gas", "Isotope", "Metal"], "group")) {
        ["Gas", "Isotope"].indexOf(element.group).should.not.eql(-1)
      }
      elements.any(["Gold", "Nickel", "Iron", "Helium"], "name").length.should.eql(3)
    })
    it("should search element symbols by default", () => {
      elements.any(["Fe", "Zn", "Ti", "Pb"]).map(el => el.name).should.deepEqual([
        "Iron", "Zinc", "Titanium"
      ])
    })
    it("should be case-insensitive", () => {
      elements.any(["gold", "NICKEL", "iRON", "HeLIum"], "name").length.should.eql(3)
    })
  })
  describe("elements metadata", () => {
    it("should expose a generated immutable list of element groups", () => {
      elements.groups.should.be.an.Array()
      ;(() => elements.groups.push("foo")).should.throw()
      elements.groups.includes("Oxide").should.be.true()
      elements.groups.filter(util.unique).length.should.eql(elements.groups.length)
      // let's not bother testing all the groups since they may change
    })
    it("should expose a generated immutable list of element names", () => {
      elements.names.should.be.an.Array()
      ;(() => elements.names.push("foo")).should.throw()
      elements.names.includes("Gold").should.be.true()
      elements.names.filter(util.unique).length.should.eql(elements.names.length)
      // let's not bother testing all the names since they may change
    })
    it("should expose a generated immutable list of element symbols", () => {
      elements.symbols.should.be.an.Array()
      ;(() => elements.symbols.push("foo")).should.throw()
      elements.symbols.includes("Au").should.be.true()
      elements.symbols.filter(util.unique).length.should.eql(elements.symbols.length)
      // let's not bother testing all the symbols since they may change
    })
    it("should expose a generated immutable list of element rarities", () => {
      elements.rarities.should.be.an.Array()
      ;(() => elements.rarities.push("foo")).should.throw()
      elements.rarities.includes("Common").should.be.true()
      elements.rarities.filter(util.unique).length.should.eql(elements.rarities.length)
      // let's not bother testing all the rarities since they may change
    })
  })
})
