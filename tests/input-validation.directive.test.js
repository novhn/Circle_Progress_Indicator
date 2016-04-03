describe ('progress', function(){
	var element;
	beforeEach(module('CircleProgressApp'));
	
  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function(_$compile_, _$rootScope_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $rootScope.$digest();
    element = $compile("<input-validation></input-validation>")($rootScope);
  }));
  
  describe('input validation',function(){
  	it('basic template', function(){
    	expect(element.html()).toContain("<input name=");
    	expect(element.html()).toContain("type=\"number\"");
  	});

  	it('reject NaN', function(){

  	});

  	it('reject negatives', function(){

  	});
  	it('reject greater than 1', function(){

  	});
  	it('accepts between 0 and 1', function(){

  	});
  	it('accepts 0', function(){

  	});
  	it('accepts 1', function(){

  	});

  });

});