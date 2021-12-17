if(document.readyState !== "loading") {
    initializeCode();
} else {
    document.addEventListener("DOMContentLoaded", function () {
        initializeCode();
    });
}

function initializeCode() {
    //Setting eventListener to the register form in the register page
    document.getElementById("register-form").addEventListener("submit", onSubmit);
}

function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    //Fetching the post register to check if user already exists or if not
    //creating one
    fetch("/users/register", {
        method: "POST",
        body: formData
    })
    .then((response) => response.json())
    .then((data) => {
        //If username is taken we notify the user
        if(data.username === "Username already in use. Please login.") {
            document.getElementById("error").innerHTML = data.username;
        } else {
            window.location.href = "/users/login";
        }
    })
}