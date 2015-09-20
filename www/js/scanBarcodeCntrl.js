app.controller("scanBarcodeController", function($rootScope,$scope, $cordovaBarcodeScanner,$ionicModal,FirebaseService,$ionicUser, $ionicPush, $log,StoreService) {
  var self=this;
  $scope.items=[]
  self.items=$scope.items;

  $rootScope.emailId=window.localStorage['emailId']

  FirebaseService.get('Users/'+$rootScope.emailId).child('doc').once('value',function(snapshot){
    var docName=snapshot.val()
    if(docName==null)
    {
       FirebaseService.get('Users/'+$rootScope.emailId).child('doc').set($rootScope.emailId+'sList')
       docName=$rootScope.emailId+'sList'
    }
    console.log(docName)
    var ref=FirebaseService.get('Docs/'+docName+'/Items')

    ref.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        console.log(childSnapshot.val())
        self.items.push(childSnapshot.val())
        $scope.$apply();
      });
    });
   });


  self.scanBarcode = function() {
    /*Scanner*/
    $cordovaBarcodeScanner.scan().then(function(imageData) {
        url=imageData.text
    }, function(error) {
        console.log("An error happened -> " + error);
    });
   };

 $ionicModal.fromTemplateUrl('templates/itemadd.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });


 $scope.closeLogin = function() {
      $scope.modal.hide();
  };

  self.addItem=function(){
      $scope.modal.show();
  };

  self.toggleGroup = function(group) {
    if (self.isGroupShown(group)) {
      self.shownGroup = null;
    } else {
      self.shownGroup = group;
    }
  };

  self.isGroupShown = function(group) {
    return self.shownGroup === group;
  };

})




/*Trial Code*/

 /*Google Auth*/
        // LoginService.login()

      //   /*Ionic Push*/
      // $log.info('Ionic User: Identifying with Ionic User service');

 // $rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
  //     alert("Successfully registered token " + data.token);
  //     $log.info('Ionic Push: Got token ', data.token, data.platform);
  //     $scope.token = data.token;
  //   });


    // self.pushRegister = function() {
    //     $log.info('Ionic Push: Registering user');

    //     // Register with the Ionic Push service.  All parameters are optional.
    //     $ionicPush.register({
    //       canShowAlert: true, //Can pushes show an alert on your screen?
    //       canSetBadge: true, //Can pushes update app icon badges?
    //       canPlaySound: true, //Can notifications play a sound?
    //       canRunActionsOnWake: true, //Can run actions outside the app,
    //       onNotification: function(notification) {
    //         // Handle new push notifications here
    //         $log.info(notification);
    //         return true;
    //       }
    //     });
    // };