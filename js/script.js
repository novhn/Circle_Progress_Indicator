

var app = angular.module('CircleProgressApp', []);
//controller for model data
app.controller('ProgressController', function($scope) {
	$scope.progData = {
		actualName: "Actual",
		expectedName: "Expected",
		actual: 0.3,
		expected: 0.2,
		diff: function(){
			return ($scope.progData.actual - $scope.progData.expected);
		},
		color: function(){
			if ($scope.progData.diff() < -0.5){ return 'red'; }
			if ($scope.progData.diff() < -0.25){ return 'yellow'; }
			else{ return 'green'; }
		}
	};
	$scope.round = function(input){
			return Math.round((input*10000))*100/10000;
	};
});

//input validation for progress data
app.directive('inputValidation', function () {
    return {
        restrict: "EA",
        template: '{{inputName}}: <input name="{{inputName}}" ng-model="inputValue" /><br>',
        scope: {
            inputValue: '=',
            inputName: '='
        },
        link: function (scope) {
            scope.$watch('inputValue', function(newValue,oldValue) {
                var arr = String(newValue).split("");
                if (arr.length === 0) return;
                if (arr.length === 1 && (arr[0] === '.' )) return;
                if (isNaN(newValue)) {
                    scope.inputValue = oldValue;
                }
                if (arr[0] == '-'){
                	scope.inputValue = oldValue;
                }
                if(newValue>1.0 || newValue<0.0){
                	scope.inputValue = oldValue;
                }
            });
        }
    };
});

//d3 SVG circle indicator
app.directive("d3CircleIndicator", function() {
	return {
	    restrict : "EA",
	    template : "<svg width='850' height='200'></svg>",
	    link: function(scope, elem, attrs){

	    }
	};
});