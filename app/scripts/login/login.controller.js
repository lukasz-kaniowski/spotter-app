'use strict';

angular.module('SpotterApp')

  .controller('LoginCtrl', function ($scope, Auth, $location) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function (form) {
      if($scope.login_error)
        $scope.login_error = false;

      if (form.$valid) {
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
          .then(function () {
            // Logged in, redirect to home

            $location.path('/');
          })
          .catch(function (err) {
            $scope.login_error = err.message;
          });
      }
    };


  });
