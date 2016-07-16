// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

//Config
.config(function($stateProvider,$urlRouterProvider){
  $stateProvider
  .state('tabs',{
    url:'/tab',
    abstarct:true,
    templateUrl:'templates/tabs.html'
  })

//The home route which is also the default route
  .state('tabs.home',{
    url:'/home',
    views:{
      'home-tab':{
        templateUrl:'templates/home.html'
      }
    }
  })

//The list route which is a childof the tab route
 .state('tabs.list',{
    url:'/list',
    views:{
      'list-tab':{
        templateUrl:'templates/list.html',
        controller:'ListController'
      }
    }
  })

//Artist details Page which passes a parameter of artist id
 .state('tabs.detail',{
    url:'/list/:aId',
    views:{
      'list-tab':{
        templateUrl:'templates/detail.html',
        controller:'ListController'
      }
    }
  })

.state('tabs.calendar',{
    url:'/calendar',
    views:{
      'calendar-tab':{
        templateUrl:'templates/calendar.html',
        controller:'CalendarController'
      }
    }
  })

//The default url the app goes to once loaded or refreshed
$urlRouterProvider.otherwise('/tab/home');
})

.controller('CalendarController',['$scope','$http','$state',function($scope,$http,$state){
  $http.get('js/data.json').success(function(data){
    $scope.calendar=data.calendar;
    
//moveItem function enables the handling of item ordering
    $scope.moveItem = function (item,fromIndex,toIndex) {
      $scope.artists.splice(fromIndex,1);
      $scope.artists.splice(toIndex,0,item); 
    }

//Remove Item from array function
    $scope.removeItem = function(dayIndex,item){
      $scope.calendar[dayIndex].schedule.splice($scope.calendar[dayIndex].indexOf(item),1);
    }

//Toggle the star
    $scope.toggleStar = function(item){
      item.star = !item.star;
    }

//Do refresh
  	$scope.doRefresh = function() {
      $http.get('js/data.json').success(function(data){
      $scope.calendar=data.calendar;
      $scope.$broadcast('scroll.refreshComplete');
      });
    }
    })
}])

.controller('ListController',['$scope','$http','$state',function($scope,$http,$state){
  $http.get('js/data.json').success(function(data){
    $scope.artists=data.artists;
    //Detail page parameter, send the paramter so the item can be filtered by that date
    $scope.whichartist=$state.params.aId;

//moveItem function enables the handling of item ordering
    $scope.moveItem = function (item,fromIndex,toIndex) {
      $scope.artists.splice(fromIndex,1);
      $scope.artists.splice(toIndex,0,item); 
    }

//Remove Item from array function
    $scope.removeItem = function(fromIndex){
      $scope.artists.splice(fromIndex,1);
    }

//Toggle the star
    $scope.toggleStar = function(item){
      item.star = !item.star;
    }

//Do refresh
  	$scope.doRefresh = function() {
      $http.get('js/data.json').success(function(data){
      $scope.artists=data;
      $scope.$broadcast('scroll.refreshComplete');
      });
    }

    });
}])
