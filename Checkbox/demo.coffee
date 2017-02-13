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

  CheckBox2 = ($timeout) ->
    return {
      restrict: 'E'
      scope:
        ngModel: '='
        onChange: '&'
      replace: true
      transclude: true
      template: '<label class="checkbox" ng-class="{\'check\': ngModel}">
                  <input type="checkbox" ng-model="ngModel" ng-click="check()"/>
                  <span ng-transclude></span>
                </label>'
      link: (scope, element, attrs) ->
        scope.check = ->
          $timeout ->
            scope.onChange()() if angular.isFunction scope.onChange()
    }

  CheckCtrl = ($scope) ->
    $scope.check = true
    $scope.check2 = false

    $scope.checkCallBcak = ->
      console.log $scope.check

    $scope.checkCallBcak2 = ->
      console.log $scope.check2

  module.directive 'checkBox', ['$timeout', CheckBox]
  module.directive 'checkBoxWithCheckbox', ['$timeout', CheckBox2]
  module.controller 'CheckCtrl', CheckCtrl
  CheckCtrl.$inject = ['$scope']
)()
