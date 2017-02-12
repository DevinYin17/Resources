( ->
  module = angular.module 'app', []
  CheckBox = ->
    return {
      restrict: 'E'
      scope:
        ngModel: '='
        onChange: '&'
      template: '<div ng-click="check()">
                  <input type="checkbox" ng-model="ngModel" ng-click="stopBubble($event)"/>
                </div>'
      link: (scope, element, attrs) ->
        scope.check = ->
          scope.onChange()() if angular.isFunction scope.onChange()
          console.log scope.ngModel

        scope.stopBubble = (event) ->
          event.preventDefault()
          event.stopPropagation()
    }

  CheckCtrl = ($scope) ->
    $scope.check = true

    $scope.checkCallBcak = ->
      console.log $scope.check

  module.directive 'checkBox', CheckBox
  module.controller 'CheckCtrl', CheckCtrl
  CheckCtrl.$inject = ['$scope']
)()
