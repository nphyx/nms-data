/* @flow */
import * as versions from "../src/versions"

describe("versions module", () => {
  it("should contain the set of versions", () => {
    versions.set.should.be.an.instanceOf(Set)
    versions.set.forEach(version => {
      version.name.should.be.an.instanceOf(String)
      version.type.should.eql("version")
      for (let update of version.updates) update.should.be.an.instanceOf(String)
    })
  })
  describe("versions.create", () => {
    it("should create a default version object", () => {
      let version = versions.create()
      version.name.should.eql("")
      version.updates.should.be.an.instanceOf(Set)
    })
    it("should accept parameters", () => {
      let version = versions.create("foo", ["bar", "baz", "quux"])
      version.name.should.eql("foo")
      version.updates.has("bar").should.be.true()
      version.updates.has("baz").should.be.true()
      version.updates.has("quux").should.be.true()
    })
    it("should be immutable", () => {
      let version = versions.create()
      ;(() => version.name = "foo").should.throw()
      ;(() => version.updates = "foo").should.throw()
    })
  }),
  describe("versions.byName", () => {
    it("should find a version by name", () => {
      versions.byName("Vanilla").name.should.eql("Vanilla")
      versions.byName("Atlas Rises").name.should.eql("Atlas Rises")
    })
    it("should be case-insensitive", () => {
      versions.byName("VANILLA").name.should.eql("Vanilla")
      versions.byName("aTLAS rISES").name.should.eql("Atlas Rises")
      versions.byName("foundation").name.should.eql("Foundation")
    })
    it("should return the unknown version when nothing is found", () => {
      versions.byName("Fake").name.should.eql("Unknown")
    })
  })
  describe("versions.byUpdate", () => {
    it("should find a version by update number", () => {
      versions.byUpdate("1.03").name.should.eql("Vanilla")
      versions.byUpdate("1.23").name.should.eql("Pathfinder")
    })
    it("should return the unknown version when nothing is found", () => {
      versions.byUpdate("0.00").name.should.eql("Unknown")
    })
  })
})
