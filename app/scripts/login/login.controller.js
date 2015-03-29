'use strict';

angular.module('SpotterApp')

  .controller('LoginCtrl', function ($scope, Auth, $location, spinner) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function (form) {
      if ($scope.login_error)
        $scope.login_error = false;

      if (form.$valid) {
        spinner.show();
        Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
          .then(function () {
            spinner.hide();
            $location.path('/');
          })
          .catch(function (err) {
            spinner.hide();
            $scope.login_error = err.message;
          });
      }
    };


  });
