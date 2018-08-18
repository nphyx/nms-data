/* @noflow */
import economies from "../src/economies"
describe("the economy module", () => {
  describe("economies.createEconomyType", () => {
    it("should create an immutable economy type", () => {
      let economy = economies.createEconomyType("foo", ["bar"], "baz")
      economy.name.should.eql("foo")
      economy.subtypes.should.be.an.instanceOf(Set)
      economy.subtypes.has("bar").should.be.true()
      economy.color_code.should.eql("baz")
      ;(() => economy.foo = "bar").should.throw()
      ;(() => economy.name = "bar").should.throw()
    })
  })
  describe("economies.createWealthType", () => {
    it("should create an immutable wealth type", () => {
      let wealth = economies.createWealthType("foo", ["bar"], "baz")
      wealth.name.should.eql("foo")
      wealth.subtypes.should.be.an.instanceOf(Set)
      wealth.subtypes.has("bar").should.be.true()
      wealth.rarity.should.eql("baz")
      ;(() => wealth.foo = "bar").should.throw()
      ;(() => wealth.name = "bar").should.throw()
    })
  })
  describe("economies.economyTypeByName", () => {
    it("should find an economy by primary type name", () => {
      economies.economyTypeByName("Trading").name.should.equal("Trading")
      economies.economyTypeByName("Power Generation").name.should.equal("Power Generation")
    })
    it("should return the unknown economy type when not matched", () => {
      economies.economyTypeByName("Fake").name.should.equal("Unknown")
    })
    it("should be case-insensitive", () => {
      economies.economyTypeByName("tRADING").name.should.equal("Trading")
      economies.economyTypeByName("POWER GENERATION").name.should.equal("Power Generation")
      economies.economyTypeByName("scientific").name.should.equal("Scientific")
    })
  })
  describe("economies.economyTypeBySubtype", () => {
    it("should find an economy by primary type name", () => {
      economies.economyTypeBySubtype("Mercantile").name.should.equal("Trading")
      economies.economyTypeBySubtype("Energy Supply").name.should.equal("Power Generation")
    })
    it("should return the unknown economy type when not matched", () => {
      economies.economyTypeBySubtype("Fake").name.should.equal("Unknown")
    })
    it("should be case-insensitive", () => {
      economies.economyTypeBySubtype("shipping").name.should.equal("Trading")
      economies.economyTypeBySubtype("ENERGY SUPPLY").name.should.equal("Power Generation")
      economies.economyTypeBySubtype("exPERimental").name.should.equal("Scientific")
    })
  })
  describe("economies.wealthTypeByName", () => {
    it("should find an wealth by primary type name", () => {
      economies.wealthTypeByName("Medium").name.should.equal("Medium")
    })
    it("should return the unknown wealth type when not matched", () => {
      economies.wealthTypeByName("Fake").name.should.equal("Unknown")
    })
    it("should be case-insensitive", () => {
      economies.wealthTypeByName("low").name.should.equal("Low")
      economies.wealthTypeByName("MEDIUM").name.should.equal("Medium")
      economies.wealthTypeByName("hIgh").name.should.equal("High")
    })
  })
  describe("economies.wealthTypeBySubtype", () => {
    it("should find an wealth by primary type name", () => {
      economies.wealthTypeBySubtype("Adequate").name.should.equal("Medium")
    })
    it("should return the unknown wealth type when not matched", () => {
      economies.wealthTypeBySubtype("Fake").name.should.equal("Unknown")
    })
    it("should be case-insensitive", () => {
      economies.wealthTypeBySubtype("destitute").name.should.equal("Low")
      economies.wealthTypeBySubtype("SUSTAINABLE").name.should.equal("Medium")
      economies.wealthTypeBySubtype("flourISHing").name.should.equal("High")
    })
  })
  describe("economies.types", () => {
    it("should be a list of economy types", () => {
      economies.types.should.be.an.instanceOf(Array)
      economies.types.forEach(type => {
        type.name.should.be.an.instanceOf(String)
        type.subtypes.should.be.an.instanceOf(Set)
        type.color_code.should.be.an.instanceOf(String)
      })
    })
    it("should be immutable", () => {
      (() => economies.types.push("foo")).should.throw()
      economies.types.forEach(type => {
        (() => type.name = "foo").should.throw()
      })
    })
  })
  describe("economies.wealth_types", () => {
    it("should be a list of economy wealth types", () => {
      economies.wealth_types.should.be.an.instanceOf(Array)
      economies.wealth_types.forEach(type => {
        type.name.should.be.an.instanceOf(String)
        type.subtypes.should.be.an.instanceOf(Set)
        type.rarity.should.be.an.instanceOf(String)
      })
    })
    it("should be immutable", () => {
      (() => economies.wealth_types.push("foo")).should.throw()
      economies.wealth_types.forEach(type => {
        (() => type.name = "foo").should.throw()
      })
    })
  })
  describe("economies.create", () => {
    it("should require type and wealth_type or subtypes thereof", () => {
      (() => economies.create()).should.throw()
      ;(() => economies.create({type: "foo"})).should.throw()
      ;(() => economies.create({wealth_type: "foo"})).should.throw()
      ;(() => economies.create({subtype: "foo"})).should.throw()
      ;(() => economies.create({wealth_subtype: "foo"})).should.throw()
      ;(() => economies.create({type: "Trading", wealth_type: "Low"})).should.not.throw()
      ;(() => economies.create({subtype: "Shipping", wealth_subtype: "Adequate"})).should.not.throw()
    })
    it("should create an economy", () => {
      let economy = economies.create({
        subtype: "Shipping",
        wealth_subtype: "Adequate",
        markets: [12.34, 43.21]
      })
      economy.type.should.eql("Trading")
      economy.subtype.should.eql("Shipping")
      economy.wealth_type.should.eql("Medium")
      economy.wealth_subtype.should.eql("Adequate")
      economy.type_definition.should.eql(economies.economyTypeByName("Trading"))
      economy.wealth_definition.should.eql(economies.wealthTypeByName("Medium"))
      economy.buy.should.eql(12.34)
      economy.sell.should.eql(43.21)
    })
    it("should create an economy using primary instead of secondary types", () => {
      let economy = economies.create({
        type: "Trading",
        wealth_type: "Medium",
        markets: [12.34, 43.21]
      })
      economy.type.should.eql("Trading")
      economy.subtype.should.eql("")
      economy.wealth_type.should.eql("Medium")
      economy.wealth_subtype.should.eql("")
      economy.type_definition.should.eql(economies.economyTypeByName("Trading"))
      economy.wealth_definition.should.eql(economies.wealthTypeByName("Medium"))
      economy.buy.should.eql(12.34)
      economy.sell.should.eql(43.21)
    })
  })
  describe("serialization & deserialization", () => {
    let serialized, stringified
    let economy = economies.create({subtype: "Shipping", wealth_subtype: "Adequate", markets: [10.5, 43.21]})
    it("should prepare a economy for serialization", () => {
      serialized = economies.serialize(economy)
      serialized.should.deepEqual({
        type: "Trading",
        subtype: "Shipping",
        wealth_type: "Medium",
        wealth_subtype: "Adequate",
        markets: [10.5, 43.21]
      })
    })
    it("should stringify a economy when asked", () => {
      stringified = economies.serialize(economy, true)
      stringified.should.eql(JSON.stringify(serialized))
    })
    it("should deserialize a economy serialized from an object", () => {
      economies.deserialize(serialized).should.deepEqual(economy)
    })
    it("should deserialize a economy from a JSON string", () => {
      economies.deserialize(stringified).should.deepEqual(economy)
    })
  })
})
