var app = angular.module('CircleProgressApp', []);

  /////////////////////////////
 //controller for model data//
/////////////////////////////
app.controller('ProgressController', function($scope) {
	$scope.data = {
		actualName: "Actual",
		expectedName: "Expected",
		actual: 0.3,
		expected: 0.2,
		diff: function(){
			return ($scope.data.actual - $scope.data.expected);
		},
		color: function(){
			if ($scope.data.diff() <= -0.5){ return 'red'; }
			if ($scope.data.diff() <= -0.25){ return 'orange'; }
			else{ return 'green'; }
		}
	};
	$scope.round = function(input){
			return Math.round((input*10000))*100/10000;
	};
});

  //////////////////////////////////////
 //input validation for progress data//
//////////////////////////////////////
app.directive('inputValidation', function () {
    return {
        restrict: "EA",
        template: '{{inputName}}: <input name="{{inputName}}" type="number" step="0.01" ng-model="inputValue" /><br>',
        scope: {
            inputValue: '=',
            inputName: '='
        },
        link: function (scope) {
            scope.$watch('inputValue', function(newValue,oldValue) {
                var arr = String(newValue).split("");
                if (arr.length === 0) return;
                if (arr.length === 1 && (arr[0] === '.' )) return;    //can lead with decimal
                if (isNaN(newValue)) { scope.inputValue = oldValue; } //must be number
                if (arr[0] == '-'){ scope.inputValue = oldValue; }    //can't be negative
                if(newValue>1.0){ scope.inputValue = oldValue; }      //must be less than 1.0
            });
        }
    };
});

  ///////////////////////////
 //d3 SVG circle indicator//
///////////////////////////
app.directive("d3CircleIndicator", function() {
	return {
	    restrict : "EA",
	    template : "<svg width='300' height='300'></svg>",
        scope: {data: '='},
	    link: function(scope, elem, attrs){
            // watch for data changes and re-render
            scope.$watch('data', function(newVals, oldVals) {
                return scope.render(newVals);
            }, true);

            scope.render = function(data){
                d3.select("#circleind").remove();
                /* canvas size */
                var width = 300;
                var height = 300;
                /* getting out degrees-to-radians on */
                var p = Math.PI *2 ;
                var pi180 = p/(360);

                /* specify the arc in initial size */
                var data = [
                    /* start outer arc */
                    {irad: 90, orad: 101, start: 0, size: scope.data.actual*360, color: scope.data.color()},
                    /* start inner arc */
                    {irad: 80, orad: 88, start: 0, size: scope.data.expected*360, color: "lightgreen"},
                    /* inner grey circle */
                    {irad: 0, orad: 76, start:0, size: 360, color: "lightgrey"}
                ];

                var canvas = d3.select("svg").append("svg")
                        .attr("width",width)
                        .attr("height",height)
                        .attr("id",'circleind');

                /* set the center of the drawing canvas */
                var group = canvas.append("g")
                        .attr("transform","translate(150,150)");


                var arc = d3.svg.arc()
                        .innerRadius(function(d, i){return d.irad;})
                        .outerRadius(function(d, i){return d.orad;})
                        .cornerRadius(10)
                        .startAngle(function(d, i){return pi180*(d.start);})
                        .endAngle(function(d, i){return pi180*(d.start + d.size);})
                        ;

                var arcs = group.selectAll(".arc")
                        .data(data)
                        .enter()
                        .append("g")
                        .attr("class","arc")
                        .style("fill",function(d, i){return d.color;});

                    arcs.append("path")
                        .attr("d",arc);

                    //generate text
                    arcs.append('text').text(Math.round((scope.data.actual*10)*100)/10+"%")
                        .attr('fill','black')
                        .attr('font-family','verdana')
                        .attr('font-size','36px')
                        .attr("transform","translate(0,5)")
                        .style("text-anchor","middle");
                    arcs.append('text').text("Progress")
                        .attr('fill','grey')
                        .attr('font-family','verdana')
                        .attr('font-size','20px')
                        .attr("transform","translate(0,25)")
                        .style("text-anchor","middle");
	        }
        }
	};
});