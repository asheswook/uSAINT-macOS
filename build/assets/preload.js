console.log("preload.js loaded");
var styleTest = document.createElement("style");
styleTest.innerHTML = `header {
    background: #1A202C;
}
.top_box .top_user {
    color: rgba(255, 255, 255, 0.92);
}
.top_box .top_link_box li a {
    color: rgba(255, 255, 255, 0.92);
}`;
document.head.appendChild(styleTest);
