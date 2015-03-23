'use strict';

/*global translationsEn,translationsPl */


angular.module('SpotterApp', ['ionic', 'config', 'SpotterApp.main', 'SpotterApp.missions', 'SpotterApp.my-missions', 'pascalprecht.translate', 'SpotterApp.directives',
  'ngResource', 'ngCordova', 'angularMoment', 'timer', 'restangular', 'SpotterApp.missions.list', 'ngResource', 'ngStorage'])
  .run(function ($ionicPlatform, appServices, amMoment, CONFIG) {
    appServices.initApp();
    amMoment.changeLocale(CONFIG.defaultLanguage);
  })
  .config(function (CONFIG, RestangularProvider) {
    RestangularProvider.setBaseUrl(CONFIG.apiEndpoint + '/api');
    RestangularProvider.setRestangularFields({
      id: "_id"
    });
  })
  .config(function( $compileProvider ) {
    var currentImgSrcSanitizationWhitelist = $compileProvider.imgSrcSanitizationWhitelist();
    var newImgSrcSanitizationWhiteList = currentImgSrcSanitizationWhitelist.toString().slice(0,-1)
      + '|content:'
      +currentImgSrcSanitizationWhitelist.toString().slice(-1);

    console.log("Changing imgSrcSanitizationWhiteList from "+currentImgSrcSanitizationWhitelist+" to "+newImgSrcSanitizationWhiteList);
    $compileProvider.imgSrcSanitizationWhitelist(newImgSrcSanitizationWhiteList);
  })
  .constant('$ionicLoadingConfig', {
    template: 'Loading...'
  })

// Language Translation
  .config(function ($translateProvider, CONFIG) {
    $translateProvider.translations('en', translationsEn);
    $translateProvider.translations('pl', translationsPl);
    // TODO How to set preferred language?
    $translateProvider.preferredLanguage(CONFIG.defaultLanguage);
  })
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  })
  .factory('authInterceptor', function ($rootScope, $q, $localStorage, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($localStorage.token) {
          config.headers.Authorization = 'Bearer ' + $localStorage.token;
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function (response) {
        if (response.status === 401) {
          // remove any stale tokens
          delete $localStorage.token;
          $location.path('/login');
          return $q.reject(response);
        }
        else if(response.status === 500){
          $location.path('/error');
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  .run(function ($rootScope, $location, Auth, $ionicLoading) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      $ionicLoading.show();
      Auth.isLoggedInAsync(function (loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
    $rootScope.$on('$stateChangeSuccess', function (event, next) {
      $ionicLoading.hide();
    });
  })

;
