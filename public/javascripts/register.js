if(document.readyState !== "loading") {
    initializeCode();
} else {
    document.addEventListener("DOMContentLoaded", function () {
        initializeCode();
    });
}

function initializeCode() {
    document.getElementById("register-form").addEventListener("submit", onSubmit);
}

function onSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    fetch("/users/register", {
        method: "POST",
        body: formData
    })
    .then((response) => response.json())
    .then((data) => {
        if(data) {
            window.location.href = "/users/login"
        } 
    })
}