app.factory("FirebaseService", function(){
	return {
		get:function(query){
			if (typeof query==='undefined'){query='';}
			return new Firebase("https://quickcart.firebaseio.com/"+query);
		}
	}
});