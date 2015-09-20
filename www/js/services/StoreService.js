app.factory("StoreService", function($firebaseArray,$state,$http) {
	return{
		getStoreInventory:function(link){
		 	return $http.get(link);
		}
	}
});
