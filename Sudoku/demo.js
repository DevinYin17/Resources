(function(){
  angular.module('app', []).controller('SudokuCtrl', SudokuCtrl);

  SudokuCtrl.$inject = ['$scope'];
  function SudokuCtrl($scope) {
    $scope.test = '123';
  }
})();
