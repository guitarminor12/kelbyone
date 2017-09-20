function getCourses(){

    var data = null;
    
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
    
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                var data = JSON.parse(this.responseText);
                if(data.token && data.token.length){
                    handleSuccess(data);
                } else {
                    handleFailure(data);
                }
            }
        });
    
        xhr.open("GET", "https://kelbynew.staging.wpengine.com/wp-json/ko/v2/courses");
        xhr.setRequestHeader("content-type", "application/json");
        xhr.onerror = handleError;
    
        xhr.send(data);

        
}

function getCategories(){
    var dropDownList = document.getElementById("categories");
    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            var dataResponse = JSON.parse(this.responseText);
            if(dataResponse.token && dataResponse.token.length){
                for (var i = 0; i < dataResponse.length; i++) {
                    var category = dataResponse[i];
                    var option = document.createElement("option");
                    option.text = category.display_name;
                    option.value = category.id;
                    dropDownList.add(option);
                }
            } else {
                handleFailure(dataResponse);
            }
        }
    });

    xhr.open("GET", "https://kelbynew.staging.wpengine.com/wp-json/ko/v2/courses");
    xhr.setRequestHeader("content-type", "application/json");
    //xhr.onerror = handleError;

    xhr.send(data);    
}

(function(){
    getCategories();
})();