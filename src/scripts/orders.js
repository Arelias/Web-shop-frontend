'use strict';

//GET ORDERS
function createOrdersList() {
    fetch(endpoints.orders.url).then(function (response) {
        return response.json();
    }).then(function (ordersList) {
        var html = '';
        for (var i = 0; i < ordersList.length; i++) {
            html += '\n                    <tr>';
            html += '\n                        <td> ' + ordersList[i].id + ' </td>';
            html += '\n                        <td class="center"> ' + ordersList[i].buyerId + ' </td>';
            html += '\n                        <td class="center"> ' + ordersList[i].sellerId + ' </td>';
            html += '\n                        <td> ' + ordersList[i].purchaseDate + ' </td>';
            html += '\n                        <td> ' + ordersList[i].productIds + ' </td>';
            html += '\n                        <td class="center"> ' + ordersList[i].status + ' </td>';
            html += '\n                        <td> ' + ordersList[i].deliveryDate + ' </td>';
            html += '\n                        <td class="center"> ' + ordersList[i].orderValue + ' </td>';
            html += '\n                    </tr>';
            html += '\n                ';
            
        }
        $("#orders").append(html);
    });
}

createOrdersList();

//DELETE ORDER
function deleteOrder(id) {
    return fetch(endpoints.orders.url + '/' + id, {method: 'DELETE'});
}

document.getElementById("delete-order").addEventListener('click', function () {
    var deleteOrderId = document.getElementById('order-id').value;
    deleteOrder(deleteOrderId).then(function() {
        location.reload();
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
    var editOrderBuyerId = document.getElementById('edit-buyer-id').value;
    var editOrderSellerId = document.getElementById('edit-seller-id').value;
    var editOrderPurchaseDate = document.getElementById('edit-purchase-date').value;
    var editOrderProductIds = document.getElementById('edit-order-product-ids').value;
    var editOrderStatus = document.getElementById('edit-status').value;
    var editOrderDeliveryDate = document.getElementById('edit-delivery-date').value;
    editOrder({ 
        id: editOrderId, 
        buyerId: editOrderBuyerId, 
        sellerId: editOrderSellerId,
        purchaseDate: editOrderPurchaseDate,
        productIds: editOrderProductIds,
        status: editOrderStatus,
        deliveryDate: editOrderDeliveryDate 
    }).then(function() {
        location.reload();
    });
});