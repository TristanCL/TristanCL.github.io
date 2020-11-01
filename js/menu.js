let nav = document.getElementsByTagName("nav");
let burger = document.getElementById("burger");
let navCross = document.getElementById("navCross");

burger.addEventListener("click", showMenu);
navCross.addEventListener("click", hideMenu);

console.log(burger);

function showMenu() {
    nav[0].style.transform = "translateX(0)";
}

function hideMenu() {
    nav[0].style.transform = "translateX(-100vw)";
}
