describe ('D3 SVG Generator Unit Tests', function(){
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
  }));
  
  describe('input validation',function(){
  	it('basic template', function(){

  	});
  	it ('increases arc length on new expected data', function(){

    });
    it ('decreases arc length on new expected data', function(){

    });
    it ('increases arc length on new actual data', function(){

    });
    it ('decreases arc length on new actual data', function(){

    });
    it ('updates color on new color data', function(){

    });
    it ('updates numeric progress text on new data', function(){

    });
  });
});