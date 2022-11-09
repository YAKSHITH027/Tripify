// search apear --------

let header = document.querySelector(".header");
let searchNav = document.querySelector(".search-option");
let searchHide = document.querySelector(".search-hide");
searchNav.style.display = "none";
window.addEventListener("scroll", () => {
  let scrollHeight = window.pageYOffset;
  let navHeight = header.getBoundingClientRect().height;
  let navWidth = header.getBoundingClientRect().width;
  if (scrollHeight > 150) {
    header.style.backgroundColor = "#2f9bdb";
    searchNav.style.display = "";
  } else {
    header.style.backgroundColor = "transparent";
    searchNav.style.display = "none";
}
if (scrollHeight > 150 && navWidth < 950) {
    searchHide.style.display = "";
    searchNav.style.display = "none";
    
  } else {
    searchHide.style.display = "none";
    
  }
});
