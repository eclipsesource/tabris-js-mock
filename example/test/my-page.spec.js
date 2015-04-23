var ClientMock = require("../../src/tabris-client-mock.js");
var tabris = require("tabris");
var myPage = require("../src/my-page.js");

var RED = "rgba(255, 0, 0, 1)";

describe("my-page", function() {

  var client;
  var page, label, input;

  beforeEach(function() {
    client = new ClientMock().start(tabris);
    page = myPage.create();
    label = page.find("#serial-label").first();
    input = page.find("TextInput").first();
  });

  describe("text input", function() {

    it("does not color label", function() {
      expect(label.get("textColor")).not.toBe(RED);
    });

    it("colors label on illegal input", function() {
      input.trigger("input", input, "foo");

      expect(label.get("textColor")).toBe(RED);
    });

    it("does not color label on legal input", function() {
      input.trigger("input", input, "123");

      expect(label.get("textColor")).not.toBe(RED);
    });

    it("resets label color on clear", function() {
      input.trigger("input", input, "123");
      input.trigger("input", input, "");

      expect(label.get("textColor")).not.toBe(RED);
    });

  });

});
