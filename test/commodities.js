/* @flow */
import * as commodities from "../src/commodities"
import * as util from "../src/util"

describe("commodities module", () => {
  it("should export the set of commodities", () => {
    commodities.set.should.be.an.instanceOf(Set)
    for (let commodity of commodities.set) commodity.should.be.an.Object().with.properties("name", "group", "supply", "demand", "value")
  })
  it("should have immutable members", () => {
    for (let commodity of commodities.set) {
      (() => commodity.foo = "bar").should.throw()
    }
  })
  it("should have no duplicate entries", () => {
    let names = [...commodities.set].map(el => el.name)
    names.filter(util.unique).length.should.eql(names.length)
  }),
  describe("commodities.create", () => {
    it("should require name and group", () => {
      (() => commodities.create()).should.throw()
      ;(() => commodities.create("foo")).should.throw()
      ;(() => commodities.create(undefined, "bar")).should.throw()
      ;(() => commodities.create("foo", "bar")).should.not.throw()
    })
    it("should create an immutable commodity object", () => {
      let com = commodities.create("foo", "bar", "baz", "qux", 12.0)
      com.name.should.eql("foo")
      com.group.should.eql("bar")
      com.supply.should.eql("baz")
      com.demand.should.eql("qux")
      com.value.should.eql(12.0)
    })
  })
  describe("commodities.names", () => {
    it("should have a list of names", () => {
      commodities.names.should.be.an.Array()
    })
    it("should be immutable", () => {
      (() => commodities.names.push("foo")).should.throw()
    })
  })
  describe("commodities.groups", () => {
    it("should have a list of groups", () => {
      commodities.groups.should.be.an.Array()
    })
    it("should be immutable", () => {
      (() => commodities.groups.push("foo")).should.throw()
    })
  })
  describe("commodities.supplies", () => {
    it("should have a list of supplies", () => {
      commodities.supplies.should.be.an.Array()
    })
    it("should be immutable", () => {
      (() => commodities.supplies.push("foo")).should.throw()
    })
  })
  describe("commodities.demands", () => {
    it("should have a list of demands", () => {
      commodities.demands.should.be.an.Array()
    })
    it("should be immutable", () => {
      (() => commodities.demands.push("foo")).should.throw()
    })
  })
  describe("commodities.find", () => {
    it("should be a function", () => {
      commodities.find.should.have.type("function")
    })
    it("should find an commodity by field", () => {
      commodities.find("Gek Relic", "name").name.should.equal("Gek Relic")
    })
    it("should search commodity names by default", () => {
      commodities.find("Night Crystals").name.should.equal("Night Crystals")
    })
    it("should be case-insensitive", () => {
      commodities.find("GEK RELIC").name.should.equal("Gek Relic")
      commodities.find("gek relic").name.should.equal("Gek Relic")
      commodities.find("gEK rELIC").name.should.equal("Gek Relic")
    })
    it("should return the unknown commodity when nothing is found", () => {
      commodities.find("Fake").name.should.equal("Unknown")
    })
  })
  describe("commodities.filter", () => {
    it("should filter commodities by field", () => {
      commodities.filter("Curiosity", "group").length.should.eql(13)
      for (let commodity of commodities.filter("Curiosity", "group")) {
        commodity.group.should.eql("Curiosity")
      }
      commodities.filter("Technology", "demand").length.should.eql(5)
    })
    it("should search commodity groups by default", () => {
      commodities.filter("Curiosity").length.should.eql(13)
      for (let commodity of commodities.filter("Curiosity", "group")) {
        commodity.group.should.eql("Curiosity")
      }
    })
    it("should be case-insensitive", () => {
      commodities.filter("curiosity", "group").length.should.eql(13)
      commodities.filter("technology", "demand").length.should.eql(5)
    })
  })
  describe("commodities.any", () => {
    it("should search for fields with any of a list of values", () => {
      let found = commodities.any(["Trading", "Manufacturing", "foo"], "supply")
      found.length.should.eql(10)
      for (let commodity of found) {
        ["Trading", "Manufacturing"].indexOf(commodity.supply).should.not.eql(-1)
      }
      commodities.any(["Trading", "Manufacturing", "foo"], "demand").length.should.eql(10)
    })
    it("should search commodity names by default", () => {
      commodities.any(["Gek Relic", "Gek Charm", "bar"]).map(el => el.name)
        .should.deepEqual(["Gek Charm", "Gek Relic"])
    })
    it("should be case-insensitive", () => {
      commodities.any(["gek relic", "GEK cHARM", "bar"], "name").length.should.eql(2)
    })
  })
  describe("commodities metadata", () => {
    it("should expose a generated immutable list of commodity names", () => {
      commodities.names.should.be.an.Array()
      ;(() => commodities.names.push("foo")).should.throw()
      commodities.names.includes("Welding Soap").should.be.true()
      commodities.names.filter(util.unique).length.should.eql(commodities.names.length)
      // let's not bother testing all the names since they may change
    })
    it("should expose a generated immutable list of commodity groups", () => {
      commodities.groups.should.be.an.Array()
      ;(() => commodities.groups.push("foo")).should.throw()
      commodities.groups.includes("Curiosity").should.be.true()
      commodities.groups.filter(util.unique).length.should.eql(commodities.groups.length)
      // let's not bother testing all the groups since they may change
    })
    it("should expose a generated immutable list of commodity supplies", () => {
      commodities.supplies.should.be.an.Array()
      ;(() => commodities.supplies.push("foo")).should.throw()
      commodities.supplies.includes("Trading").should.be.true()
      commodities.supplies.filter(util.unique).length.should.eql(commodities.supplies.length)
      // let's not bother testing all the supplies since they may change
    })
    it("should expose a generated immutable list of commodity demands", () => {
      commodities.demands.should.be.an.Array()
      ;(() => commodities.demands.push("foo")).should.throw()
      commodities.demands.includes("Mining").should.be.true()
      commodities.demands.filter(util.unique).length.should.eql(commodities.demands.length)
      // let's not bother testing all the demands since they may change
    })
  })
})
