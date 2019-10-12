"use strict";

//CREATE LEFT SIDEBAR HOME

function displaySidebar() {
    fetch(endpoints.groups.url).then(function (response) {
        return response.json();
    }).then(function (productsGroups) {
        var html = '';
        for (var i = 0; i < productsGroups.length; i++) {
            html += '\n<a href="/category/' + productsGroups[i].id + '" class="list-group-item"> ' + productsGroups[i].name + ' </a>';
        }
        $("#sidebar").append(html);
    });
}

displaySidebar();