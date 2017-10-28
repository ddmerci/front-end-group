angular.module('store.services', [])
    .service('SEOService', ['$rootScope', function ($rootScope) {
        this.setSEO = function (data) {
            $rootScope.seo = {};
            for (var p in data) {
                $rootScope.seo[p] = data[p];
            }
        }
    }])
    .service("CheckoutService", function () {
        this.checkoutItems = [];
        // return { get: get };
        // function get(){
        //     return this.checkoutItems;
        // };
    });
