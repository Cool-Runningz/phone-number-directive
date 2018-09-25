(function() {
    'use strict';

    angular
        .module('phoneFormatterApp')
        .component('phoneFormatter', getComponent());

    function getComponent(){
        return {
            templateUrl: 'phone.html',
            controller: Controller
        }
    }
  
    Controller.$inject = [];

    function Controller(){
        var ctrl = this;
        ctrl.countries = null;
        ctrl.countryCode = "US";
        ctrl.phoneNumber = null;
    
        ctrl.$onInit = onInit;

        //////////////////////////////////
        
        function onInit(){
           ctrl.countries = getCountries();
        }

        function getCountries(){
            return [
                    {"name": "Australia","code": "AU"},
                    {"name": "Austria", "code": "AT" },
                    {"name": "Belgium", "code": "BE"},
                    {"name": "Belize", "code": "BZ"},
                    {"name": "Brazil", "code": "BR"},
                    {"name": "Canada", "code": "CA"},
                    {"name": "Colombia", "code": "CO"},
                    {"name": "Dominican Republic", "code": "DO"},
                    {"name": "Ecuador", "code": "EC"},
                    {"name": "Germany", "code": "DE"},
                    {"name": "Jamaica", "code": "JM"},
                    {"name": "Japan", "code": "JP"},
                    {"name": "New Zealand", "code": "NZ"},
                    {"name": "Puerto Rico", "code": "PR"},
                    {"name": "Spain", "code": "ES"},
                    {"name": "United Kingdom", "code": "GB"},
                    {"name": "United States", "code": "US"}
                ];
        }
    }

})(window.angular);
