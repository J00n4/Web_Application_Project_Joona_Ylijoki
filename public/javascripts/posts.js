if(document.readyState !== "loading") {
    initializeCode();
} else {
    document.addEventListener("DOMContentLoaded", function () {
        initializeCode();
    });
}

function initializeCode() {
    //document.getElementById("posts-form").addEventListener("submit", onSubmit);

    const addPostButton = document.getElementById("add-post");

    addPostButton.addEventListener("click", function() {
        const postsList = document.getElementById("posts-list");

        let newPost = document.createElement("li");
        newPost.innerHTML = newPost.innerHTML;
    })

    /*var postslist = [];
    var postswall = document.getElementById("post_area");
    for (i=0 ; i<Comment.count({}) ; i++) {
        var post = Comment.findOne({ id: i });
        postslist.append(post);
    }
    postswall.innerHTML = postslist;


    // from posts.html
    <textarea id="post_area"></textarea>
                
    <input type="submit" value="Login">


    */
}