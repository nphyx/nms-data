/* @flow */
import * as platforms from "../src/platforms"

describe("platforms module", () => {
  it("should contain a list of platforms with short and long names", () => {
    platforms.set.should.be.an.instanceOf(Set)
    for (let platform of platforms.set) {
      platform.name.should.be.an.instanceOf(String)
      platform.long_name.should.be.an.instanceOf(String)
    }
  })
  describe("platforms.byName", () => {
    it("should find a platform by its short name", () => {
      platforms.byName("XB1").long_name.should.eql("Xbox One")
    })
    it("should return the unknown platform when nothing is found", () => {
      platforms.byName("Fake").long_name.should.eql("Unknown")
    })
  })
})

