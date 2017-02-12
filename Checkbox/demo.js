(function() {
  var CheckBox, CheckCtrl, module;
  module = angular.module('app', []);
  CheckBox = function() {
    return {
      restrict: 'E',
      scope: {
        ngModel: '=',
        onChange: '&'
      },
      template: '<div ng-click="check()"> <input type="checkbox" ng-model="ngModel" ng-click="stopBubble($event)"/> </div>',
      link: function(scope, element, attrs) {
        scope.check = function() {
          console.log(1);
        };
        return scope.stopBubble = function(event) {
          console.log(23);
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
  module.directive('checkBox', CheckBox);
  module.controller('CheckCtrl', CheckCtrl);
  return CheckCtrl.$inject = ['$scope'];
})();
