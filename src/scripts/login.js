"use strict";

// LOGIN
var submitButton = document.getElementById("submit-btn");
if (submitButton !== null) {
    document.getElementById("submit-btn").addEventListener('click', function () {
        var login = document.getElementById('username').value;
        var pass = document.getElementById('password').value;

        if (login === "" || pass === "") {
            alert('Uzupełnij login lub hasło');
        } else {
            checkUserInput({
                username: login,
                password: pass
            });
        }
        event.preventDefault();
    });
}

function checkUserInput(data) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    fetch(endpoints.login.url, options).then(function (response) {
        return response.json();
    }).then(function (loginCheck) {
        if (loginCheck.loggedIn === true) {
            window.location.replace("/admin-products");
        }
    });
};