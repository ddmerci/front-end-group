angular.module('store', ['ngRoute', 'ngResource', 'store.controllers', 'store.factories', 'store.services'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
    .when('/', { 
        templateUrl: 'views/welcome.html'
    })
    .when('/contact', { 
        templateUrl: 'views/contactus.html', 
    })
    .when('/products/merch', {
        templateUrl: 'views/merch.html',
        controller: 'MerchController' 
    })
    .when('/products/apparel', { 
        templateUrl: 'views/apparel.html',
        controller: 'ApparelController' 
    })
    .when('/purchases', {
        templateUrl: 'views/cart.html',
        controller: "PurchasesController" 
    })
    .when('/products/:id', { 
        templateUrl: 'views/detail.html',
        controller: 'DetailController' 
    })
    .when('/checkout', { 
        templateUrl: 'views/checkout.html',
        controller: 'CheckoutController' 
    })
    .otherwise({
        redirectTo: '/'
    });
}]);