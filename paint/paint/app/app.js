(function (angular) {
  angular.module('app', ['ui.router', 'ui.bootstrap'])
    .config(config)
    .run(run);

  config.$inject = ['$stateProvider'];
  function config($stateProvider) {
    $stateProvider.state('canvas', {
      templateUrl: 'app/templates/canvas.tpl.html',
      controller: 'MainController'
    });
  }

  run.$inject = ['$state'];
  function run($state) {
    $state.go('canvas');
  }
})(angular);