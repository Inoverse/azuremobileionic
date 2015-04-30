/* app.js */
  localStorage.setItem('user_id', 'azr_mbl_ce_2435');

/* settingsController.js */

var client = new WindowsAzure.MobileServiceClient(
    "ADDRESS",
    "ACCESS KEY"
  );
  
  var user_id = localStorage.getItem('user_id');
  

   var showAlert = function() {
     var alertPopup = $ionicPopup.alert({
       title: 'Done',
       template: 'Action done successfully.'
     });
     alertPopup.then(function(res) {
       console.log('Thank you for not eating my delicious ice cream cone');
     });
  };

  $scope.settings = {
    id: user_id,
    autoStartup: false,
    geolocation: false,
    username: undefined
  };
  
  $scope.updateCloudSettings = function() {
      // Hier die Cloud-Settings aktualisieren 
      var table = client.getTable('settings');
      table.where({ id: user_id }).read().done(function(results){
        if(results.length < 1) {
          table.insert($scope.settings).done(showAlert); 
          return;        
        }
        table.update($scope.settings).done(showAlert);
      });   
  };
  
  $scope.restoreCloudSettings = function() {
    // Cloud Daten wiederherstellen
    var table = client.getTable('settings');
    table.where({ id: user_id }).read().done(function(results){
      if(results.length > 0){   
        $scope.settings = results[0];
        $scope.$apply;
      }
      
      showAlert();
    });
  };