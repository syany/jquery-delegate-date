/*
 * ! polyfill support for $.Delegate
 */

/**
 * Function.bind method polyfill support
 */
if (!!!Function.prototype.bind) {
  Function.prototype.bind = function(oThis) {
    if (typeof this !== 'function') {
      // closest thing possible to the ECMAScript 5 internal IsCallable function
      throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
    }
    var aArgs = Array.prototype.slice.call(arguments, 1);
    var fToBind = this;
    var fNOP = function() {};
    var fBound = function() {
      return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
    };
    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
  };
}

/**
 * Object.create polyfill support
 */
if (!!!Object.create) {
  (function() {
    var F = function() {};
    Object.create = function(o) {
      if (arguments.length > 1) {
        throw Error('Second argument not supported');
      } else if (o === null) {
        throw Error('Cannot set a null [[Prototype]]');
      } else if (typeof o !== 'object') {
        throw TypeError('Argument must be an object');
      }
      F.prototype = o;
      return new F();
    };
  })();
}

/**
 * getOwnPropertyNames polyfill support
 */
if (!!!Object.getOwnPropertyNames) {
  (function() {
    Object.getOwnPropertyNames = function(obj) {
      var resultArray = [];
      for ( var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          resultArray.push(prop);
        }
      }
      return resultArray;
    };
  })();
}