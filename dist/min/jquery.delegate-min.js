/*
 * $.Delegate Engine v1.0
 *
 * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2011, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Copyright 2013 syany
 * Dual licensed under the MIT or GPL Version 3 licenses.
 * Date: 2014-08-05
 */
(function(c,b,d){var a="delegateInstance";c.Delegate=function(){if(c.isFunction(this)){throw Error("Kill if you didn't use the 'new'.")}this.constructor_.apply(this,arguments)};c.extend(c.Delegate.prototype,{delegateClass:Function,constructor_:function(){this._DELEGATE_OBJ_=this.newDelegateInstance.apply(this,arguments||[]);var e=this.getPropertyNames(this.delegateClass.prototype);for(var f=0,g=e[f];(g=e[f]);f++){(function(i){var h=g;c.Delegate.delegateProperty(i,i._DELEGATE_OBJ_,h)})(this)}},getPropertyNames:function(e){return(!!Object.getOwnPropertyNames)?Object.getOwnPropertyNames(e):[]},delegateMethod:function(f,e){return this._DELEGATE_OBJ_[f].apply(this._DELEGATE_OBJ_,e||[])},newDelegateInstance:function(){return(!!arguments[0]&&arguments[0] instanceof Array)?new (this.delegateClass.bind.apply(this.delegateClass,[d].concat([].slice.call(arguments[0]))))():new (this.delegateClass.bind.apply(this.delegateClass,[d].concat([].slice.call(arguments))))()},getDelegateClass:function(){return this._DELEGATE_OBJ_}});c.extend(c.Delegate,{newInstance:function(e){return(!!arguments[1]&&arguments[1] instanceof Array)?new (e.bind.apply(e,[d].concat([].slice.call(arguments[1]))))():new (e.bind.apply(e,[].slice.call(arguments)))()},getInstance:function(){var e=c.data(this,a);if(!!e){return e}e=c.Delegate.newInstance.apply(c.Delegate.newInstance,[this].concat([].slice.call(arguments)));c.data(this,a,e);return e},removeInstance:function(){c.removeData(this,a);return this},delegateProperty:function(h,g,e){if(!!h[e]){return}var f=e;if(c.isFunction(g[f])){h[f]=function(){var i=g[f].apply(g,arguments);return/^set/.test(f)?h:i}}else{h[f]=g[f]}},delegateClassProparties:function(g,f){var h=(!!g.prototype.getPropertyNames)?g.prototype.getPropertyNames(f):c.Delegate.prototype.getPropertyNames(f);for(var e=0,j=h[e];(j=h[e]);e++){(function(i){var k=j;if(/^(?:arguments|caller|prototype)$/.test(k)){return}if(!!i[k]){return}c.Delegate.delegateProperty(i,f,k)})(g)}},inheritInstance:function(e,h){var f=h||Function;var i=e;var g=function(){if(c.isFunction(this)){return i.apply(i,arguments)}c.Delegate.apply(this,arguments);f.apply(this,arguments)};g.prototype=Object.create(c.Delegate.prototype);c.extend(g,c.Delegate);c.extend(g.prototype,{delegateClass:i});g.delegateClassProparties(g,i);g.classDelegateMethod=function(k,j){return i[k].apply(i,j||[])};return g}})})(jQuery,window);