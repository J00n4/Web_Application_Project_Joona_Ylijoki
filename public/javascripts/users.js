if(document.readyState !== "loading") {
    initializeCode();
} else {
    document.addEventListener("DOMContentLoaded", function () {
        initializeCode();
    });
}

function initializeCode() {
    document.getElementById("logout").addEventListener("click", logout);
}


function logout() {
    localStorage.removeItem("auth_token");
    window.location.href = "/";
}