app.factory("ItemService", function($rootScope,$q,$firebaseObject,FirebaseService){
	return {
		get:function(){
			var username=window.localStorage['emailId']
			 // var deferred = $q.defer();
			return FirebaseService.get('Users/'+username)
			//  // return deferred.promise;
		},
		getUserProduct:function(itemList){
			return angular.toJson(itemList)
		}
	}
});