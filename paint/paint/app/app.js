(function (angular) {
  angular.module('app', ['ui.router', 'ui.bootstrap'])
    .config(config)
    .run(run);

  config.$inject = ['$stateProvider'];
  function config($stateProvider) {
    $stateProvider.state('main', {
      templateUrl: 'app/templates/main.tpl.html',
      controller: 'MainController'
    });
  }

  run.$inject = ['$state'];
  function run($state) {
    $state.go('main');
  }
})(angular);