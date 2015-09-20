app.factory("IonicPushService", function($firebaseArray,$state,$http) {
	return{
		pushPost:function(sendto){
			var tokens = [sendto];
			var appId = 'f8cc32d3';

			// Encode your key
			// var auth = btoa(privateKey + ':');

			// Build the request object
			var req = {
			  method: 'POST',
			  url: 'https://push.ionic.io/api/v1/push',
			  headers: {
			    'Content-Type': 'application/json',
			    'X-Ionic-Application-Id': appId
			  },
			  data: {
			    "tokens": tokens,
			    "notification": {
			      "alert":"Hey you just got some shared items!"
			    }
			  }
			};
			$http(req).success(function(resp){
			  // Handle success
			  $state.go('app.shoppinglist');
			  console.log("Ionic Push: Push success!");
			}).error(function(error){
			  // Handle error 
			  console.log("Ionic Push: Push error...");
			});
		}
	}
});
