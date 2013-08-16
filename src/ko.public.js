
/* ========================================================================
 * ko.public v0.1.2
 * Support for knockoutjs observables that are available to all view models
 *
 * Copyright (c) 2013 Andrew Worcester (amwmedia.com)
 * https://github.com/amwmedia/ko.public
 *
 * Author: Andrew Worcester
 * Website: amwmedia.com
 *
 * Released under the MIT license
 * https://github.com/amwmedia/ko.public/blob/master/LICENSE
 * ------------------------------------------------------------------------ */

ko.public = (function(){
    // storage for public observable objects
    var vm = {};
    // main function for setting up public observables
    function public(key, value){
        var valType;
        // if this is the first time we've seen this key
        if(!vm.hasOwnProperty(key)){
            // creating it in storage and fill it with a blank observable
            vm[key] = ko.observable();
        }

        // if this observable has not yet been filled and a value was passed in for it
        if(typeof vm[key]() === 'undefined' && typeof (value) !== 'undefined'){
            // detect what type was passed in as the value
            valType = / (.*?)]/.exec(toString.call(value))[1];
            // and handle types accordingly
            switch(valType){
                // if this observable is being initially filled with an array
                // we will assume they want an observable array
                case 'Array':
                    // Fill the observable
                    vm[key](value);
                    // turn the observable in to an observable array
                    ko.utils.extend(vm[key], ko.observableArray['fn']);
                break;
                default:
                    // any other type of value is used to initialize
                    // the starting value for this observable
                    vm[key](value);
                break;
            }
        }
        // return a reference to the observable
        // to be used in the view model
        return vm[key];
    };
    // just one internal function to expose
    return public;
})();