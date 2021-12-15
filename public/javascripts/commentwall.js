if(document.readyState !== "loading") {
    initializeCode();
} else {
    document.addEventListener("DOMContentLoaded", function () {
        initializeCode();
    });
}

function initializeCode() {
    //console.log(document.getElementById("comment-form"));
    //document.getElementById("comment-form").addEventListener("click", listOfContents);

    const addPostBtn = document.getElementById("submit");
    const showCommentsBtn = document.getElementById("show_comments");
    const postCreator = document.getElementById("commentor-header");
    const postText = document.getElementById("post-text");

    fetch("/content")
    .then(response => response.json())
    .then(data => {
        console.log("TÄMÄ TULEE COMMENTWALL FETCHISTÄ");
        console.log(data);
        data.forEach(comment => {
            postCreator.innerHTML = comment.username;
            postText.innerHTML = comment.comment;
        })
    })
}

function listOfContents(event) {
    event.preventDefault();

    const authToken = localStorage.getItem("auth_token");
    if(!authToken) {
        console.log("No auth Token found");
        alert("Not allowed! Please login first.");
        return;
    }

    console.log(authToken);


    if(authToken) {
        var base64Url = authToken.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        var info = JSON.parse(jsonPayload);
        console.log(info);
        console.log(info.username);

        window.location.href = "/users/comment/add";
        //document.getElementById("logout").addEventListener("click", logout);

        
    }

    
}