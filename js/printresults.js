app.directive('ngPrint', function () {
     return {
         restrict: 'A',
         template: '<button>',
         link: function(scope, element, attrs) {
            
            function printDirective() {
                var printSection = document.getElementById('printSection');
                // if there is no printing section, create one
                if (!printSection) {
                    printSection = document.createElement('div');
                    printSection.id = 'printSection';
                    document.body.appendChild(printSection);
                }
               
                function printElement(elem) {
                    // clones the element you want to print
                    var domClone = elem.cloneNode(true);
                    printSection.appendChild(domClone);
                    window.print();
                }
            }

             element.on('click', function () {
                var elemToPrint = document.getElementById(attrs.printElementId);
                if (elemToPrint) {
                    printElement(elemToPrint);
                }
            });
            window.onafterprint = function () {
                // clean the print section before adding new content
                printSection.innerHTML = '';
            };
         }
    };
});