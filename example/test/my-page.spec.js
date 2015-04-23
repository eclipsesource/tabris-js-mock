var ClientMock = require("../../src/tabris-client-mock.js");
var myPage = require("../src/my-page.js");

var RED = "rgba(255, 0, 0, 1)";

describe("my-page", function() {

  var client;
  var page, label, input;

  beforeEach(function() {
    client = new ClientMock().start();
    page = myPage.create();
    label = page.find("#serial-label").first();
    input = page.find("TextInput").first();
  });

  describe("text input", function() {

    it("does not color label", function() {
      expect(label.get("textColor")).not.toBe(RED);
    });

    it("colors label on illegal input", function() {
      client.widget(input).append("foo");

      expect(label.get("textColor")).toBe(RED);
    });

    it("does not color label on legal input", function() {
      client.widget(input).append("123");

      expect(label.get("textColor")).not.toBe(RED);
    });

    it("resets label color on clear", function() {
      client.widget(input).append("foo").clear();

      expect(label.get("textColor")).not.toBe(RED);
    });

  });

});
