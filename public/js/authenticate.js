
function login(username, password) {
    var username = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var encodedAuth = "Basic " + btoa(username + ":" + password);

    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            var dataResponse = JSON.parse(this.responseText);
            window.location.replace("courses.html")

            //tokens are not working with the way the api is configured
             if(dataResponse.token && dataResponse.token.length){
                 handleSuccess(dataResponse);
             } else {
                 handleFailure(dataResponse);
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

