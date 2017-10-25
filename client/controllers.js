angular.module('store.controllers', [])
.controller('MerchController', ['$scope', 'Merch', function($scope, Merch) {

    $scope.merch = Merch.query(); 
}])
.controller('ApparelController', ['$scope', 'Apparel', function($scope, Apparel) {
    $scope.apparel = Apparel.query(); 
}])
.controller('SingleProductController', ['$scope', '$routeParams', '$location', 'Product', function($scope, $routeParams, $location, Product) {
    $scope.product = Product.get({ id: $routeParams.id });

    $scope.cart = function() { 
        $location.path('/' + $routeParams.id + '/add_to_cart');
    }    
}])

.controller('CartController', ['$scope', '$routeParams', '$location', 'Purchase', function($scope, $routeParams, $location, Purchase) {
$scope.remove = function() {
        
    
        if (confirm('Are you sure you want to remove this item from the cart?')) {
            $scope.product.$delete(function() {
                $location.replace().path('/');
            });
        }
    }
}])
.controller('CheckoutController', ['$scope', '$location', 'Purchase', function($scope, $location, Purchase) {
    var elements = stripe.elements();
    var card = elements.create('card');
    card.mount('#card-field');

    $scope.errorMessage = '';

    $scope.processPurchase = function() {
        stripe.createToken(card, {
            name: $scope.name,
            address_line1: $scope.line1,
            address_city: $scope.city,
            address_state: $scope.state
        }).then(function(result) {
            if (result.error) {
                $scope.errorMessage = result.error.message;
            } else {
                var d = new Purchase({
                    token: result.token.id,
                    amount: $scope.amount
                });
                d.$save(function() {
                    alert('Thank you for your purchase');
                    $location.path('/');
                }, function(err) {
                });
            }
        });
    }
}]);