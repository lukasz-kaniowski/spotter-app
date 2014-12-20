'use strict';
// Ionic Starter App, v0.9.20

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('SpotterApp', ['ionic', 'config', 'SpotterApp.main', 'SpotterApp.missions', 'pascalprecht.translate', 'ngResource', 'ngCordova'])
.run(function($ionicPlatform, appServices) {
	appServices.initApp();
})

.config(function() {

})

.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider.state('app', {
		url : '/app',
		abstract : true,
		templateUrl : 'scripts/menu.html',
		controller : 'MainCtrl'
	});

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/app/missions');
})
// Language Translation
.config(function($translateProvider, CONFIG) {
	$translateProvider.translations('en', translations_en);
	$translateProvider.translations('pl', translations_pl);
	// TODO How to set preferred language?
	$translateProvider.preferredLanguage(CONFIG.defaultLanguage);
}); 