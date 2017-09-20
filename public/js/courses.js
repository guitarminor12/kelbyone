function populateCourseList(course){
    document.getElementById('courses-list').innerHTML += JSON.stringify(course, null, 4);
}


function getCourses(category) {

    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            var dataResponse = JSON.parse(this.responseText);
            for (var i = 0; i < dataResponse.data.length; i++) {
                var course = dataResponse.data[i];
                populateCourseList(course);
            }
        }
    });

    if (category && category.length) {
        xhr.open("GET", "https://kelbynew.staging.wpengine.com/wp-json/ko/v2/categories/" + category + "/courses?per_page=100");
    } else {
        xhr.open("GET", "https://kelbynew.staging.wpengine.com/wp-json/ko/v2/courses");
    }
    xhr.setRequestHeader("content-type", "application/json");
    //xhr.onerror = handleError;

    xhr.send(data);


}

function getCategories() {
    var dropDownList = document.getElementById("categories");
    var data = null;
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            var dataResponse = JSON.parse(this.responseText);
            for (var i = 0; i < dataResponse.data.length; i++) {
                var category = dataResponse.data[i];
                var option = document.createElement("option");
                option.text = category.display_name;
                option.value = category.id;
                dropDownList.add(option);
            }
        }
    });

    xhr.open("GET", "https://kelbynew.staging.wpengine.com/wp-json/ko/v2/categories?per_page=100");
    xhr.setRequestHeader("content-type", "application/json");
    //xhr.onerror = handleError;

    xhr.send(data);
}

(function () {
    getCategories();
    getCourses();
    document.getElementById("categories").addEventListener("change", function () {
        getCourses(document.getElementById("categories").value);
    });
})();