if(document.readyState !== "loading") {
    initializeCode();
} else {
    document.addEventListener("DOMContentLoaded", function () {
        initializeCode();
    });
}

function initializeCode() {
    //Setting eventListener to the form in the login page
    document.getElementById("login-form").addEventListener("submit", onSubmit);
}

function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    //Fetching the post login to check for user login information
    fetch("/users/login", {
        method: "POST",
        body: formData
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.token) {
            // Storing token to localstorage and redirecting to index page
            storeToken(data.token);
            window.location.href = "/";
        } else { //If something is wrong, we notify the user (for example if
            //the password is wrong, there is a "login failed" text shown in the
            //error box in the login page)
            if(data.message) {
                document.getElementById("error").innerHTML = data.message;
            } else {
                document.getElementById("error").innerHTML = "Error occurred";
            }
        }
    })
}

function storeToken(token) {
    localStorage.setItem("auth_token", token);
}