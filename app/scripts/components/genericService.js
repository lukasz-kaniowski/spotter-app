'use strict';

/**
 * @author michel-habib
 */

var app = angular.module('SpotterApp');
app.factory('genericService', function($resource, $q, CONFIG) {

	// for Ajax Calls
	var apiURL = CONFIG.apiEndpoint;
	
	var resource = $resource(apiURL+':action', {}, {
		'ajaxCall' : {
			method : 'GET',
			isArray : false,
		},
		'ajaxCall_post' : {
			method : 'POST',
			isArray : false,
		},

		'ajaxCall_array' : {
			method : 'GET',
			isArray : true,
		},

		'ajaxCall_array_post' : {
			method : 'POST',
			isArray : true,
		}
	});

	return {
		// A simplified wrapper for doing easy AJAX calls to Restful Service
		ajaxCall : function(fname, args) {
			console.log('Calling '+ fname + ' with parameters ' + args);
			var deferred = $q.defer();

			args.action = fname;

			resource.ajaxCall(args, {}, function(data) {
				console.log('Response for '+ fname + ' '+ data);
				deferred.resolve(data);
			}, function(response) {
				console.log('Response for '+ fname + ' '+ response);
				deferred.reject(response);
			});
			return deferred.promise;
		},
		ajaxCall_post : function(fname, args) {
			console.log('Calling '+ fname + ' with parameters ' + args);
			var deferred = $q.defer();
			resource.ajaxCall_post({
				action : fname
			}, args,
			function(data) {
				console.log('Response for '+ fname + ' '+ data);
				deferred.resolve(data);
			}, function(response) {
				deferred.reject(response);
			});
			return deferred.promise;
		},
		ajaxCall_array : function(fname, args) {
			// console.log('Calling '+ fname + ' with parameters ' + args);
			var deferred = $q.defer();
			args.action = fname;
			// var params = {'args':args};
			resource.ajaxCall_array(
				args,
				{}, function(data) {
				// console.log('Response for '+ fname + ' '+ data);
				deferred.resolve(data);
			}, function(response) {
				deferred.reject(response);
			});
			return deferred.promise;
		},
		ajaxCall_array_post : function(fname, args) {
			console.log('Calling '+ fname + ' with parameters ' + args);
			var deferred = $q.defer();

			resource.ajaxCall_array_post({
				action : fname
			}, args, function(data) {
				console.log('Response for '+ fname + ' '+ data);
				deferred.resolve(data);
			}, function(response) {
				deferred.reject(response);
			});
			return deferred.promise;
		},
	};
	// END OF generic API return value
});