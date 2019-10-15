'use strict';

// GET CART PRODUCTS

function getCartProducts() {
    fetch(endpoints.cart.url + '/1/products').then(function (response) {
        return response.json();
    }).then(function (productsList) {
        var html = '';
        for (var i = 0; i < productsList.length; i++) {
            html += '\n                    <tr>';
            html += '\n                        <th scope="row"> ' + productsList[i].id + ' </th>';
            html += '\n                        <td><img class="card-img-top" src="http://placehold.it/250x250" alt=""></td>';
            html += '\n                        <td> ' + productsList[i].name + ' </td>';
            html += '\n                        <td class="center"><i class="fas fa-times" data-id="' + productsList[i].id + '"></i></td>';
            html += '\n                        <td class="right"> $' + productsList[i].price + ' </td>';
            html += '\n                    </tr>';
            html += '\n                ';
        }
        $("#cart").append(html);
    });
}

getCartProducts();

//DELETE CART PRODUCTS
setTimeout(function () {
    var elementsArray = document.querySelectorAll('i.fas');

    elementsArray.forEach(function (elem) {
        elem.addEventListener("click", function () {
            var productId = this.getAttribute("data-id");
            deleteProductFromOrder(productId).then(function () {
                location.reload();
            });
        });
    });
}, 500);

function deleteProductFromOrder(productId) {
    return fetch(endpoints.cart.url + '/1/products/' + productId, { method: 'DELETE' });
}

//MAKE ORDER FROM CART
document.getElementById('add-order').addEventListener("click", function () {
    fetch(endpoints.cart.url + '1/products').then(function (response) {
        return response.json();
    }).then(function (cartItems) {
        var tab = [];
        for (var i = 0; i < cartItems.length; i++) {
            tab.push(cartItems[i].id);
        }
        addNewOrder({ username: "unknown", "orderProducts": tab });
        alert('Pomyślne zamówienie');
    });
});

function addNewOrder(data) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    return fetch(endpoints.orders.url, options).then(function (response) {
        return response.json;
    });
}