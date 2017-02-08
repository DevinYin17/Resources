(function(){
  angular.module('app', []).controller('SudokuCtrl', SudokuCtrl);

  SudokuCtrl.$inject = ['$scope'];
  function SudokuCtrl($scope){
    var size = [0,1,2,3,4,5,6,7,8];
    var originalData = '702030400000702093004010008000007080827030956090800000300020600570309000009080503';
    $scope.rectangleList = [];

    for(var rectangleIndex of size){
      var rectangle = [];

      for(var numberIndex of size){
        rectangle.push({
          number: originalData[rectangleIndex * 9 + numberIndex],
          index: parseInt(rectangleIndex / 3) * 3 + parseInt(numberIndex / 3) + '-' + (rectangleIndex % 3) * 3 + (numberIndex % 3),
          hover: false,
          edit: false
        });
      }
      $scope.rectangleList.push(rectangle);
    }

    $scope.hoverItem = function(rectangleIndex, numberIndex){
      var currentX = $scope.rectangleList[rectangleIndex][numberIndex].index.split('-')[0];
      var currentY = $scope.rectangleList[rectangleIndex][numberIndex].index.split('-')[1];

      $scope.rectangleList.map(function(rectangle){
        rectangle.map(function(item){
          var x = item.index.split('-')[0];
          var y = item.index.split('-')[1];
          item.hover = currentX == x || currentY == y;
        })
      })
    }

    $scope.leaveItem = function(){
      $scope.rectangleList.map(function(rectangle){
        rectangle.map(function(item){
          item.hover = false;
        })
      })
    }

    $scope.entryNumber = function(rectangleIndex, numberIndex){
      $scope.rectangleList[rectangleIndex][numberIndex].edit = true;
    }

    $scope.editNumber = function(event, rectangleIndex, numberIndex){
      if(event.keyCode == 13){
        $scope.rectangleList[rectangleIndex][numberIndex].edit = false;
      }
    }
  }
})();
