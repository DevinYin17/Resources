(function() {
  var CheckBox, CheckBox2, CheckCtrl, module;
  module = angular.module('app', []);
  CheckBox = function($timeout) {
    return {
      restrict: 'E',
      scope: {
        ngModel: '=',
        onChange: '&'
      },
      replace: true,
      transclude: true,
      template: '<label class="checkbox" ng-class="{\'check\': ngModel}" ng-click="check()" ng-transclude></label>',
      link: function(scope, element, attrs) {
        return scope.check = function() {
          scope.ngModel = !scope.ngModel;
          return $timeout(function() {
            if (angular.isFunction(scope.onChange())) {
              return scope.onChange()();
            }
          });
        };
      }
    };
  };
  CheckBox2 = function($timeout) {
    return {
      restrict: 'E',
      scope: {
        ngModel: '=',
        onChange: '&'
      },
      replace: true,
      transclude: true,
      template: '<label class="checkbox" ng-class="{\'check\': ngModel}"> <input type="checkbox" ng-model="ngModel" ng-click="check()"/> <span ng-transclude></span> </label>',
      link: function(scope, element, attrs) {
        return scope.check = function() {
          return $timeout(function() {
            if (angular.isFunction(scope.onChange())) {
              return scope.onChange()();
            }
          });
        };
      }
    };
  };
  CheckCtrl = function($scope) {
    $scope.check = true;
    $scope.check2 = false;
    $scope.checkCallBcak = function() {
      return console.log($scope.check);
    };
    return $scope.checkCallBcak2 = function() {
      return console.log($scope.check2);
    };
  };
  module.directive('checkBox', ['$timeout', CheckBox]);
  module.directive('checkBoxWithCheckbox', ['$timeout', CheckBox2]);
  module.controller('CheckCtrl', CheckCtrl);
  return CheckCtrl.$inject = ['$scope'];
})();
