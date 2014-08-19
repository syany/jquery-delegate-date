;(function(){
  describe('$.Delegate', function() {

    describe('#01 Instance Test', function() {
      it('[T] execute as Function throw Error.', function() {
        var tryInstance;
        try {
          tryInstance = $.Delegate();
        } catch(e) {
          tryInstance = e;
        }
        expect(tryInstance).toEqual(Error('Kill if you didn\'t use the \'new\'.'));
      });
      it('[+] Basic new without param.', function() {
        expect(Object.create($.Delegate.prototype)).not.toBe(null);
      });
    });

    describe('#02 getInstance Test', function() {
      var target = null;

      beforeEach(function() {
        target = $.Delegate.getInstance();
      });

      it('[+] getInstance.', function() {
        expect($.Delegate.getInstance()).toBe(target);
      });
      it('[+] not equal new instance.', function() {
        expect(Object.create($.Delegate.prototype)).not.toBe(target);
      });
      it('[+] not null new instance with param.', function() {
        expect($.Delegate.getInstance('ss')).not.toBe(null);
      });
      it('[+] not equal renew instance.', function() {
        expect($.Delegate.removeInstance().getInstance()).not.toBe(target);
      });
    });
    describe('#03 Object delegate class Test', function() {
      var DelegateMath = $.Delegate.inheritInstance(Number,function() {
        this.member = arguments[0] || void(0);

      });
      $.extend(DelegateMath.prototype, {
        toFixed$ : function() {
          return this.delegateMethod('toFixed', [10.12].concat([].slice.call(arguments)));
        }
      });
      var target = null;

      beforeEach(function() {
        target = DelegateMath.getInstance();
      });

      it('[+] getInstance.', function() {
        expect(DelegateMath.getInstance()).toBe(target);
      });
      it('[+] not equal new instance.', function() {
        expect(Object.create(DelegateMath.prototype)).not.toBe(target);
      });
      it('[+] new instance with param(10) === 10.', function() {
        expect(DelegateMath.removeInstance().getInstance(10).member).toEqual(10);
      });
      it('[+] not equal renew instance.', function() {
        expect(target.toFixed$()).toEqual('10.0000000000');
      });
    });

    describe('#04 Object delegate function Test', function() {
      var DelegateMath = $.Delegate.inheritInstance(Math);

      it('[+] Property.', function() {
        expect(DelegateMath.PI).toBe(Math.PI);
      });
      it('[+] Execute.', function() {
        expect(DelegateMath.abs(-56)).toBe(56);
      });
    });

    describe('#05 Object classDelegateMethod function Test', function() {
      var DelegateMath = $.Delegate.inheritInstance(Math);
      $.extend(DelegateMath, {
        abs : function() {
          var t = DelegateMath.classDelegateMethod('abs', arguments);
          return 'String:' + t;
        }
      });

      it('[+] classDelegateMethod -56 is "String:56".', function() {
        expect(DelegateMath.abs(-56)).toBe('String:56');
      });
    });
  });
}());