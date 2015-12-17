(function() {
  
var app = angular.module('prizeDrawApp', ['ui.router','ngAnimate']);

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state("home", {
          url: "/",
          views: {
            "home": {
             templateUrl: "templates/home.html",
             controller: "AddController"
             }
          }   
      });
    $urlRouterProvider.otherwise('/');
});

app.controller('AddController', ['$scope','$state', function($scope, $state) {
    $scope.read = function(workbook) {
      
       // read xlxs file into json Array//
      var sheetName = workbook.SheetNames;  
      var sheets = workbook.Sheets;
      var entries = [];
      sheetName.forEach(function(sheets) {
        var jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        entries = jsonData;
      });

      //  // Store entries in sessionStorage//
      window.sessionStorage.entries = angular.toJson(entries); 
      
      //  // retrieve entries from sessionStorage //
      // var drawEntries = window.sessionStorage.entries;
      
       // Show number of entries //
      console.log(entries.length);

      // pick a random winner//
      var winner = entries[Math.floor(Math.random()*entries.length)];
      console.log(winner); 
      };
}]);

app.controller('listController', ['$scope', '$state', function($scope, $state){
    var drawItems = angular.fromJson(window.sessionStorage.entries || '[]');
  
    $scope.selectedItems = drawItems;

}]);

app.directive('jsXls', function() {
  return {
    restrict: 'E',
    template: '<input type="file" />',
    replace: true,
    link: function (scope, element, attrs) {

      function handleSelect() {
        var files = this.files;
        for (var i = 0, f = files[i]; i != files.length; ++i) {
          var reader = new FileReader();
          var name = f.name;
          reader.onload = function(e) {
            var data = e.target.result;

              var workbook = XLS.read(data, {type: 'binary'});

              if (attrs.onread) {
                var handleRead = scope[attrs.onread];
                if (typeof handleRead === "function") {
                  handleRead(workbook);
                }
              }

            // Clear input file
            // element.val('');
          };

          reader.readAsBinaryString(f);
        }
      }

      element.on('change', handleSelect);
    }
  };
});

}());