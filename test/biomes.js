/* @flow */
import * as biomes from "../src/biomes"

describe("biome module", () => {
  describe("biomes.createWeather", () => {
    it("should create a weather option object", () => {
      let weather = biomes.createWeather("foo", "bar", "baz")
      weather.should.be.an.instanceOf(Array)
      weather.length.should.eql(3)
      weather.should.deepEqual(["foo", "bar", "baz"])
    })
    it("should fill in empty weather levels", () => {
      biomes.createWeather().should.deepEqual([null, null, null])
      biomes.createWeather("foo").should.deepEqual(["foo", null, null])
      biomes.createWeather("foo", "bar").should.deepEqual(["foo", "bar", null])
      biomes.createWeather(null, "foo", "bar").should.deepEqual([null, "foo", "bar"])
      biomes.createWeather(null, "foo", null).should.deepEqual([null, "foo", null])
      biomes.createWeather(null, null, "bar").should.deepEqual([null, null, "bar"])
      biomes.createWeather(null, null, "foo", "bar").should.deepEqual([null, null, "foo"])
    })
  })
  describe("biomes.create", () => {
    it("should create an empty biome", () => {
      let biome = biomes.create()
      biome.name.should.be.an.instanceOf(String)
      biome.subtypes.should.be.an.instanceOf(Array)
      biome.weather.should.be.an.instanceOf(Array)
      biome.anomalies.should.be.an.instanceOf(Array)
      biome.materials.should.be.an.instanceOf(Set)
      ;([...biome.materials]).map(el => el.symbol).sort().should.deepEqual([...biomes.default_materials].sort())
    })
    it("should accept and map all options", () => {
      let options = {
        name: "foo",
        subtypes: ["foo","bar","baz"],
        weather: [["bar"]],
        anomalies: ["baz"],
        materials: ["Pg"]
      }
      let biome = biomes.create(options)
      biome.name.should.be.an.instanceOf(String)
      biome.subtypes.should.be.an.instanceOf(Array)
      biome.weather.should.be.an.instanceOf(Array)
      biome.anomalies.should.be.an.instanceOf(Array)
      biome.materials.should.be.an.instanceOf(Set)
      biome.name.should.eql("foo")
      ;(biome.subtypes).should.deepEqual(options.subtypes)
      ;([...biome.weather]).should.deepEqual([
        ["Unknown", null, null],
        ["bar", null, null]
      ])
      ;([...biome.anomalies]).should.deepEqual(["baz"])
      ;([...biome.materials]).map(el => el.symbol).sort()
        .should.deepEqual(["Pg", ...biomes.default_materials].sort())
    })
  })
  describe("the biomes set", () => {
    it("should contain the default biomes", () => {
      ([...biomes.set]).map(biome => biome.name).sort().should.deepEqual([
        "Barren",
        "Dead",
        "Exotic",
        "Frozen",
        "Irradiated",
        "Lush",
        "Scorched",
        "Toxic"
      ])
      biomes.set.forEach(biome => {
        biome.name.should.be.an.instanceOf(String)
        biome.subtypes.should.be.an.instanceOf(Array)
        biome.weather.should.be.an.instanceOf(Array)
        biome.anomalies.should.be.an.instanceOf(Array)
        biome.materials.should.be.an.instanceOf(Set)
      })
    })
  })
  describe("biomes.byName", () => {
    it("should find a biome by its name", () => {
      biomes.byName("Toxic").name.should.eql("Toxic")
    })
    it("should be case-insensitive", () => {
      biomes.byName("toxic").name.should.eql("Toxic")
      biomes.byName("TOXIC").name.should.eql("Toxic")
      biomes.byName("tOXIC").name.should.eql("Toxic")
    })
    it("should return the unknown biome when it doesn't find a biome", () => {
      biomes.byName("Fake").name.should.eql("Unknown")
    })
  })
  describe("biomes.bySubtype", () => {
    it("should find a biome by its subtype", () => {
      biomes.bySubtype("Acidic").name.should.eql("Toxic")
      biomes.bySubtype("Wind-Swept").name.should.eql("Barren")
      biomes.bySubtype("Terraforming Catastrophe").name.should.eql("Dead")
    })
    it("should be case-insensitive", () => {
      biomes.bySubtype("ACIDIC").name.should.eql("Toxic")
      biomes.bySubtype("wind-swept").name.should.eql("Barren")
      biomes.bySubtype("tERRAFORMING cATASTROPHE").name.should.eql("Dead")
    })
    it("should return the unknown biome when it doesn't find a biome", () => {
      biomes.bySubtype("Fake").name.should.eql("Unknown")
    })
  })
})
