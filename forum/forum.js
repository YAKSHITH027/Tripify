// search apear --------
const getUserFirst = JSON.parse(localStorage.getItem("presentUser"));
const userFirst = document.querySelector(".userF");
let firstLetter = getUserFirst[0].userName[0];
console.log(firstLetter);
userFirst.innerText = firstLetter;

