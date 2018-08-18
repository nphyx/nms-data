/* @flow */
import * as ships from "../src/ships"

describe("ships module", () => {
  describe("ships.createOptionEntry", () => {
    it("should supply defaults", () => {
      let entry = ships.createOptionEntry()
      entry.name.should.eql("")
      entry.options.should.deepEqual(new Set())
      entry.excludes.should.deepEqual(new Map())
      entry.multi.should.be.false()
    })
    it("should handle parameters correctly", () => {
      let entry = ships.createOptionEntry(
        "foo",
        ["bar", "baz", "qux"],
        [["foo", "bar"]],
        true
      )
      entry.name.should.eql("foo")
      entry.options.should.deepEqual(new Set(["bar", "baz", "qux"]))
      entry.excludes.should.deepEqual(new Map([["foo", "bar"]]))
      entry.multi.should.be.true()
    })
    it("should override a bad options parameter", () => {
      let entry = ships.createOptionEntry(undefined, false)
      entry.options.should.deepEqual(new Set())
    })
    it("should override a bad excludes parameter", () => {
      let entry = ships.createOptionEntry(undefined, undefined, 12)
      entry.excludes.should.deepEqual(new Map())
    })
  })
  describe("ships.createShipModel", () => {
    it("should supply defaults", () => {
      ships.createShipModel().should.deepEqual({name: "", category: "", features: []})
    })
  })
  describe("ships.shipModelByName", () => {
    it("should find a ship type by name", () => {
      ships.shipModelByName(ships.models[0].name).should.eql(ships.models[0])
    })
    it("should return the unknown ship model when a model isn't found", () => {
      ships.shipModelByName("Fake").name.should.eql("Unknown")
    })
  })
  describe("ships.models", () => {
    it("should be an array of model objects", () => {
      ships.models.should.be.an.instanceOf(Array)
      ships.models.forEach(model => {
        model.should.have.properties("name", "category", "features")
        model.name.should.be.an.instanceOf(String)
        model.category.should.be.an.instanceOf(String)
        model.features.should.be.an.instanceOf(Array)
        model.features.forEach(feature => {
          feature.should.have.properties("name", "options", "excludes", "multi")
          feature.name.should.be.an.instanceOf(String)
          feature.multi.should.be.an.instanceOf(Boolean)
          feature.options.should.be.an.instanceOf(Set)
          if (feature.excludes !== null) feature.excludes.should.be.an.instanceOf(Map)
        })
      })
    })
    it("should have immutable entries", () => {
      ships.models.forEach(model => {
        (() => model.foo = "bar").should.throw()
        ; (() => model.features.push("foo")).should.throw()
        if (model.features[0]) (() => model.features[0].foo = "bar").should.throw()
      })
    })
  })
  describe("ships.create", () => {
    it("should require a ship model", () => {
      (() => ships.create()).should.throw()
    })
    it("should create a default ship", () => {
      let ship = ships.create({model: ships.models[0].name})
      ship.should.have.properties("name", "model", "model_definition", "category", "inventory", "images")
      ship.name.should.eql("")
      ship.model.should.eql(ships.models[0].name)
      ship.model_definition.should.eql(ships.models[0])
      ship.category.should.eql(ships.models[0].category)
      ship.inventory.should.deepEqual([0, 1])
      ship.features.should.deepEqual(new Map([]))
      ship.images.should.deepEqual([])
    })
    it("should allow options to override defaults", () => {
      let options = {
        model: ships.models[0].name,
        name: "foo",
        inventory: [12, 13],
        features: [["foo","bar"]],
        images: ["baz"]
      }
      let ship = ships.create(options)
      ship.model.should.eql(options.model)
      ship.model_definition.should.eql(ships.models[0])
      ship.category.should.eql(ships.models[0].category)
      ship.name.should.eql(options.name)
      ship.inventory.should.deepEqual(options.inventory)
      ship.features.should.deepEqual(new Map(options.features))
      ship.images.should.deepEqual(options.images)
    })
  })
  describe("serialization and deserialization", () => {
    let stringified, serialized
    let ship = ships.create({
      model: ships.models[0].name,
      name: "foo",
      inventory: [12, 13],
      features: [["foo", "bar"]],
      images: ["baz"]
    })
    it("should serialize a ship", () => {
      serialized = ships.serialize(ship)
      serialized.name.should.eql("foo")
      serialized.model.should.eql(ships.models[0].name)
      serialized.inventory.should.deepEqual([12, 13])
      serialized.images.should.deepEqual(["baz"])
      serialized.features.should.deepEqual([["foo", "bar"]])
    })
    it("should stringify to JSON when asked", () => {
      stringified = ships.serialize(ship, true)
      stringified.should.eql(JSON.stringify(serialized))
    })
    it("should deserialize a ship from a parsed object", () => {
      let ship = ships.deserialize(serialized)
      ship.name.should.eql("foo")
      ship.model.should.eql(ships.models[0].name)
      ship.model_definition.should.eql(ships.models[0])
      ship.category.should.eql(ships.models[0].category)
      ship.inventory.should.deepEqual([12, 13])
      ship.features.should.deepEqual(new Map([["foo", "bar"]]))
      ship.images.should.deepEqual(["baz"])
    })
    it("should deserialize a ship from a JSON string", () => {
      let ship = ships.deserialize(stringified)
      ship.name.should.eql("foo")
      ship.model.should.eql(ships.models[0].name)
      ship.model_definition.should.eql(ships.models[0])
      ship.category.should.eql(ships.models[0].category)
      ship.inventory.should.deepEqual([12, 13])
      ship.features.should.deepEqual(new Map([["foo", "bar"]]))
      ship.images.should.deepEqual(["baz"])
    })
    it("should throw an error when given an invalid deserialize parameter", () => {
      (() => ships.deserialize("foo")).should.throw()
      ;(() => ships.deserialize(123)).should.throw()
    })
  })
})
