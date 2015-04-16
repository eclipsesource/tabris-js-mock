var validator = require("../src/validator.js");

describe("validator", function() {

  it("rejects empty string", function() {
    expect(validator.validSerialNr("")).toBe(false);
  });

  it("rejects whitespace", function() {
    expect(validator.validSerialNr(" ")).toBe(false);
  });

  it("rejects letters", function() {
    expect(validator.validSerialNr("a6")).toBe(false);
  });

  it("accepts single digit", function() {
    expect(validator.validSerialNr("7")).toBe(true);
  });

  it("accepts digits with dashes", function() {
    expect(validator.validSerialNr("23-42-1")).toBe(true);
  });

});
