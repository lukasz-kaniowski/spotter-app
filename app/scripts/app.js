'use strict';

/*global translationsEn,translationsPl */


angular.module('SpotterApp', ['ionic', 'config', 'SpotterApp.main', 'SpotterApp.missions', 'pascalprecht.translate', 'SpotterApp.directives',
  'ngResource', 'ngCordova', 'angularMoment', 'timer', 'restangular'])
.run(function($ionicPlatform, appServices, amMoment, CONFIG) {
	appServices.initApp();
	amMoment.changeLocale(CONFIG.defaultLanguage);
})
.config(function(CONFIG, RestangularProvider) {
    RestangularProvider.setBaseUrl(CONFIG.apiEndpoint);
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
.config(function($translateProvider, CONFIG ) {
	$translateProvider.translations('en', translationsEn);
	$translateProvider.translations('pl', translationsPl);
	// TODO How to set preferred language?
	$translateProvider.preferredLanguage(CONFIG.defaultLanguage);
});
