'use strict';

angular.module('angularjsTutorial', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngResource', 'ui.router'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl as mainCtrl'
      });

    $urlRouterProvider.otherwise('/');
  })

  .controller('GlobalCtrl', function(){
    this.globalObject = {
      message : 'Global'
    };
  })
;
