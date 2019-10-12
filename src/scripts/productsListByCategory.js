'use strict';

//DISPLAY PRODUCTS FROM CATEGORY
function displayProductsFromCategory() {
    var parts = document.URL.split('/');
    var activeId = Number(parts[parts.length - 1]);
    fetch(endpoints.products.url + '?groupId=' + activeId).then(function (response) {
        return response.json();
    }).then(function (productsList) {
        var html = '';
        for (var i = 0; i < productsList.length; i++) {
            html += '\n                    <div class="col-lg-4 col-md-6 mb-4">';
            html += '\n                        <div class="card h-100">'
            html += '\n                            <a href="/product/' + productsList[i].id + '"><img class="card-img-top" src="http://placehold.it/250x250" alt=""></a>';
            html += '\n                            <div class="card-body">';
            html += '\n                                <h4 class="card-title">';
            html += '\n                                    <a href="/product">' + productsList[i].name + '</a>';
            html += '\n                                </h4>';
            html += '\n                                <h5>$' + productsList[i].price + '</h5>';
            html += '\n                            </div>';
            html += '\n                        </div>';
            html += '\n                    </div>';
            html += '\n                ';
        }
        $("#products").append(html);
    });
}

displayProductsFromCategory();