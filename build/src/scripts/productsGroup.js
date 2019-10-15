'use strict';

//GET PRODUCT GROUP LIST

function createProductGroupList() {
    fetch(endpoints.groups.url).then(function (response) {
        return response.json();
    }).then(function (productsGroups) {
        var html = '';
        for (var i = 0; i < productsGroups.length; i++) {
            html += '\n                    <tr>';
            html += '\n                        <td> ' + productsGroups[i].id + ' </td>';
            html += '\n                        <td> ' + productsGroups[i].name + ' </td>';
            html += '\n                    </tr>';
            html += '\n                ';
        }
        $("#product-groups-list").append(html);
    });
}

createProductGroupList();

//CREATE NEW GROUP
function createGroup(data) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    return fetch(endpoints.groups.url, options);
}

document.getElementById("add-group").addEventListener('click', function () {
    var addGroupName = document.getElementById('name').value;
    createGroup({
        name: addGroupName
    }).then(function () {
        location.reload();
    });
});

//EDIT PRODUCT GROUP
function editGroup(data) {
    var options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    return fetch(endpoints.groups.url, options);
}

document.getElementById("edit-group").addEventListener('click', function () {
    var editGroupId = document.getElementById('edit-id').value;
    var editGroupName = document.getElementById('edit-name').value;
    editGroup({
        id: editGroupId,
        name: editGroupName
    }).then(function () {
        location.reload();
    });
});