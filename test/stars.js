/* @flow */
import * as stars from "../src/stars"

describe("stars module", () => {
  let create_options = {
    color: "Yellow"
  }
  describe("stars.createStarColor", () => {
    it("should require color, rarity, and symbols", () => {
      (() => stars.createStarColor()).should.throw()
      ;(() => stars.createStarColor("foo")).should.throw()
      ;(() => stars.createStarColor("foo", "bar")).should.throw()
      ;(() => stars.createStarColor("foo", "bar", ["N"])).should.not.throw()
    })
    it("should create a star color", () => {
      let star_color = stars.createStarColor("foo", "bar", ["N"], ["Fe"])
      star_color.name.should.eql("foo")
      star_color.rarity.should.eql("bar")
      star_color.symbols.has("N").should.be.true()
      ;[...star_color.elements][0].name.should.eql("Iron")
    })
  })
  describe("star_colors", () => {
    it("should contain a list of star colors", () => {
      stars.star_colors.should.be.an.instanceOf(Array)
      stars.star_colors.forEach(c => {
        c.name.should.be.an.instanceOf(String)
        c.rarity.should.be.an.instanceOf(String)
        c.symbols.should.be.an.instanceOf(Set)
        c.elements.should.be.an.instanceOf(Set)
      })
    })
    it("should be immutable", () => {
      stars.star_colors.forEach(c => {
        (() => c.color = "foo").should.throw()
      })
    })
  })
  describe("stars.starColorByName", () => {
    it("should find a stars by color", () => {
      stars.starColorByName("Yellow").name.should.eql("Yellow")
    })
    it("should be case-insensitive", () => {
      stars.starColorByName("blue").name.should.eql("Blue")
      stars.starColorByName("GREEN").name.should.eql("Green")
      stars.starColorByName("rED").name.should.eql("Red")
    })
    it("should return the unknown color when nothing is found", () => {
      stars.starColorByName("Fake").name.should.eql("Unknown")
    })
  })
  describe("stars.starColorBySpectralClass", () => {
    it("should find a stars by spectral class", () => {
      stars.starColorBySpectralClass("F").name.should.eql("Yellow")
      stars.starColorBySpectralClass("E0").name.should.eql("Green")
      stars.starColorBySpectralClass("O11fp").name.should.eql("Blue")
    })
    it("should return the unknown color when nothing is found", () => {
      stars.starColorBySpectralClass("Z").name.should.eql("Unknown")
      stars.starColorBySpectralClass("").name.should.eql("Unknown")
    })
  })
  describe("stars.create", () => {
    it("should require color or spectral class", () => {
      (() => stars.create()).should.throw()
      ;(() => stars.create({foo: "bar"})).should.throw()
      ;(() => stars.create({color: "foo"})).should.not.throw()
      ;(() => stars.create({spectral_class: "foo"})).should.not.throw()
    })
    it("should create a star using color", () => {
      let star = stars.create(create_options)
      let expected_class = stars.starColorByName("Yellow")
      star.color.should.eql(expected_class.name)
      star.spectral_class.should.eql("")
      star.color_definition.should.eql(expected_class)
      star.brightness.should.eql(NaN)
      star.rarity.should.eql(expected_class.rarity)
      star.elements.should.deepEqual(expected_class.elements)
    })
    it("should create a star using spectral class", () => {
      const spectral_class = "F10p"
      let star = stars.create({spectral_class})
      let expected_class = stars.starColorBySpectralClass(spectral_class)
      star.color.should.eql(expected_class.name)
      star.color_definition.should.eql(expected_class)
      star.spectral_class.should.eql(spectral_class)
      star.brightness.should.eql(10)
      star.rarity.should.eql(expected_class.rarity)
      star.elements.should.deepEqual(expected_class.elements)
    })
  })
  describe("serialization & deserialization", () => {
    let serialized, stringified
    let star = stars.create({spectral_class: "F0p"})
    let expected_class = stars.starColorByName("Yellow")
    it("should prepare a star for serialization", () => {
      serialized = stars.serialize(star)
    })
    it("should stringify a star when asked", () => {
      stringified = stars.serialize(star, true)
      stringified.should.eql(JSON.stringify(serialized))
    })
    it("should deserialize a star serialized from an object", () => {
      stars.deserialize(serialized).color_definition.should.eql(expected_class)
    })
    it("should deserialize a star from a JSON string", () => {
      stars.deserialize(stringified).color_definition.should.eql(expected_class)
    })
  })
})
