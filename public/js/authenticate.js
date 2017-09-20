


function makeRequest(username, password) {
    var username = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var encodedAuth = "Basic " + btoa(username + ":" + password);

    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            debugger;
            console.log(this.responseText);
        }
    });

    xhr.open("GET", "https://kelbynew.staging.wpengine.com/wp-json/ko/v2/users/login");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("authorization", encodedAuth);
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(data);

}