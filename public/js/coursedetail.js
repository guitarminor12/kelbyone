function populateCourseList(course) {
    var container = document.getElementById('courseContainer');
    container.appendChild(createCourseChildren("id", course.id));
    container.appendChild(createCourseChildren("title", course.title));
    container.appendChild(createCourseChildren("content", course.content));
    container.appendChild(createCourseChildren("duration", course.duration));
    container.appendChild(createCourseChildren("instructor", JSON.stringify(course.instructor)));
    container.appendChild(createCourseChildren("num_lessons", course.num_lessons));
    container.appendChild(createCourseChildren("thumbnail_url", course.thumbnail_url));
    container.appendChild(createCourseChildren("published_date", course.published_date));
}


function createCourseChildren(childName, value) {
    var child = document.createElement("div");
    child.innerHTML = value;
    child.setAttribute("id", childName);
    return child;
}

function getCourseDetail(id) {

    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            var dataResponse = JSON.parse(this.responseText);
            
                var course = dataResponse.data;
                populateCourseList(course);

        }
    });


    xhr.open("GET", "https://kelbynew.staging.wpengine.com/wp-json/ko/v2/courses/" + id);
    xhr.setRequestHeader("content-type", "application/json");
    //xhr.onerror = handleError;

    xhr.send(data);
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

(function () {
    getCourseDetail(getParameterByName("courseid"));
})();