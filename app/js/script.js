var app = angular.module('CircleProgressApp', []);

  ////////////////////////////////
 //controller for progress data//
////////////////////////////////
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
			if ($scope.data.diff() <= -0.50){ return 'red'; }
			if ($scope.data.diff() <= -0.25){ return 'orange'; }
			else { return 'green'; }
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
        template: '{{inputName}}: <input name="{{inputName}}" type="number" step="0.01" ng-model="inputValue"/><br>',
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
	    link: function(scope){

            /* watch for data changes and re-render */
            scope.$watch('data', function(newVals, oldVals) {
                return scope.render(newVals);
            }, true);

            /* arc interpolate function */          
            function arcTween(transition, newSize) {
                transition.attrTween("d", function(d){
                    var interpolate = d3.interpolate(d.size, newSize);
                    return function(t){
                        d.size = interpolate(t);
                        return arc(d);
                    };
                });
            } 

            /* update widget on new data */
            scope.render = function(data){
                /* update progress arcs with new lengths */
                path.filter(function(d){return d.id=='outer_arc';})
                    .transition()
                    .duration(1000)
                    .call(arcTween, scope.data.actual*360);
                path.filter(function(d){return d.id=='inner_arc';})
                    .transition()
                    .duration(1000)
                    .call(arcTween, scope.data.expected*360);

                /* update actual progress arc color */
                d3.select("#outer_arc")
                    .transition()
                    .duration(2000)
                    .style("fill",scope.data.color());

                /* update text representation of actual % complete */
                d3.select(".number_actual")
                    .text(Math.round((scope.data.actual*10)*100)/10+"%");      
            }

              ///////////////////////  
             ///initialize widget///
            ///////////////////////
            /* canvas size */
            var width = 300;
            var height = 300;
            /* getting out degrees-to-radians on */
            var p = Math.PI *2 ;
            var pi180 = p/(360);

            /* specify the arc in initial size */
            var data = [
                /* start outer arc */
                {id: 'outer_arc', irad: 90, orad: 101, start: 0, size: 0, color: "green"},
                /* start inner arc */
                {id: 'inner_arc', irad: 80, orad: 88, start: 0, size: 0, color: "lightgreen"},
                /* inner grey circle */
                {id: 'center_circle', irad: 0, orad: 76, start:0, size: 360, color: "lightgrey"}
            ];

            /* init canvas */
            var canvas = d3.select("svg").append("svg")
                .attr("width",width)
                .attr("height",height)
                .attr("id",'circleind');

            /* set the center of the drawing canvas */
            var group = canvas.append("g")
                .attr("transform","translate(150,150)");

            /* generate arc */
            var arc = d3.svg.arc()
                    .innerRadius(function(d, i){return d.irad;})
                    .outerRadius(function(d, i){return d.orad;})
                    .cornerRadius(10)
                    .startAngle(function(d, i){return pi180*(d.start);})
                    .endAngle(function(d, i){return pi180*(d.start + d.size);}) ;

            /* stylize arcs and set attributes */
            var arcs = group.selectAll(".arc")
                    .data(data)
                    .enter()
                    .append("g")
                    .attr("class","arc")
                    .attr("id", function(d,i){return d.id;})
                    .style("fill",function(d, i){return d.color;});

            /* append arcs to path */
            var path = arcs.append("path")
                    .attr("d",arc);

            /* generate progress text at center of widget */
            d3.select("#center_circle")
                .append('text')
                .text("Progress")
                .attr('fill','grey')
                .attr('font-family','verdana')
                .attr('font-size','20px')
                .attr("transform","translate(0,25)")
                .style("text-anchor","middle");

            d3.select("#center_circle")
                .append('text')
                //actual text defined in render()
                .attr('fill','black')
                .attr('font-family','verdana')
                .attr('font-size','36px')
                .attr("transform","translate(0,5)")
                .attr("class","number_actual")
                .style("text-anchor","middle");  
        }
	};
});