describe ('Input Validation Unit Tests', function(){
	beforeEach(module('CircleProgressApp'));
	
	var $rootScope, element, dirElementInput, $scope;

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function(_$compile_, _$rootScope_, _$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $rootScope.$digest();
    $scope = $rootScope.$new()
    $scope.$digest();

    element = $compile("<div input-validation data=\"input\"></div>")($scope);
    $scope.$digest();
    dirElementInput = element.find('input');	    
  }));
  
  describe('input validation',function(){
  	it('basic template', function(){

  	});
  	it('rejects NaN', function(){

  	});
  	it('rejects negatives', function(){

  	});
  	it('rejects greater than 1', function(){

  	});
  	it('accepts between 0 and 1', function(){

  	});
  	it('accepts 0', function(){

  	});
  	it('accepts 1', function(){

  	});

  });

});