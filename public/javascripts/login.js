if(document.readyState !== "loading") {
    initializeCode();
} else {
    document.addEventListener("DOMContentLoaded", function () {
        initializeCode();
    });
}

function initializeCode() {
    document.getElementById("login-form").addEventListener("submit", onSubmit);
}

function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    console.log("This is from login.js");

    fetch("/users/login", {
        method: "POST",
        body: formData
    })
    /*.then(async response => {
        try {
            const data = await response.json()
            console.log("response data " + data);
        }
        catch(error) {
            console.log('Error happened here!');
            console.log(error)
        }
    })*/
    .then((response) => response.json())
    .then((data) => {
        console.log("This is after data: " + data + data.token);
        if(data.token) {
            // Storing token to localstorage
            console.log("This is the stored token from login.js: " + data.token);
            storeToken(data.token);
            console.log(data);
            window.location.href = "/";
        } /*else {
            if(data.message) {
                document.getElementById("error").innerHTML = data.message;
            } else {
                document.getElementById("error").innerHTML = "Error occurred";
            }
        }*/
    })
}

function storeToken(token) {
    console.log("This is the stored token from login.js2: " + token);
    localStorage.setItem("auth_token", token);
}