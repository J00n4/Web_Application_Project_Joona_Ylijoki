if(document.readyState !== "loading") {
    initializeCode();
} else {
    document.addEventListener("DOMContentLoaded", function () {
        initializeCode();
    });
}

function initializeCode() {
    //Setting eventListener to a button in the "Add post" page
    document.getElementById("add-comment").addEventListener("submit", addComment);
}


function addComment(event) {
    event.preventDefault();
    const authToken = localStorage.getItem("auth_token");
    var formData = new FormData(event.target);

    //Sending the information from "Add post" pages input fields to the post route where
    //the post is created (saved to the database). Information is sent in formData format.
    fetch("/users/comment/add", {
        method: "POST",
        headers: {
            "authorization": "Bearer " + authToken
        },
        body: formData
    })
    .then((response) => response.text())
    .then((page) => {
        console.log(page);
        //Redirecting the user to "Posts" page at url /content
        window.location.href = "/content";
    })
    .catch((e) => { //If the user runs to an error, we log it into the console
        console.log("error" + e);
    })


}