// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])
	.run(function ($ionicPlatform, $ionicLoading, $rootScope) {
	
		$rootScope.ctx = 'http://192.168.1.197:8080/';
		$rootScope.photoCtx = 'http://219.140.60.48:8096/';
	
		$rootScope.$on('loading:show', function () {
			$ionicLoading.show({
				template: '正在加载数据...'
			});
		});
		$rootScope.$on('loading:hide', function () {
			$ionicLoading.hide();
		});
		$ionicPlatform.ready(function () {
			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)
			if (window.cordova && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			}
			if (window.StatusBar) {
				// org.apache.cordova.statusbar required
				StatusBar.styleDefault();
			}
		});
	})
	.config(function ($stateProvider,$httpProvider, $urlRouterProvider, $ionicConfigProvider) {
		$httpProvider.interceptors.push(function ($rootScope,$q) {
			return {
				request: function (config) {
					$rootScope.$broadcast('loading:show')
					return config
				},
				response: function (response) {
					$rootScope.$broadcast('loading:hide')
					return response
				},
				requestError:function(rejection){
					$rootScope.$broadcast('loading:hide')
					return $q.reject(rejection);
				},
				responseError:function(rejection){
					$rootScope.$broadcast('loading:hide')
					return $q.reject(rejection);
				}
			}
		});
		$httpProvider.defaults.useXDomain = true;
		delete $httpProvider.defaults.headers.common['X-Requested-With'];
		$ionicConfigProvider.tabs.position('bottom');
		// Ionic uses AngularUI Router which uses the concept of states
		// Learn more here: https://github.com/angular-ui/ui-router
		// Set up the various states which the app can be in.
		// Each state's controller can be found in controllers.js
		$stateProvider

		// setup an abstract state for the tabs directive
		.state('login', {
			url: "/login",
			templateUrl: "templates/login.html",
			controller: function ($scope, $rootScope,$state,$http) {
				$scope.loginData = {
					sfz:'420683198908226746',
					zkz:'018214120031'
				};
				$scope.doLogin = function () {
					$http.post($rootScope.ctx+'login',$scope.loginData)
					.success(function(data){
						if(!data.result){
							alert(data.error);
						}
						else{
							$rootScope.reg = data.data;
							$state.go('tab.dash');	
						}
					})
					.error(function(data, status, headers, config){
						alert(data.message);
					});
				}

			}
		})
			.state('signup', {
				url: "/signup",
				templateUrl: "templates/signup.html",
				controller: function ($scope, $state) {
					$scope.username = '';
					$scope.password = '';
					$scope.phone = '';
					$scope.doSubmit = function () {
						/**
						AV.Cloud.requestSmsCode('18607195076').then(function () {
							alert('ok');
						}, function (err) {
							//发送失败
						});
						*/
					}
				}
			})
			.state('tab', {
				url: "/tab",
				abstract: true,
				templateUrl: "templates/tabs.html"
			})

		// Each tab has its own nav history stack:

		.state('tab.dash', {
			url: '/dash',
			views: {
				'tab-dash': {
					templateUrl: 'templates/tab-dash.html',
					controller: 'DashCtrl'
				}
			}
		})

		.state('tab.chats', {
			url: '/chats',
			views: {
				'tab-chats': {
					templateUrl: 'templates/tab-chats.html',
					controller: 'ChatsCtrl'
				}
			}
		})
			.state('tab.chat-detail', {
				url: '/chats/:chatId',
				views: {
					'tab-chats': {
						templateUrl: 'templates/chat-detail.html',
						controller: 'ChatDetailCtrl'
					}
				}
			})

		.state('tab.friends', {
			url: '/friends',
			views: {
				'tab-friends': {
					templateUrl: 'templates/tab-friends.html',
					controller: 'FriendsCtrl'
				}
			}
		})
			.state('tab.friend-detail', {
				url: '/friend/:friendId',
				views: {
					'tab-friends': {
						templateUrl: 'templates/friend-detail.html',
						controller: 'FriendDetailCtrl'
					}
				}
			})

		.state('tab.account', {
			url: '/account',
			views: {
				'tab-account': {
					templateUrl: 'templates/tab-account.html',
					controller: 'AccountCtrl'
				}
			}
		});

		// if none of the above states are matched, use this as the fallback
		$urlRouterProvider.otherwise('login');

	});