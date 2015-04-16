exports.validSerialNr = function(text) {
  return /^\d+(-\d+)*$/.test(text);
};
