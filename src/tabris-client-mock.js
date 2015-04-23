/*global window: true */

if (typeof window === "undefined") {
  window = global;
}

require("tabris");

var ClientObjectMock = function(cid) {
  this.cid = cid;
  this._proxy = tabris._proxies[cid];
  this.type = this._proxy.type;
  this._props = {};
};

var ClientMock = function() {
  this.objects = {};
  this.create("tabris.Device", "tabris.Device");
};

ClientMock.prototype = {

  _getObject: function(cid) {
    if (cid in this.objects) {
      return this.objects[cid];
    }
    throw new Error("No object with cid: " + cid);
  },

  create: function(cid, type) {
    this.objects[cid] = new ClientObjectMock(cid, type);
  },

  get: function(cid, name) {
    return this._getObject(cid)._props[name];
  },

  set: function(cid, props) {
    var object = this._getObject(cid);
    for (var name in props) {
      object._props[name] = props[name];
    }
  },

  call: function() {
  },

  listen: function() {
  },

  destroy: function(cid) {
    delete this.objects[cid];
  }

};

var ClientWrapper = function() {
  this._client = new ClientMock();
};

ClientWrapper.prototype = {

  start: function(tabris) {
    tabris._init(this._client);
    return this;
  }

};

module.exports = ClientWrapper;
