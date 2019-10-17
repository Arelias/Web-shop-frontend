'use strict';

function deleteProductFromOrder(orderId, productId) {
    return fetch(endpoints.orders.url + '/' + orderId + '/products/' + productId, {method: 'DELETE'});
}

function addDeleteProductHandler(element, orderId, productId) {
    element.addEventListener('click', function(event) {
        deleteProductFromOrder(orderId, productId).then(function (response) {
            if (response.status === 200) {
                createProductsList(orderId);
            }
        });
    });
}

function addProductToOrder(orderId) {
    var productId = document.getElementById('add-product-id').value;
    return fetch(endpoints.orders.url + '/' + orderId + '/products/' + productId, {method: 'PUT'});
}

function addAddProductHandler(element, orderId) {
    element.addEventListener('click', function(event) {
        addProductToOrder(orderId).then(function (response) {
            if (response.status === 200) {
                createProductsList(orderId);
            }
        });
    });
}

//GET PRODUCTS FROM ORDER
function createProductsList(orderId) {
    fetch(endpoints.orders.url + '/' + orderId + '/products').then(function (response) {
        return response.json();
    }).then(function (productsList) {
        $('#list-order-id').text(orderId);
        $('#add-order-id').text(orderId);
        var elem = $("#div-products-list");
        elem.removeAttr("hidden");
        var html = '';
        for (var i = 0; i < productsList.length; i++) {
            html += '\n                    <tr>';
            html += '\n                        <td> ' + productsList[i].id + ' </td>';
            html += '\n                        <td> ' + productsList[i].name + ' </td>';
            html += '\n                        <td class="center"> $' + productsList[i].price + ' </td>';
            html += '\n                        <td class="center"> ' + productsList[i].groupId + ' </td>';
            html += '\n                        <td class="center"> <button id="product' + productsList[i].id + '">Usuń</button> </td>'
            html += '\n                    </tr>';
            html += '\n                ';  
        }
        $("#products-list").html(html);
        for (var i = 0; i < productsList.length; i++) {
            var element = document.getElementById("product" + productsList[i].id);
            addDeleteProductHandler(element, orderId, productsList[i].id);
        }
        var oldElement = document.getElementById("add-product");
        var newElement = oldElement.cloneNode(true);
        addAddProductHandler(newElement, orderId);
        oldElement.parentNode.replaceChild(newElement, oldElement);
    });
}

function addOrderClickHandler(element, orderId) {
    element.addEventListener('click', function(event) {
        createProductsList(orderId);
    });
}

//GET ORDERS
function createOrdersList() {
    fetch(endpoints.orders.url).then(function (response) {
        return response.json();
    }).then(function (ordersList) {
        var html = '';
        for (var i = 0; i < ordersList.length; i++) {
            html += '\n                    <tr>';
            html += '\n                        <td> ' + ordersList[i].id + ' </td>';
            html += '\n                        <td> ' + ordersList[i].buyerName + ' </td>';
            html += '\n                        <td> ' + ordersList[i].sellerName + ' </td>';
            html += '\n                        <td> ' + ordersList[i].purchaseDate + ' </td>';
            html += '\n                        <td class="center"> ' + ordersList[i].status + ' </td>';
            html += '\n                        <td> ' + ordersList[i].deliveryDate + ' </td>';
            html += '\n                        <td class="center"> $' + ordersList[i].orderValue + ' </td>';
            html += '\n                        <td class="center"> <button id="order' + ordersList[i].id + 'products">Produkty</button> </td>'
            html += '\n                    </tr>';
            html += '\n                ';  
        }
        $("#orders").append(html);
        for (var i = 0; i < ordersList.length; i++) {
            var element = document.getElementById("order" + ordersList[i].id + "products");
            addOrderClickHandler(element, ordersList[i].id);
        }
    });
}

createOrdersList();

//DELETE ORDER
function deleteOrder(id) {
    return fetch(endpoints.orders.url + '/' + id, {method: 'DELETE'});
}

document.getElementById("delete-order").addEventListener('click', function () {
    var deleteOrderId = document.getElementById('order-id').value;
    deleteOrder(deleteOrderId).then(function(response) {
        if (response.status === 200) {
            location.reload();
        }
    });
});

//CHANGE ORDER DATA
function editOrder(data) {
    var options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    return fetch(endpoints.orders.url, options);
}

document.getElementById("edit-order").addEventListener('click', function () {
    var editOrderId = document.getElementById('edit-id').value;
    var editOrderStatus = document.getElementById('edit-status').value;
    var editOrderDeliveryDate = document.getElementById('edit-delivery-date').value;
    editOrder({ 
        id: editOrderId, 
        status: editOrderStatus,
        deliveryDate: editOrderDeliveryDate 
    }).then(function() {
        location.reload();
    });
});
