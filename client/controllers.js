angular.module('store.controllers', [])

    .controller('MerchController', ['$scope', 'Merch', function ($scope, Merch) {

        $scope.merch = Merch.query();


    }])

    .controller('ApparelController', ['$scope', 'Apparel', function ($scope, Apparel) {

        $scope.apparel = Apparel.query();


        
    }])

    .controller('DetailController', ['$scope', '$routeParams', '$location', 'Product', 'CheckoutService', function ($scope, $routeParams, $location, Product, CheckoutService) {
        $scope.product = Product.get({ id: $routeParams.id });  

        $scope.addToCart = function (id, imageurl, title, price) {
            var payload = {
                id: $scope.product.id,
                imageurl: $scope.product.imageurl,
                title: $scope.product.title,
                price: $scope.product.price

            }
            CheckoutService.checkoutItems.push(payload);
            alert('Item has been added to your cart!');
        }

        $scope.cart = function () {
            $location.path('/' + $routeParams.id + '/checkout');
        }
    }])


    .controller('CheckoutController', ['$scope', '$location', 'Product', 'Purchases', 'CheckoutService', '$routeParams', function ($scope, $location, Product, Purchases, CheckoutService, $routeParams) {
        $scope.cart = CheckoutService.checkoutItems;
       
        // get total function for checkout cart
        $scope.getTotal = function () {
            var total = 0
            for (var i = 0; i <$scope.cart.length; i++){
                var prod = $scope.cart[i];
                total += (prod.price);
            }
            return total;
        }

        var elements = stripe.elements();
        var card = elements.create('card');
        card.mount('#card-field');

        $scope.errorMessage = '';


        $scope.stripeCharge = function() {
            stripe.createToken(card, {
                // name: $scope.name,
                // address_line1: $scope.line1,
                // address_line2: $scope.line2,
                // address_city: $scope.city,
                // address_state: $scope.state
            }).then(function(result) {
                if (result.error) {
                    $scope.errorMessage = result.error.message;
                } else {
                    // result.token is the card token (need id property)
                    var cart = CheckoutService.checkoutItems;
                    var c = new Purchases({
                        token: result.token.id,
                        amount: $scope.getTotal(),
                        cart: cart
                    });
                    
                    c.$save(function() {
                        alert('Thank you for the payment, an email has been sent.');
                        $location.path('/');
                    }, function(err) {
                        console.log(err);
                    });
                }
            });
        }
        // end total function
        
        $scope.remove = function () {
            var i = CheckoutService.checkoutItems.indexOf($scope.cart.item);
            if (confirm('Are you sure you want to remove this item from the cart?')) {
                CheckoutService.checkoutItems.splice(i, 1);
            }
        }


    }]);
