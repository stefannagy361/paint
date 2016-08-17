(function (angular) {
  angular.module("app")
    .directive("customCanvas", customCanvasFn);

  customCanvasFn.$inject = ['canvasService'];
  function customCanvasFn(canvasService) {
    return {
      templateUrl: "app/templates/canvas.tpl.html",
      restrict: "A",
      scope: {
        'buttons': "="
      },
      link: function (scope, element, attributes) {
        canvasService.init(scope);
        scope.canvasClick = function (e) {
          canvasService.mousePos(e);
        };
      }
    };
  }
})(angular);