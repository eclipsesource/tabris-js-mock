var validator = require("./validator");

exports.create = function() {

  var page = tabris.create("Page", {
    title: "My Page",
    topLevel: true
  });

  tabris.create("TextView", {
    id: "serial-label",
    text: "Serial Number:",
    layoutData: {top: 16, left: 16},
  }).appendTo(page);

  tabris.create("TextInput", {
    layoutData: {left: ["#serial-label", 8], right: 16, baseline: "#serial-label"},
  }).on("input", function(widget, text) {
    var isValid = text.trim() === "" || validator.validSerialNr(text.trim());
    page.children("#serial-label").set("textColor", isValid ? "initial" : "red");
  }).appendTo(page);

  return page;

};
