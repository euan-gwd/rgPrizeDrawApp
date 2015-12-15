angular.module('MyApp', ['MyApp.angular-js-xlsx'])
.controller('myController', function($scope) {
    $scope.read = function(workbook) {
      window.sessionStorage.clear();
      // read xlxs file into json Array//
      var sheetName = workbook.SheetNames;  
      var sheets = workbook.Sheets;
      var entries = [];
      sheetName.forEach(function(sheets) {
        var jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        entries = jsonData;
      });

      window.sessionStorage.entries = angular.toJson(entries);  
      
      var drawEntries = angular.fromJson(window.sessionStorage.entries || '[]');
      $scope.prize = drawEntries;
      // Show number of entries //
      console.log(drawEntries);

      // pick a random winner//
      var winner = drawEntries[Math.floor(Math.random()*drawEntries.length)];
      console.log(winner);  
      };

    $scope.error = function(e) {
      /* DO SOMETHING WHEN ERROR IS THROWN */
      console.log(e);
    };


  });