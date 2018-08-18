/* @flow */
import * as util from "../src/util"

const test_data = [
  {a: "foo", b: "bar", c: "baz", d: 123},
  {a: "foo", b: "baz", c: "garply", d: 456},
  {a: "qux", b: "qux", c: "waldo", d: 123},
  {a: "qux", b: "quux", c: "plugh", d: 789},
  {a: "quux", b: "quuz", c: "xyzzy", d: 789},
  {a: "corge", b: "bar", c: "thud", d: 123}
]

describe("the util module", () => {
  describe("util.maybeLowerCase", () => {
    it("should lower-case strings", () => {
      util.maybeLowerCase("FOO").should.eql("foo")
    })
    it("should not attempt to lower-case non-strings", () => {
      util.maybeLowerCase([]).should.deepEqual([])
      util.maybeLowerCase(123).should.eql(123)
    })
  })
  describe("util.unique", () => {
    it("should return the unique properties of an array", () => {
      ["foo", "foo", "bar", "baz"].filter(util.unique).should.deepEqual(["foo", "bar", "baz"])
      ;[123, 123, 456, 789].filter(util.unique).should.deepEqual([123, 456, 789])
    })
  })
  describe("util.uniqueProperties", () => {
    it("should return members have unique properties for the given field", () => {
      util.uniqueProperties(test_data, "a").length.should.eql(4)
      util.uniqueProperties(test_data, "b").length.should.eql(5)
      util.uniqueProperties(test_data, "c").length.should.eql(6)
      util.uniqueProperties(test_data, "d").length.should.eql(3)
    })
  })
  describe("util.find", () => {
    it("should search the array values when field is not supplied", () => {
      util.find(["foo", "bar", "baz"], "baz").should.eql("baz")
    })
    it("should find the first member by field", () => {
      util.find(test_data, "corge", "a").should.eql(test_data[5])
      util.find(test_data, "bar", "b").should.eql(test_data[0])
    })
    it("search term should be case-insensitive when the search is a string", () => {
      util.find(test_data, "QUX", "b").should.eql(test_data[2])
    })
  })
  describe("util.filter", () => {
    it("should search the array values when field is not supplied", () => {
      util.filter(["foo", "bar", "bar"], "bar").length.should.eql(2)
    })
    it("should find all members matching the search value", () => {
      util.filter(test_data, "foo", "a").length.should.eql(2)
      util.filter(test_data, "bar", "b").length.should.eql(2)
      util.filter(test_data, 123, "d").length.should.eql(3)
    })
    it("should be case-insensitive for string searches", () => {
      util.filter(test_data, "FOO", "a").length.should.eql(2)
    })
  })
  describe("util.any", () => {
    it("should search the array values when field is not supplied", () => {
      util.any(["foo", "bar", "baz"], ["foo", "baz"]).length.should.eql(2)
    })
    it("should find members with any of the search values in the field", () => {
      util.any(test_data, ["foo", "qux"], "a").length.should.eql(4)
      util.any(test_data, [123, 5647], "d").length.should.eql(3)
    })
  })
})
