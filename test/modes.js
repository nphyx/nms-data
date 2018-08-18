/* @flow */
import * as modes from "../src/modes"

describe("modes module", () => {
  it("should be a list of modes", () => {
    modes.set.should.be.an.instanceOf(Set)
    for (let mode of modes.set) {
      mode.name.should.be.an.instanceOf(String)
      mode.type.should.eql("mode")
    }
  })
  describe("modes.create", () => {
    it("should accept parameters", () => {
      modes.create("foo").name.should.eql("foo")
    })
    it("should require name", () => {
      (() => modes.create()).should.throw()
    })
  })
  describe("modes.byName", () => {
    it("should find a modes by name", () => {
      modes.byName("Normal").name.should.eql("Normal")
    })
    it("should be case-insensitive", () => {
      modes.byName("normal").name.should.eql("Normal")
      modes.byName("SURVIVAL").name.should.eql("Survival")
    })
    it("should return the unknown mode when nothing is found", () => {
      modes.byName("Fake").name.should.eql("Unknown")
    })
  })
})
