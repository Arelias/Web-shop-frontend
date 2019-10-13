'use strict';

//GET USERS LIST

function createUsersList() {
    fetch(endpoints.users.url).then(function (response) {
        return response.json();
    }).then(function (usersList) {
        var html = '';
        for (var i = 0; i < usersList.length; i++) {
            html += '\n                    <tr>';
            html += '\n                        <td> ' + usersList[i].id + ' </td>';
            html += '\n                        <td> ' + usersList[i].username + ' </td>';
            html += '\n                        <td> ' + usersList[i].password + ' </td>';
            html += '\n                        <td> ' + usersList[i].userKey + ' </td>';
            html += '\n                        <td class="center"> ' + usersList[i].status + ' </td>';
            html += '\n                    </tr>';
            html += '\n                ';
        }
        $("#users-list").append(html);
    });
}
createUsersList();

//CREATE NEW USER
function createUser(data) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    return fetch(endpoints.users.url, options);
}

document.getElementById("add-user").addEventListener('click', function () {
    var addUserName = document.getElementById('name').value;
    var addUserPassword = document.getElementById('pass').value;
    var addUserStatus = document.getElementById('status').value;
    var addUserKey = document.getElementById('key').value;
    createUser({
        username: addUserName,
        password: addUserPassword,
        status: addUserStatus,
        userKey: addUserKey
    }).then(function () {
        location.reload();
    });
});

//BLOCK USER BY CHANGING STATUS
function blockUser(id) {
    return fetch(endpoints.users.url + '/' + id, { method: 'PUT' });
}

document.getElementById("block-user").addEventListener('click', function () {
    var blockUserId = document.getElementById('identify').value;
    blockUser(blockUserId).then(function () {
        location.reload();
    });
});

//GENERATE KEY
function keyGenerator(id) {
    return fetch(endpoints.users.url + '/' + id + '/session', { method: 'PUT' });
}

document.getElementById("key-generator").addEventListener('click', function () {
    var keyUserId = document.getElementById('key-id').value;
    keyGenerator(keyUserId).then(function(response) {
        if (response.status === 200) {
            alert('Klucz został wygenerowany dla użytkownika o id=' + keyUserId);
        } else {
            alert('Podczas generowania klucza wystąpił błąd.');
        }
        
    });
});