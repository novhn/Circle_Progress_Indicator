describe ('Data Controller Unit Tests', function(){
	beforeEach(module('CircleProgressApp'));
	
	var $scope, controller;
	beforeEach(inject(function(_$controller_){
		$scope = {};
		controller = _$controller_('ProgressController',{$scope: $scope});
	}));

	describe('diff', function(){
		it('basic subtraction', function(){
			$scope.data.actual = 0.7;
			$scope.data.expected = 0.1;
			expect($scope.data.diff()).toBe(0.6);
		});
	});

	describe('color', function(){
		it('50% behind should be red', function(){
			$scope.data.actual = 0.1;
			$scope.data.expected = 0.7;
			expect($scope.data.color()).toBe("red");
		});
		it('25% behind should be orange', function(){
			$scope.data.actual = 0.2;
			$scope.data.expected = 0.5;
			expect($scope.data.color()).toBe("orange");
		});
		it('less than 25% behind should be green', function(){
			$scope.data.actual = 0.2;
			$scope.data.expected = 0.4;
			expect($scope.data.color()).toBe("green");
		});
	});
});