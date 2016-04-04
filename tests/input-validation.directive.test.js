describe ('progress', function(){
	var element, dirElementInput;
	beforeEach(module('CircleProgressApp'));
	
  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function(_$compile_, _$rootScope_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $rootScope.$digest();
    element = $compile("<input-validation></input-validation>")($rootScope);
    dirElementInput = element.find('input');	    
  }));
  
  describe('input validation',function(){
  	it('basic template', function(){
    	expect(element.html()).toContain("<input name=");
    	expect(element.html()).toContain("type=\"number\"");
  	});

  	it('reject NaN', function(){
        angular.element(dirElementInput[0]).val('-3f').triggerHandler('input');
        $rootScope.$apply();
        expect(angular.element(dirElementInput[0]).val()).toBe('');
  	});
  	it('reject negatives', function(){
  		
  	});
  	it('reject greater than 1', function(){

  	});
  	it('accepts between 0 and 1', function(){
        angular.element(dirElementInput[0]).val('.24').triggerHandler('input');
        $rootScope.$apply();
        expect(angular.element(dirElementInput[0]).val()).toBe('.24');
  	});
  	it('accepts 0', function(){
        angular.element(dirElementInput[0]).val('1').triggerHandler('input');
        $rootScope.$apply();
        expect(angular.element(dirElementInput[0]).val()).toBe('1');
  	});
  	it('accepts 1', function(){
        angular.element(dirElementInput[0]).val('0').triggerHandler('input');
        $rootScope.$apply();
        expect(angular.element(dirElementInput[0]).val()).toBe('0');
  	});

  });

});