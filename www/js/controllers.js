angular.module('starter.controllers', [])

.controller('DashCtrl', function ($scope) {})

.controller('ChatsCtrl', function ($scope, Chats) {
	$scope.chats = Chats.all();
	$scope.remove = function (chat) {
		Chats.remove(chat);
	}
})

.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
	$scope.chat = Chats.get($stateParams.chatId);
})

.controller('FriendsCtrl', function ($scope, $http,Students) {
	$scope.page = 1;
	$scope.friends = [];
	$scope.reLoad = function () {
		Students.query({
			page: 1
		}, function (data) {
			$scope.friends = data;
			$scope.page = 1;
		});
	}
	$scope.loadMore = function () {
		Students.query({
			page: $scope.page
		}, function (items) {
			items.forEach(function (o) {
				$scope.friends.push(o);
			});
			$scope.$broadcast('scroll.infiniteScrollComplete');
			$scope.page++;
		});
	};
	$scope.$on('$stateChangeSuccess', function () {
		$scope.loadMore();
	});
    
})

.controller('FriendDetailCtrl', function ($scope, $stateParams, Friends) {
	$scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function ($scope) {
	$scope.settings = {
		enableFriends: true
	};
});