var db = null;
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ionic.utils', 'ngCordova'])

.run(function($ionicPlatform, $cordovaSQLite, $cordovaStatusbar) {

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      //StatusBar.styleDefault();
      StatusBar.backgroundColorByHexString("#0C6FE9");
    }

    db = $cordovaSQLite.openDB('myapp.db');

    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS ticket(id INTEGER primary key AUTOINCREMENT,student_no TEXT not null, title TEXT not null, body TEXT, status TEXT not null, date DATETIME)");

    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS appointment(id INTEGER primary key AUTOINCREMENT,student_id TEXT not null, title TEXT not null, body TEXT, status TEXT not null, date DATETIME)");

  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider  
    .state('app', {
		url: '/app',
		abstract: true,
		templateUrl: 'templates/menu.html',
		controller: 'AppCtrl'
	})

	.state('app.updates', {
		url: '/updates',
		views: {
		  'menuContent': {
			templateUrl: 'templates/updates.html',
			controller: 'UpdatesCtrl'
		  }
		}
	})
	.state('app.details', {
		url: '/updates/:updatesId',
		views: {
		  'menuContent': {
			templateUrl: 'templates/details.html',
			controller: 'HeadlineCtrl'
		  }
		}
	})

	.state('app.reminder', {
      url: '/reminder',
      views: {
        'menuContent': {
          templateUrl: 'templates/reminder.html'
        }
      }
    })

	.state('app.timetable', {
      url: '/timetable',
      views: {
        'menuContent': {
          templateUrl: 'templates/timetable.html'
        }
      }
    })	
	
	.state('app.settings', {
    url: '/settings',
      views: {
        'menuContent': {
        templateUrl: 'templates/settings.html'
      }
    }
  })

  .state('app.nci_360', {
    url: '/nci_360',
    views: {
        'menuContent': {
          templateUrl: 'templates/nci_360.html'
      }
    }
  })

  .state('app.service', {
    url: '/nci_360/:service',
      views: {
        'menuContent': {
        templateUrl: 'templates/service.html',
        controller: 'ServiceCtrl'
      }
    }
  })

  .state('app.appointment', {
    url: '/nci_360/:appointment',
      views: {
        'menuContent': {
        templateUrl: 'templates/appointment.html'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/updates');
});
