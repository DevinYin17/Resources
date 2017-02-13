(function() {
  var CheckBox, CheckCtrl, module;
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
  CheckCtrl = function($scope) {
    $scope.check = true;
    return $scope.checkCallBcak = function() {
      return console.log($scope.check);
    };
  };
  module.directive('checkBox', ['$timeout', CheckBox]);
  module.controller('CheckCtrl', CheckCtrl);
  return CheckCtrl.$inject = ['$scope'];
})();
