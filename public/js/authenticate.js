
function login(username, password) {
    var username = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var encodedAuth = "Basic " + btoa(username + ":" + password);

    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            var data = json.parse(this.responseText);
            if(data.token && data.token.length){
                handleSuccess(data);
            } else {
                handleFailure(data);
            }
        }
    });

    xhr.open("GET", "https://kelbynew.staging.wpengine.com/wp-json/ko/v2/users/login");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("authorization", encodedAuth);
    xhr.onerror = handleError;

    xhr.send(data);

}


function handleSuccess(data){
    setCookie("token", data.token, 2);
    window.location.href = window.location.hostname + "/courses.html";

}

function handleError(){
    
}

function handleFailure(){

}

