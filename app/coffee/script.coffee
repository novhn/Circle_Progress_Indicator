app = angular.module('CircleProgressApp', [])
##############################
#controller for progress data#
##############################
app.controller 'ProgressController', ($scope) ->
  $scope.data =
    actualName: 'Actual'
    expectedName: 'Expected'
    actual: 0.3
    expected: 0.2
    diff: ->
      $scope.data.actual - ($scope.data.expected)
    color: ->
      if $scope.data.diff() <= -0.50
        'red'
      else if $scope.data.diff() <= -0.25
        'orange'
      else
        'green'
  $scope.round = (input) ->
    Math.round(input * 10000) * 100 / 10000

####################################
#input validation for progress data#
####################################
app.directive 'inputValidation', ->
    restrict: 'EA'
    template: '{{inputName}}: <input name="{{inputName}}" type="number" step="0.01" ng-model="inputValue"/><br>'
    scope:
      inputValue: '='
      inputName: '='
    link: (scope) ->
      scope.$watch 'inputValue', (newValue, oldValue) ->
        arr = String(newValue)
        if arr.length == 0
          return
        if arr.length == 1 and arr[0] == '.' #can lead with decimal
          return
        if isNaN(newValue) 			#must be number
          scope.inputValue = oldValue
        if arr[0] == '-' 			#can't be negative
          scope.inputValue = oldValue
        if newValue > 1.0 			#must be less than 1.0
          scope.inputValue = oldValue

#########################
#d3 SVG circle indicator#
#########################
app.directive 'd3CircleIndicator', ->
  {
    restrict: 'EA'
    template: '<svg width=\'300\' height=\'300\'></svg>'
    scope: 
    	data: '='
    link: (scope) ->
      ### watch for data changes and re-render ###
      scope.$watch('data', 
        ((newVals, oldVals) ->scope.render(newVals)), true)

      ### arc interpolate function ###
      arcTween = (transition, newSize) ->
        transition.attrTween 'd', (d) ->
          interpolate = d3.interpolate(d.size, newSize)
          (t) ->
            d.size = interpolate(t)
            arc(d)

      ### update widget on new data ###
      scope.render = (data) ->
        ### update progress arcs with new lengths ###
        path.filter((d) -> d.id == 'outer_arc')
          .transition()
          .duration(1000)
          .call(arcTween, scope.data.actual * 360)
        path.filter((d) -> d.id == 'inner_arc')
          .transition()
          .duration(1000)
          .call(arcTween, scope.data.expected * 360)

        ### update actual progress arc color ###
        d3.select('#outer_arc')
          .transition()
          .duration(2000)
          .style('fill', scope.data.color())

        ### update text representation of actual % complete ###
        d3.select('.number_actual')
          .text(Math.round(scope.data.actual * 10 * 100) / 10 + '%')

      ###################  
      #initialize widget#
      ###################

      ### canvas size ###
      width = 300
      height = 300
      ### getting out degrees-to-radians on ###
      p = Math.PI * 2
      pi180 = p / 360
      ### specify the arc in initial size ###
      data = [
        { id:'outer_arc', irad:90, orad:101, start:0, size:0, color:'green' }
        { id:'inner_arc', irad:80, orad:88,  start:0, size:0, color:'lightgreen'}
        { id:'center_circle', irad:0, orad:76, start:0, size:360, color:'lightgrey'}
      ]

      ### init canvas ###
      canvas = d3.select('svg')
      			.append('svg')
      			.attr('width', width)
      			.attr('height', height)
      			.attr('id', 'circleind')

      ### set the center of the drawing canvas ###
      group = canvas.append('g').attr('transform', 'translate(150,150)')

      ### generate arc ###
      arc = d3.svg.arc()
        .innerRadius((d, i) -> d.irad)
        .outerRadius((d, i) -> d.orad)
        .cornerRadius(10).startAngle((d, i) -> pi180 * d.start)
        .endAngle((d, i) -> pi180 * (d.start + d.size))

      ### stylize arcs and set attributes ###
      arcs = group
      	.selectAll('.arc')
      	.data(data)
      	.enter()
      	.append('g')
      	.attr('class', 'arc')
      	.attr('id', (d, i) -> d.id)
        .style('fill', (d, i) -> d.color)

      ### append arcs to path ###
      path = arcs.append('path').attr('d', arc)

      ### generate progress text at center of widget ###
      d3.select('#center_circle')
      .append('text')
      .text('Progress')
      .attr('fill', 'grey')
      .attr('font-family', 'verdana')
      .attr('font-size', '20px')
      .attr('transform', 'translate(0,25)')
      .style('text-anchor', 'middle')
      
      d3.select('#center_circle')
      .append('text')
      .attr('fill', 'black')
      .attr('font-family', 'verdana')
      .attr('font-size', '36px')
      .attr('transform', 'translate(0,5)')
      .attr('class', 'number_actual')
      .style 'text-anchor', 'middle'
  }