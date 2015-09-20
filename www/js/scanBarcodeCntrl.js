app.controller("scanBarcodeController", function($firebaseObject,$rootScope,$firebaseArray,$scope, StoreService,$cordovaBarcodeScanner,$ionicModal,FirebaseService,$ionicUser, $ionicPush, $log,StoreService,ItemService) {
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
    window.localStorage['docName']=docName
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

  function findloc(StoreProduct,UserProduct){
    angular.forEach(UserProduct,function(value,key){
      var record= _.find(StoreProduct,function(object){
        return object['Description'].indexOf(value.name) != -1;
      })
      if (typeof record != 'undefined'){
        record = [record];
        value.aisle=record[0]['Aisle']+'-'+record[0]['Shelf']
        console.log(value.aisle)
      }
      else
      {
        value.aisle || (value.aisle = "NA")
      }
    })
  }

  self.shareItem=function(){
    $scope.modal1.show();
  }


  self.scanBarcode = function() {
    /*Scanner*/
    $cordovaBarcodeScanner.scan().then(function(imageData) {
        url=imageData.text
        // var UserProduct=ItemService.getUserProduct(self.items)
      StoreService.getStoreInventory(url).success(function (data, status, headers, config) {
          findloc(data,self.items)
      });
    }, function(error) {
        console.log("An error happened -> " + error);
    });
   };



 $ionicModal.fromTemplateUrl('templates/itemadd.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

   $ionicModal.fromTemplateUrl('templates/shareItemList.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal1 = modal;
  });

  self.update=function(index){
    var docName=window.localStorage['docName']
    console.log(docName)
    var ref=FirebaseService.get('Docs/'+docName+'/Items')

    ref.once("value", function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        console.log(self.items[index].name,childSnapshot.val().name)
        if(self.items[index].name==childSnapshot.val().name){
          FirebaseService.get('Docs/'+docName+'/Items/'+childSnapshot.key()).child('checked').set(self.items[index].checked)
        }
        $scope.$apply();
      });
    });
  }


 $scope.closeLogin = function() {
      $scope.modal.hide();
  };
   $scope.closeShare = function() {
      $scope.modal1.hide();
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