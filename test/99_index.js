/* @flow */
import * as nmsd from "../index"

describe("nms-data", () => {
  it("should export all modules", () => {
    nmsd.biomes.should.be.an.Object()
    nmsd.commodities.should.be.an.Object()
    nmsd.economies.should.be.an.Object()
    nmsd.materials.should.be.an.Object()
    nmsd.freighters.should.be.an.Object()
    nmsd.modes.should.be.an.Object()
    nmsd.products.should.be.an.Object()
    nmsd.ships.should.be.an.Object()
    nmsd.species.should.be.an.Object()
    nmsd.versions.should.be.an.Object()
    nmsd.platforms.should.be.an.Object()
  })
})
