if(document.readyState !== "loading") {
    initializeCode();
} else {
    document.addEventListener("DOMContentLoaded", function () {
        initializeCode();
    });
}

function initializeCode() {

    //Creating links to different locations on the top of the "Posts" page
    const a = document.createElement("a");
    const link = document.createTextNode("Home");
    a.appendChild(link);
    a.title = "Home";
    a.href = "/";
    document.getElementById("top").appendChild(a);

    const br = document.createElement("br");
    document.getElementById("top").appendChild(br);

    const a2 = document.createElement("a");
    const link2 = document.createTextNode("Login");
    a2.appendChild(link2);
    a2.title = "Login";
    a2.href = "/users/login";
    document.getElementById("top").appendChild(a2);

    const br2 = document.createElement("br");
    document.getElementById("top").appendChild(br2);

    const a3 = document.createElement("a");
    const link3 = document.createTextNode("Register");
    a3.appendChild(link3);
    a3.title = "Register";
    a3.href = "/users/register";
    document.getElementById("top").appendChild(a3);

    //Setting eventListener to the "Add new post" button on the "Posts" page
    const addPostBtn = document.getElementById("submit");
    addPostBtn.addEventListener("click", listOfContents);

    //Fetching all the posts from "/content_data" in the index.js file
    fetch("/content_data")
    .then(response => response.json())
    .then(data => {
        if(!data) {
            return res.send("No posts found!");
        }
        data.forEach(comment => {
            //Sending each post information to "addToCommentWall" function where the 
            //page is builded (posts are set on the correct page)
            addToCommentWall(comment.username, comment.comment, comment._id);
        });
    });
}


function addToCommentWall(username, comment, id) {
    //This is the main div on the page
    const container = document.getElementById("post-container");

    //This is the div for each post
    const postDiv = document.createElement("div");

    //Creating a div for the post and appending it to the main div
    const addCommentBtn = document.createElement("button");
    const showCommentsBtn = document.createElement("button");
    addCommentBtn.setAttribute("id", "add-comment-btn-" + id);
    showCommentsBtn.setAttribute("id", id);
    const postCreator = document.createElement("p");
    const postText = document.createElement("p");
    const commentArea = document.createElement("textarea");
    commentArea.setAttribute("id", "comment-area-" + id);
    
    postCreator.appendChild(document.createTextNode("Creator: " + username));
    postText.appendChild(document.createTextNode(comment));
    postDiv.appendChild(postCreator);
    postDiv.appendChild(postText);
    postDiv.appendChild(commentArea);
    addCommentBtn.innerText = "Add comment";
    showCommentsBtn.innerText = "Show comments";
    postDiv.appendChild(addCommentBtn);
    postDiv.appendChild(showCommentsBtn)
    container.appendChild(postDiv);

    //Setting eventListeners to "Add comment" and "Show comments" buttons below every post on the
    //"Posts" page
    document.getElementById("add-comment-btn-" + id).addEventListener("click", addSubComment(id));
    document.getElementById(id).addEventListener("click", moveTo(id), true);
}

//Function for adding comments to the posts
function addSubComment(id) {

    document.getElementById("add-comment-btn-" + id).addEventListener("click", function() {

        //Checking if the user is logged in and allowed to comment, alerting if not
        const authToken = localStorage.getItem("auth_token");
        if(!authToken) {
        console.log("No auth Token found");
        alert("Not allowed! Please login first.");
        return;
        }


        //Getting the text from the textarea and sending it with fetch to 
        //create a comment to the post
        let newComment = document.getElementById("comment-area-" + id).value;
        
        //In the fetch we also send out the motherID which is the id of the post
        //that the comment is for
        fetch("/users/content_data/addsubcomment", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "authorization": "Bearer " + authToken
            },
            body: JSON.stringify({
                "motherID": id,
                "subcomment": newComment
            })
        })
        .then((response) => response.text())
        .then((page) => {
            console.log(page);
        })
        .catch((e) => { //If user runs into an error, we log it in the console
            console.log("error" + e);
        })
    });
    
}

//Function for getting the right post's comments page
function moveTo(id) {

    document.getElementById(id).addEventListener("click", function() {
        window.location.href = "/subcontent/" + id;
    });
}

//Function for adding new post
function listOfContents(event) {
    event.preventDefault();

    //Again checking if user is logged in
    const authToken = localStorage.getItem("auth_token");
    if(!authToken) {
        console.log("No auth Token found");
        alert("Not allowed! Please login first.");
        return;
    }

    if(authToken) { //If authToken is found, redirecting to the post adding page
        window.location.href = "/users/comment/add";
    }
}