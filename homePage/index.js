// search apear --------

let header = document.querySelector(".header");
let searchNav = document.querySelector(".search-option");
let searchHide = document.querySelector(".search-hide");
searchNav.style.display = "none";
searchHide.style.display= "none"
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

// form-----------

const loginForm = document.querySelector("#login");
const createAccountForm = document.querySelector("#createAccount");

document.querySelector("#linkCreateAccount").addEventListener("click", (e) => {
  // console.log('hello')
  e.preventDefault();
  loginForm.classList.add("form-hidden");
  createAccountForm.classList.remove("form-hidden");
});
document.querySelector("#linkLogin").addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.classList.remove("form-hidden");
  createAccountForm.classList.add("form-hidden");
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  setAlert(loginForm, "form-message-error", "invalid username");
});

document.querySelectorAll(".form-input").forEach((ele) => {
  // console.log("hello");
  ele.addEventListener("blur", (e) => {
    // console.log("i am here", e.target.id);

    if (
      e.target.id == "userNameCreate" &&
      e.target.value.length > 0 &&
      e.target.value.length < 10
    ) {
      showInputError(ele, "name character should be altlest 5");
    }
  });
  ele.addEventListener("input", () => {
    clearInputError(ele);
  });
});

function setAlert(msgEle, type, message) {
  let msgElement = msgEle.querySelector(".form-top-msg");
  msgElement.textContent = message;
  msgElement.classList.remove("form-message-success", "form-message-error");
  msgElement.classList.add(type);
}

function showInputError(inputEle, msg) {
  inputEle.classList.add("form-input-error");
  inputEle.parentElement.querySelector(".input-message").textContent = msg;
}
function clearInputError(inputEle) {
  console.log(inputEle);
  inputEle.classList.remove("form-input-error");
  inputEle.parentElement.querySelector(".input-message").textContent = "";
}
