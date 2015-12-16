angular.module('myApp', ['myApp.angular-js-xlsx'])
.controller('AddController', function($scope) {
    $scope.read = function(workbook) {
      
       // read xlxs file into json Array//
      var sheetName = workbook.SheetNames;  
      var sheets = workbook.Sheets;
      var entries = {};
      sheetName.forEach(function(sheets) {
        var jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        entries = jsonData;
      });

      //  // Store entries in sessionStorage//
      // window.sessionStorage.entries = angular.toJson(entries);  
      
      //  // retrieve entries from sessionStorage //
      // var drawEntries = angular.fromJson(window.sessionStorage.entries || '[]');
      
       // Show number of entries //
      console.log(entries);
      $scope.drawEntries = entries;

      // pick a random winner//
      var winner = entries[Math.floor(Math.random()*entries.length)];
      console.log(winner); 
      $scope.drawWinner = winner;
      };

    $scope.error = function(e) {
      /* DO SOMETHING WHEN ERROR IS THROWN */
      console.log(e);
    };
});