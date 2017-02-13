( ->
  module = angular.module 'app', []
  CheckBox = ($timeout) ->
    return {
      restrict: 'E'
      scope:
        ngModel: '='
        onChange: '&'
      replace: true
      transclude: true
      template: '<label class="checkbox" ng-class="{\'check\': ngModel}" ng-click="check()" ng-transclude></label>'
      link: (scope, element, attrs) ->
        scope.check = ->
          scope.ngModel = not scope.ngModel
          $timeout ->
            scope.onChange()() if angular.isFunction scope.onChange()
    }

  CheckCtrl = ($scope) ->
    $scope.check = true

    $scope.checkCallBcak = ->
      console.log $scope.check

  module.directive 'checkBox', ['$timeout', CheckBox]
  module.controller 'CheckCtrl', CheckCtrl
  CheckCtrl.$inject = ['$scope']
)()
