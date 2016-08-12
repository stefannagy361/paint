(function (angular) {
  angular.module("app")
    .directive("customCanvas", customCanvasFn);

  function customCanvasFn() {
    return {
      templateUrl: "app/templates/canvas.tpl.html",
      restrict: "AEC",
      scope: {
        shapes: "="
      },
      link: function (scope, element, attributes) {
        angular.element("#ShapeContainer");
      }
    };
  }
})(angular);