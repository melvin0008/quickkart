app.controller("LoginCntrl", function($rootScope,$scope,$firebaseArray,FirebaseService,LoginService) {
  var self=this;
  self.login=function(){
		LoginService.login()
  }
});