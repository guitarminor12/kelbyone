function populateCourseList(course) {
    var container = document.createElement("div");
    container.className += "courseContainer";
    container.appendChild(createCourseChildrenAnchor("id", course.id));
    container.appendChild(createCourseChildren("title", course.title));
    container.appendChild(createCourseChildren("content", course.content));
    container.appendChild(createCourseChildren("duration", course.duration));
    container.appendChild(createCourseChildren("instructor", JSON.stringify(course.instructor)));
    container.appendChild(createCourseChildren("num_lessons", course.num_lessons));
    container.appendChild(createCourseChildren("thumbnail_url", course.thumbnail_url));
    container.appendChild(createCourseChildren("published_date", course.published_date));

    document.getElementById('courses-list').appendChild(container);
}


function createCourseChildren(childName, value){
    var child = document.createElement("div");
    child.innerHTML = value;
    child.setAttribute("id", childName);
    return child;
}

function createCourseChildrenAnchor(childName, value){
    var child = document.createElement("a");
    child.href = "/coursedetail.html?courseid=" + value;
    child.setAttribute("id", childName);
    return child;
}



function getCourses(category) {
    if (category && category.length) {
        document.getElementById('courses-list').innerHTML = '';
    }
    if (category === "Select a Course Category") {
        category = '';
    }

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
        xhr.open("GET", "https://kelbynew.staging.wpengine.com/wp-json/ko/v2/courses?per_page=10");
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