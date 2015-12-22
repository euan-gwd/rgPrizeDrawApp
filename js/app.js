(function() {
  
var app = angular.module('prizeDrawApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $stateProvider
    .state("home", {
          url: "/",
          templateUrl: "templates/home.html",
          controller: "AddController"
      })
      .state("results", {
            url: "/results",
            templateUrl: "templates/results.html",
            controller: "ListController"
          });
     
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
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
      $state.go('results');
      };
}]);

app.controller('ListController', ['$scope', '$state', function($scope, $state){
    //Retrieve entries from sessionStorage //
    var drawItems = angular.fromJson(window.sessionStorage.entries || '[]');
    $scope.selectedItems = drawItems;

     // pick a random winner//
    var winner = drawItems[Math.floor(Math.random()*drawItems.length)];
    $scope.prizeWinner = winner;

}]);

app.directive('jsXls', function() {
  return {
    restrict: 'E',
    template: '<input type="file">',
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
          };
          reader.readAsBinaryString(f);
        }
      }
      element.on('change', handleSelect);
    }
  };
});

}());