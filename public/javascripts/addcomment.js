if(document.readyState !== "loading") {
    initializeCode();
} else {
    document.addEventListener("DOMContentLoaded", function () {
        initializeCode();
    });
}

function initializeCode() {
    console.log(document.getElementById("add-comment"));
    document.getElementById("add-comment").addEventListener("submit", addComment);
}


function addComment(event) {
    event.preventDefault();
    console.log("Add Comment button click function is here");
    const authToken = localStorage.getItem("auth_token");
    console.log("This is from addComment clicking function: " + authToken);
    var formData = new FormData(event.target);


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
        window.location.href = "/content";
    })
    .catch((e) => {
        console.log("error" + e);
    })


}