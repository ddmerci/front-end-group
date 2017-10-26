angular.module('store.factories', [])

    .factory('Merch', ['$resource', function ($resource) {
        return $resource('/api/products/merch', {
            queryByCategory: {
                method: 'GET',
                url: '/api/products/merch', 
                isArray: true
            }
        });
    }])

    .factory('Apparel', ['$resource', function ($resource) {
        return $resource('/api/products/apparel', {
            queryByCategory: {
                method: 'GET',
                url: '/api/products/apparel', 
                isArray: true
            }
        });
    }])
    .factory('Product', ['$resource', function ($resource) {
        return $resource('/api/products/:id', { id: '@id' }, {
            queryByCategory: {
                method: 'GET',
                url: '/api/products', 
                isArray: true
            }
        });
    }])

    .factory('Purchases', ['$resource', function ($resource) {
        return $resource('/api/purchases/:id');
    }])

    .factory('CreatePurchases', ['$resource', function ($resource) {
        return $resource('/api/purchases/:id', { id: '@id' }, {
            update: {
                method: 'PUT'
            }
        });
    }]);