'use strict';

//GET SINGLE PRODUCT
var parts = document.URL.split('/');
var activeID = Number(parts[parts.length - 1]);

function createProduct() {
    fetch(endpoints.products.url + '/' + activeID).then(function (response) {
        return response.json();
    }).then(function (product) {
        var html = '';
        html += '\n                <h2>' + product.name + '</h2>';
        html += '\n                <h5>' + product.price + '</h5>';
        html += '\n                <p>' + product.description + '</p>';
        html += '\n            ';
        $("#product").prepend(html);

        document.getElementById("add-cart-button").addEventListener('click', function () {
            addProductToCart(activeID);
            this.innerHTML = 'Produkt o id ' + activeID + ' znajduje si\u0119 w koszyku!';
        }, 1000);
    });
}

createProduct();

//ADD PRODUCT TO CART
function addProductToCart(productId) {
    return fetch(endpoints.cart.url + '/1/products/' + productId, {method: 'PUT'});
}