describe ('progress', function(){
	beforeEach(module('CircleProgressApp'));
	var $controller;
	beforeEach(inject(function(_$controller_){
		$controller = _$controller_;
		}));

	describe('color', function(){
		it('50% behind should be red', function(){
			var $scope = {};
			var controller = $controller('ProgressController',{$scope: $scope});
			$scope.data.actual = 0.1;
			$scope.data.expected = 0.7;
			expect($scope.data.color()).toBe("red");
		});
		it('25% behind should be orange', function(){
			var $scope = {};
			var controller = $controller('ProgressController',{$scope: $scope});
			$scope.data.actual = 0.2;
			$scope.data.expected = 0.5;
			expect($scope.data.color()).toBe("orange");
		});
	});
});