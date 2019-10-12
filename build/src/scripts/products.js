'use strict';

//GET PRODUCT LIST

function createProductList() {
    fetch(endpoints.products.url).then(function (response) {
        return response.json();
    }).then(function (productsList) {
        var html = '';
        for (var i = 0; i < productsList.length; i++) {
            html += '\n                    <tr>';
            html += '\n                        <td> ' + productsList[i].id + ' </td>';
            html += '\n                        <td> ' + productsList[i].name + ' </td>';
            html += '\n                        <td class="center"> $' + productsList[i].price + ' </td>';
            html += '\n                        <td class="center"> ' + productsList[i].groupId + ' </td>';
            html += '\n                    </tr>';
            html += '\n                ';
        }
        $("#products-list").append(html);
    });
}

createProductList();

//CREATE NEW PRODUCT
function createProduct(data) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    return fetch(endpoints.products.url, options);
}

document.getElementById("add-product").addEventListener('click', function () {
    var addProductName = document.getElementById('name').value;
    var addProductDescription = document.getElementById('description').value;
    var addProductPrice = document.getElementById('price').value;
    var addProductGroup = document.getElementById('group').value;
    createProduct({
        name: addProductName,
        description: addProductDescription,
        price: addProductPrice,
        groupId: addProductGroup
    }).then(function () {
        location.reload();
    });
});

//EDIT PRODUCT DATA
function editProduct(data) {
    var options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    return fetch(endpoints.products.url, options);
}

document.getElementById("edit-product").addEventListener('click', function () {
    var editProductId = document.getElementById('edit-id').value;
    var editProductName = document.getElementById('edit-name').value;
    var editProductDescription = document.getElementById('edit-description').value;
    var editProductPrice = document.getElementById('edit-price').value;
    var editProductGroup = document.getElementById('edit-group').value;
    editProduct({
        id: editProductId,
        name: editProductName,
        description: editProductDescription,
        price: editProductPrice,
        groupId: editProductGroup
    }).then(function () {
        location.reload();
    });
});

//DELETE PRODUCT
function deleteProduct(id) {
    return fetch(endpoints.products.url + '/' + id, { method: 'DELETE' });
}

document.getElementById("delete-product").addEventListener('click', function () {
    var deleteProductId = document.getElementById('delete-id').value;
    deleteProduct(deleteProductId).then(function () {
        location.reload();
    });
});