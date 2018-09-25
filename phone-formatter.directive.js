(function(){
    'use strict';
    
    angular
        .module('phoneFormatterApp')
        .directive('phoneFormatterDirective', Directive);
    
    Directive.$inject = ['libphonenumber'];
    
    function Directive(libphonenumber){
        var directive = {
            require: 'ngModel',
            restrict: 'A',
            link: link
        };
    
    return directive;
    
    ////////////////////////////////////////////////////
    
    function link(scope, element, attrs, ngModel){
        // Get an instance of `PhoneNumberUtil`.
        const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
        
        //Get the default country code
        var countryCode = scope.$eval(attrs.countryCode);
        
        // Remove autocomplete
        attrs.$set('autocomplete', 'false');
        
        // Register blur and keyup events
        angular.element(element).bind('blur', phoneBlurEvent);
        angular.element(element).bind('keyup', phoneKeyupEvent);
        
        //Watches the countryCode attribute and keeps track of when it changes so that we can re-format the number
        scope.$watch(function () {
            return scope.$eval(attrs.countryCode);
        }, function(newValue, oldValue){
            if(newValue !== oldValue){
                countryCode = newValue;
                format(ngModel.$$rawModelValue);
            }
        });
    
    ////////////////////////////////////////////////////
    
    function phoneBlurEvent(event) {
        if(ngModel.$$lastCommittedViewValue === ngModel.$viewValue) {
            //Re-evaluate country code value since it could have changed.
            countryCode = scope.$eval(attrs.countryCode);
            format(ngModel.$$rawModelValue);
        }
    }
    
    //Enforces that only numbers can be entered
    function phoneKeyupEvent(event){
        if (ngModel.$viewValue === undefined) return '';
        
            var transformedInput = ngModel.$viewValue.replace(/[^0-9]/g, '');
        
            if (transformedInput !== ngModel.$viewValue) {
                ngModel.$setViewValue(transformedInput);
                ngModel.$render();
            }
    }
    
    // Model -> View
    function format(value) {
        //Set the validity to true to hide any potential lingering error messages
        ngModel.$setValidity('invalidPhoneForRegion', true);
        ngModel.$setValidity('invalidPhoneLength', true);
    
        //Throws an error if we try to run validation on values of lengths <= 1
        if(value && value.length > 1){
            
        // Parse number with country code and keep raw input.
        var number = phoneUtil.parseAndKeepRawInput(value, countryCode);
        
        if(phoneUtil.isPossibleNumber(number)){
        
            if(phoneUtil.isValidNumber(number) && phoneUtil.isValidNumberForRegion(number, countryCode)){
        
            // Format number in the national format.
            value = phoneUtil.format(number, libphonenumber.PhoneNumberFormat.NATIONAL);
        
            }else{
                //Set the validity to false to show the 'invalidPhoneForRegion' error on form
                ngModel.$setValidity('invalidPhoneForRegion', false);
            }
        }else{
            //Set the validity to false to show the 'invalidPhoneLength' error on form
            ngModel.$setValidity('invalidPhoneLength', false);
         }
        } else if (value && value.length === 1){
            //Set the validity to false to show the 'invalidPhoneLength' error on form
            ngModel.$setValidity('invalidPhoneLength', false);
        }

        if(ngModel.$viewValue && (ngModel.$viewValue !== value)){
            ngModel.$setViewValue(value);
            ngModel.$render();
         }
        
        return value;
    }
    
    
    // View -> Model
    function parse(value){
        //Performing additional check on length since console errors were being thrown
        if(value && value.length > 2){
            // Parse number with country code and keep raw input.
            var number = phoneUtil.parseAndKeepRawInput(value, countryCode);
        
            //Return the phone's national number so that the model will get saved unformatted (digits only)
            return number.getNationalNumber().toString();
        }
        
        return value;
    }
    
        ngModel.$formatters.push(format);
        ngModel.$parsers.push(parse);
       
    }

    }
})(window.angular);