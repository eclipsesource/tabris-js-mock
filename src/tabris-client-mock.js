/*global window: true */

if (typeof window === "undefined") {
  window = global;
}

require("tabris");

var types = {};

var ClientObjectMock = function(cid) {
  this.cid = cid;
  this._proxy = tabris._proxies[cid];
  this.type = this._proxy.type;
  this._props = {};
  if (this.type in types) {
    var bot = types[this.type];
    if ("init" in bot) {
      bot.init.call(this);
    }
    if ("methods" in bot) {
      for(var method in bot.methods) {
        this[method] = bot.methods[method];
      }
    }
  }
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

  widget: function(widget) {
    tabris.trigger("flush");
    return this._client.objects[widget.cid];
  },

  start: function() {
    tabris._init(this._client);
    return this;
  }

};

module.exports = ClientWrapper;

var registerType = exports.registerType = function(type, methods) {
  types[type] = methods;
};

registerType("TextInput", {
  init: function() {
    this._props.text = "";
    this._props.foreground = [0, 0, 0, 255];
    this._props.background = [255, 255, 255, 255];
  },
  methods: {
    append: function(text) {
      this._props.text += text;
      tabris._notify(this.cid, "modify", {text: text});
      return this;
    },
    clear: function() {
      this._props.text = "";
      tabris._notify(this.cid, "modify", {text: ""});
      return this;
    }
  }
});

registerType("TextView", {
  init: function() {
    this._props.foreground = [0, 0, 0, 255];
    this._props.background = [255, 255, 255, 255];
  }
});
