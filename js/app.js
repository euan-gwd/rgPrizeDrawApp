angular.module('MyApp', ['MyApp.angular-js-xlsx'])
.controller('myController', function($scope) {
    $scope.read = function(workbook) {
      console.log(workbook.SheetNames);
      // read xlxs file into json Array//
      var sheetName = workbook.SheetNames;  
      var sheets = workbook.Sheets;
      var entries = [];
      sheetName.forEach(function(sheets) {
        var jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        entries = jsonData;
      });
      
      // Show number of entries //
      console.log(entries.length);

      // pick a random winner//
      var winner = entries[Math.floor(Math.random()*entries.length)];
      console.log(winner);  
    };
    $scope.error = function(e) {
      /* DO SOMETHING WHEN ERROR IS THROWN */
      console.log(e);
    };
  });