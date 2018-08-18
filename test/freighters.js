/* @flow */
import * as freighters from "../src/freighters"

describe("freighters module", () => {
  describe("freighters.createFreighterModel", () => {
    it("should supply defaults", () => {
      freighters.createFreighterModel().should.deepEqual({
        name: "",
        category: "",
        segment_range: [0,0],
        features: []
      })
    })
  })
  describe("freighters.models", () => {
    it("should be an array of model objects", () => {
      freighters.models.should.be.an.instanceOf(Array)
      freighters.models.forEach(model => {
        model.should.have.properties("name", "category", "features")
        model.name.should.be.an.instanceOf(String)
        model.category.should.be.an.instanceOf(String)
        model.segment_range.should.be.an.instanceOf(Array)
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
      freighters.models.forEach(model => {
        (() => model.foo = "bar").should.throw()
        ; (() => model.features.push("foo")).should.throw()
        if (model.features[0]) (() => model.features[0].foo = "bar").should.throw()
      })
    })
  })
  describe("freighters.freighterModelByName", () => {
    it("should find a freighter type by name", () => {
      freighters.freighterModelByName(freighters.models[0].name).should.eql(freighters.models[0])
    })
    it("should return the unknown freighter model when a model isn't found", () => {
      freighters.freighterModelByName("Fake").name.should.eql("Unknown")
    })
  })
  describe("freighters.create", () => {
    it("should require a freighter model", () => {
      (() => freighters.create()).should.throw()
    })
    it("should create a default freighter", () => {
      let freighter = freighters.create({model: freighters.models[0].name})
      freighter.should.have.properties("name", "model", "model_definition", "category", "inventory", "images", "segments")
      freighter.name.should.eql("")
      freighter.model.should.eql(freighters.models[0].name)
      freighter.model_definition.should.eql(freighters.models[0])
      freighter.category.should.eql(freighters.models[0].category)
      freighter.inventory.should.deepEqual([0, 1])
      freighter.features.should.deepEqual(new Map())
      freighter.images.should.deepEqual([])
      freighter.segments.should.eql(0)
    })
    it("should allow options to override defaults", () => {
      let options = {
        model: freighters.models[0].name,
        name: "foo",
        inventory: [12, 13],
        features: [["foo", "bar"]],
        images: ["bar"]
      }
      let freighter = freighters.create(options)
      freighter.model.should.eql(freighters.models[0].name)
      freighter.model_definition.should.eql(freighters.models[0])
      freighter.category.should.eql(freighters.models[0].category)
      freighter.name.should.eql(options.name)
      freighter.inventory.should.deepEqual(options.inventory)
      freighter.features.should.deepEqual(new Map(options.features))
      freighter.images.should.deepEqual(options.images)
    })
  })
  describe("serialization and deserialization", () => {
    let stringified, serialized
    let freighter = freighters.create({
      model: freighters.models[0].name,
      name: "foo",
      inventory: [12, 13],
      segments: 3,
      features: [["foo", "bar"]],
      images: ["baz"]
    })
    it("should serialize a freighter", () => {
      serialized = freighters.serialize(freighter)
      serialized.name.should.eql("foo")
      serialized.model.should.eql(freighters.models[0].name)
      serialized.inventory.should.deepEqual([12, 13])
      serialized.segments.should.eql(3)
      serialized.images.should.deepEqual(["baz"])
      serialized.features.should.deepEqual([["foo", "bar"]])
    })
    it("should stringify to JSON when asked", () => {
      stringified = freighters.serialize(freighter, true)
      stringified.should.eql(JSON.stringify(serialized))
    })
    it("should deserialize a freighter from a parsed object", () => {
      let freighter = freighters.deserialize(serialized)
      freighter.name.should.eql("foo")
      freighter.model.should.eql(freighters.models[0].name)
      freighter.model_definition.should.eql(freighters.models[0])
      freighter.category.should.eql(freighters.models[0].category)
      freighter.inventory.should.deepEqual([12, 13])
      freighter.features.should.deepEqual(new Map([["foo", "bar"]]))
      freighter.images.should.deepEqual(["baz"])
    })
    it("should deserialize a freighter from a JSON string", () => {
      let freighter = freighters.deserialize(stringified)
      freighter.name.should.eql("foo")
      freighter.model.should.eql(freighters.models[0].name)
      freighter.model_definition.should.eql(freighters.models[0])
      freighter.category.should.eql(freighters.models[0].category)
      freighter.inventory.should.deepEqual([12, 13])
      freighter.features.should.deepEqual(new Map([["foo", "bar"]]))
      freighter.images.should.deepEqual(["baz"])
    })
    it("should throw an error when given an invalid deserialize parameter", () => {
      (() => freighters.deserialize("foo")).should.throw()
      ;(() => freighters.deserialize(123)).should.throw()
    })
  })
})
