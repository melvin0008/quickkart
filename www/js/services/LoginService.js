app.factory("LoginService", function($rootScope,$firebaseObject,$firebaseArray,$state,$firebaseAuth,$ionicUser,FirebaseService) {

return{
	login:function(){
		var self=this;
		var ref = FirebaseService.get();
		var auth=$firebaseAuth(ref)
		var scopeforgoogle={scope:'email'}
		auth.$authWithOAuthPopup('google', scopeforgoogle).then(function (authData, error) {
		    if (error) {
				    console.log("Login Failed!", error);
				  } else {
				  	var emailId=authData.google.email
				  	emailId=emailId.split("@")[0].replace('.','')
				    console.log("Authenticated successfully with payload:",emailId);
				    $rootScope.emailId=emailId
				    window.localStorage['emailId']=emailId
				     FirebaseService.get('Users').child(emailId).once('value',function(snapshot){
				     	if(snapshot.val()==null)
				     	{
				     		 var user = $ionicUser.get();
						      if(!user.user_id) {
						        // Set your user_id here, or generate a random one.
						        user.user_id = $ionicUser.generateGUID();
						        angular.extend(user, {
							        name:  emailId
							    });
						      };

						      // Identify your user with the Ionic User Service
						      $ionicUser.identify(user).then(function(){

						      });
						      FirebaseService.get('Users').child(emailId).set({'ionicId':user.user_id})
				     	}

				     })
				    $state.go('app.shoppinglist')
				  }
		});
	}
}

})