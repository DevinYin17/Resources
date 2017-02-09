(function() {
  var module = angular.module('app', []);
  module.directive('fileTree', ['$compile', FileTree]);
  module.controller('FileTreeCtrl', FileTreeCtrl);

  function FileTree($compile) {
    return {
      restrict: 'EA',
      scope: {
        ngModel: '=',
        nodes: '=',
        textField: '@',
        valueField: '@',
        subField: '@'
      },
      link: function(scope, element, attrs) {
        var calculateTreeMaxDeep, formatNodeArray, formatNodeObject, formatNodeTree, formatTemplate, init, isSelectAll, isShown, objectToArray, selectAll, spliceTemplate, states;
        states = {
          isFirstLoad: true
        };
        init = function() {
          if (scope.ngModel && scope.nodes && scope.nodes.length && states.isFirstLoad) {
            states.isFirstLoad = false;
            return formatNodeTree();
          }
        };
        formatNodeTree = function() {
          var maxDeep;
          scope.nodeTree = angular.copy(scope.nodes);
          formatNodeArray(scope.nodeTree);
          isSelectAll(scope.nodeTree);
          isShown(scope.nodeTree);
          maxDeep = calculateTreeMaxDeep(scope.nodeTree);
          if (maxDeep) {
            return formatTemplate(maxDeep);
          }
        };
        formatNodeArray = function(nodes) {
          var i, len, node;
          nodes = objectToArray(nodes);
          for (i = 0, len = nodes.length; i < len; i++) {
            node = nodes[i];
            node = formatNodeObject(node);
            if (node.sub) {
              node.sub = formatNodeArray(node.sub);
              node.show = false;
            }
          }
          return nodes;
        };
        formatNodeObject = function(node) {
          if (scope.textField) {
            node.text = node[scope.textField];
          }
          if (scope.valueField) {
            node.value = node[scope.valueField];
          }
          if (scope.subField) {
            node.sub = node[scope.subField];
          }
          node.checked = node.sub ? false : scope.ngModel.indexOf(node.value) > -1;
          return node;
        };
        isSelectAll = function(nodes) {
          var i, isChecked, len, node, position;
          nodes = objectToArray(nodes);
          isChecked = true;
          for (i = 0, len = nodes.length; i < len; i++) {
            node = nodes[i];
            if (node.sub) {
              node.checked = isSelectAll(node.sub);
              if (!node.checked) {
                isChecked = false;
              }
            } else {
              position = scope.ngModel.indexOf(node.value);
              if (node.checked) {
                if (position === -1) {
                  scope.ngModel.push(node.value);
                }
              } else {
                if (position > -1) {
                  scope.ngModel.splice(position, 1);
                }
                isChecked = false;
              }
            }
          }
          return isChecked;
        };
        isShown = function(nodes) {
          var i, isShow, len, node;
          isShow = false;
          for (i = 0, len = nodes.length; i < len; i++) {
            node = nodes[i];
            if (node.sub) {
              node.show = isShown(node.sub);
              if (node.show) {
                isShow = true;
              }
            } else {
              if (node.checked) {
                isShow = true;
              }
            }
          }
          return isShow;
        };
        calculateTreeMaxDeep = function(nodes) {
          var deepArray, i, len, node;
          deepArray = [];
          for (i = 0, len = nodes.length; i < len; i++) {
            node = nodes[i];
            if (node.sub) {
              deepArray.push(calculateTreeMaxDeep(node.sub) + 1);
            } else {
              deepArray.push(1);
            }
          }
          return (deepArray.sort(function(a, b) {
            return b - a;
          }))[0];
        };
        selectAll = function(nodes, checked) {
          var i, len, node, results;
          nodes = objectToArray(nodes);
          results = [];
          for (i = 0, len = nodes.length; i < len; i++) {
            node = nodes[i];
            node.checked = checked;
            if (node.sub) {
              results.push(selectAll(node.sub, checked));
            } else {
              results.push(void 0);
            }
          }
          return results;
        };
        objectToArray = function(node) {
          if (!angular.isArray(node)) {
            return [node];
          }
          return node;
        };
        formatTemplate = function(deep) {
          var i, index, ref, template, templateTail;
          template = '<div class="os-tree-select-wrap">';
          templateTail = '';
          for (index = i = 0, ref = deep; 0 <= ref ? i <= ref : i >= ref; index = 0 <= ref ? ++i : --i) {
            template += spliceTemplate(index);
            templateTail += '</ul>';
          }
          template += templateTail + '</div>';
          return element.html('').append($compile(template)(scope));
        };
        spliceTemplate = function(index) {
          var modelName, repeatModelName, subModelName, template;
          modelName = index === 0 ? 'nodeTree' : 'nodeTree' + index;
          subModelName = 'nodeTree' + (index + 1);
          repeatModelName = index === 0 ? modelName : modelName + '.sub';
          template = '<ul class="sub-menu-' + index + '" ng-if="' + repeatModelName + '" ng-show="' + modelName + '.show || ' + (index === 0) + '" ' + 'ng-repeat="' + subModelName + ' in ' + repeatModelName + '">' + '<i class="sub-menu-line-' + index + '"></i>' + '<li class="tree-node tree-node-' + index + '">' + '<i class="over-checkbox-wrap" ng-if="' + subModelName + '.sub" ng-click="showSubMenu(' + subModelName + ', $event)"></i>' + '<os-checkbox class="tree-node-checkbox" ng-class="{\'node-selected\': ' + subModelName + '.show}" type="text" ng-model="' + subModelName + '.checked" ' + 'on-change="' + subModelName + '.sub ? selectNodeAll(' + subModelName + ', nodeTree1) : selectNode(nodeTree1)">' + '<span ng-bind="{{' + subModelName + '.text}}"' + 'ng-class="{\'folder-icon\': !!' + subModelName + '.sub, \'file-icon\': !' + subModelName + '.sub, ' + '\'up-icon\': ' + subModelName + '.show, \'down-icon\': !' + subModelName + '.show}"></span>' + '</os-checkbox>' + '</li>';
          return template;
        };
        scope.selectNode = function(parentNode) {
          return isSelectAll(parentNode);
        };
        scope.selectNodeAll = function(currentNode, parentNode) {
          selectAll(currentNode, currentNode.checked);
          return scope.selectNode(parentNode);
        };
        scope.showSubMenu = function(currentNode, event) {
          currentNode.show = !currentNode.show;
          return event.stopPropagation();
        };
        scope.$watch('nodes', function() {
          return init();
        }, true);
        return scope.$watch('ngModel', function() {
          return init();
        }, true);
      }
    };
  }

  FileTreeCtrl.$inject = ['$scope'];
  function FileTreeCtrl($scope) {
    $scope.moduleList = [{
      text: 'one',
      value: 'one',
      sub: [{
        text: 'one-one',
        value: 'one-one'
      },{
        text: 'one-two',
        value: 'one-two'
      }]
    },{
      text: 'two',
      value: 'two'
    }];

    $scope.permissionList = [];
  }
})();
