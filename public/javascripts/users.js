if(document.readyState !== "loading") {
    initializeCode();
} else {
    document.addEventListener("DOMContentLoaded", function () {
        initializeCode();
    });
}

function initializeCode() {
    //Setting eventListener to the logout link
    document.getElementById("logout").addEventListener("click", logout);
}


function logout() {
    //If link is pressed, the token is removed from the localstorage and
    // user is redirected to the index page
    localStorage.removeItem("auth_token");
    window.location.href = "/";
}