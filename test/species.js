/* @flow */
import * as species from "../src/species"

describe("species module", () => {
  it("should export the set of species", () => {
    species.set.should.be.an.instanceOf(Set)
    for (let s of species.set) {
      s.name.should.be.an.instanceOf(String)
      s.type.should.eql("species")
    }
  })
  it("members of the set should be immutable", () => {
    for (let s of species.set) (() => s.name = "foo").should.throw()
  })
  describe("species.create", () => {
    it("should accept parameters", () => {
      species.create("foo").name.should.eql("foo")
    })
    it("should require name", () => {
      (() => species.create()).should.throw()
    })
  })
  describe("species.byName", () => {
    it("should find a species by name", () => {
      species.byName("Gek").name.should.eql("Gek")
    })
    it("should be case-insensitive", () => {
      species.byName("korvax").name.should.eql("Korvax")
      species.byName("traveler").name.should.eql("Traveler")
    })
    it("should return the unknown species when nothing is found", () => {
      species.byName("Fake").name.should.eql("Unknown")
    })
  })
})
