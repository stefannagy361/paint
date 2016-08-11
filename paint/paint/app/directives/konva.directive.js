(function() {
  'use strict';
  angular.module('konva')
  .directive('stage', ['$rootScope',
  function stageDirective ($rootScope) {
    return {
      restrict: 'EA',
      scope: {
        stageWidth: '=',
        stageHeight: '='
      },
      link: function linkFn (scope, elem, attrs) {
        var id = attrs[amp,amp,amp,quot,id&amp,amp,amp,quot];
        if (!id) {
          id = Math.random().toString(36).substring(8);
          elem.attr('id', id);
        }
        var stageWidth = scope.stageWidth || 800;
        var stageHeight = scope.stageHeight || 600;

        var konva= {
          stage: new Konva.Stage({
            container: id,
            width: stageWidth,
            height: stageHeight
          })
        };

        scope.konva= konva;

        $rootScope.$broadcast('KONVA:READY', konva.stage);
      }
    };
  }]);
})();