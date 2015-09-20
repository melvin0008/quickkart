app.controller("ItemCntrl", function($rootScope,$scope,$ionicModal,$firebaseArray,FirebaseService) {
  var self=this;
  self.add = function(){
    var itemName=self.item
    $scope.items.push({'name':self.item,'checked':false})

   	FirebaseService.get('Users/'+$rootScope.emailId).child('doc').once('value',function(snapshot){
	 	var docName=snapshot.val()
	 	if(docName==null)
	 	{
	 		 FirebaseService.get('Users/'+$rootScope.emailId).child('doc').set($rootScope.emailId+'sList')
	 		 docName=$rootScope.emailId+'sList'
	 	}
	 	var items=$firebaseArray(FirebaseService.get('Docs/'+docName+'/Items'))
	 	items.$add({'name':itemName,'checked':false})
	 });
    $scope.closeLogin()
    self.item=""
  }

  self.share=function(){

	  	var emailId= self.emailId.split('@')[0]
		FirebaseService.get('Users/'+emailId).child('ionicId').once('value',function(snapshot){
		if (snapshot.val()==null)
		{
			console.log("User Name Enter kar")
		}
		else{
			FirebaseService.get('Users/'+snapshot.val()).child('doc').set(window.localStorage['docName'])
		}

	  })
	}
});
