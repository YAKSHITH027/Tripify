// search apear --------

let header = document.querySelector(".header");
let searchNav = document.querySelector(".search-option");
let searchHide = document.querySelector(".search-hide");
searchNav.style.display = "none";
searchHide.style.display = "none";
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
  let getuser = JSON.parse(localStorage.getItem("allUser")) || [
    { userName: "yakshith027@gmail.com", userPassword: 1 },
  ];
  const userEmail = loginForm.userNameLogin.value;
  const userPassword = loginForm.userPasswordLogin.value;
  console.log(userEmail, userPassword, getuser);
  const presentCheck = getuser.find((item) => {
    if (
      item.userPassword == userPassword &&
      (item.userEmail == userEmail || item.userName == userEmail)
    ) {
      return item;
    }
  });
  console.log(presentCheck);
  if (presentCheck) {
    console.log(presentCheck);
    localStorage.setItem("presentUser", JSON.stringify([presentCheck]));

    window.location.href = "../signinhome/home.html";
  } else {
    console.log("error");
    setAlert(loginForm, "form-message-error", "invalid username/password");
  }
});

createAccountForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let allUser = JSON.parse(localStorage.getItem("allUser")) || [];
  const userName = createAccountForm.userNameCreate.value;
  const userEmail = createAccountForm.createEmail.value;
  const userPassword = createAccountForm.password.value;
  const userNumber = createAccountForm.password.value;
  let collect = {
    userName,
    userEmail,
    userPassword,
    userNumber,
  };
  allUser.push(collect);
  localStorage.setItem("presentUser", JSON.stringify([collect]));
  localStorage.setItem("allUser", JSON.stringify(allUser));
});

document.querySelectorAll(".form-input").forEach((ele) => {
  // console.log("hello");
  ele.addEventListener("blur", (e) => {
    // console.log("i am here", e.target.id);

    if (
      e.target.id == "userNameCreate" &&
      e.target.value.length > 0 &&
      e.target.value.length < 5
    ) {
      showInputError(ele, "Name cannot be less than 5 character");
    }
    if (
      e.target.id == "createEmail" &&
      e.target.value.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      // showInputError(ele, "invalid email id");
    }

    if (
      e.target.id == "password" &&
      e.target.value.length < 8 &&
      e.target.value.length > 0
    ) {
      showInputError(ele, "weak password");
    }
    if (e.target.id == "number" && e.target.value.length != 10) {
      showInputError(ele, "invalid moblile number");
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
  // console.log(inputEle);
  inputEle.classList.remove("form-input-error");
  inputEle.parentElement.querySelector(".input-message").textContent = "";
}

// sidebar

const showsidebar = () => {
  document.querySelector(".sidebar").classList.toggle("show-sidebar");
};

const closeSidebar = () => {
  document.querySelector(".sidebar").classList.remove("show-sidebar");
};

// signup

const showSignin = () => {
  document.querySelector(".form-modal").classList.toggle("show-modal");
  closeSidebar();
};

// sign up modal remover

const signupContainer = document.querySelector(".form-container");
document.querySelector(".form-modal").addEventListener("click", (e) => {
  //  console.log(e.target);
  if (e.target.closest(".form-container")) {
    return;
  }

  document.querySelector(".form-modal").classList.remove("show-modal");
});


//  spotlight top-----------
let valueLength;
let spotlightData = async () => {
  let res = await fetch("../data/JSON/spotlight1.json");
  let data = await res.json();

  valueLength = data.length;
  spoltlightDisplay(data);
};
spotlightData();
const spoltlightDisplay = (data) => {
  let spotlightCont = document.querySelector(".spotlight-cards");
  data.forEach((item, index) => {
    let div = document.createElement("div");
    let img = document.createElement("img");
    img.src = item.img;
    let title = document.createElement("h4");
    title.innerText = item.title;
    let desc = document.createElement("p");
    desc.innerText = item.desc;

    div.append(img, title, desc);
    spotlightCont.append(div);
  });
};

//  all in 1 make it

const mapData = (data, appendName, isName) => {
  let container = document.querySelector(`.${appendName}`);
  data.forEach((item, index) => {
    let div = document.createElement("div");
    let div2 = document.createElement("div");
    let img = document.createElement("img");
    img.src = item.img;
    let desc = document.createElement("p");
    desc.innerText = item.desc;
    div2.append(img);
    if (isName == "creator") {
      div.append(div2);
    } else if (isName) {
      let title = document.createElement("h5");
      title.innerHTML = `by <span>${item.name}</span>`;
      div.append(div2, desc, title);
    } else {
      div.append(div2, desc);
    }
    container.append(div);
  });
};

let fetchData = async (url, appendName, isName) => {
  let res = await fetch(url);
  let data = await res.json();

  mapData(data, appendName, isName);
};

fetchData("../data/JSON/bestplaces.json", "best-places-cards", true);
fetchData("../data/JSON/rajastan.json", "rajastan-places-cards", false);
fetchData("../data/JSON/creators.json", "creator-cards", "creator");
fetchData("../data/JSON/indo.json", "indo-places-cards", false);


const slidesHolder = document.querySelector(".slides");

const slides = document.querySelectorAll(".slide");
setInterval(() => {
  slidesHolder.style.transform = "translate(-100%)";
  slidesHolder.style.transition = "all 0.5s";
  // console.log('hey there')
}, 2000);
slidesHolder.addEventListener("transitionend", () => {
  slidesHolder.appendChild(slidesHolder.firstElementChild);
  // console.log("hello");
  slidesHolder.style.transition = "none";
  slidesHolder.style.transform = "translate(0)";
  setTimeout(function () {
    slidesHolder.style.transition = "all 0.5s";
  });
});

// 4div slider
const nextbtns = () => {
  initialValue += 1;
  slider4();
  spotlightWidth = spotLight.getBoundingClientRect().width;
  spotLight.style.transform = `translateX(${-spotlightWidth * initialValue}px)`;
};
const prevbtns = () => {
  initialValue -= 1;

  slider4();
  spotlightWidth = spotLight.getBoundingClientRect().width;
  spotLight.style.transform = `translateX(${-spotlightWidth * initialValue}px)`;
};
const spotLight = document.querySelector(".spotlight-cards");
let spotlightWidth = spotLight.getBoundingClientRect().width;

let initialValue = 0;
function slider4() {
  if (initialValue == 0) {
    document.querySelector(".prev-btn").style.visibility = "hidden";
  }
  if (initialValue > 0) {
    console.log(initialValue);

    document.querySelector(".prev-btn").style.visibility = "visible";
  }
  if (initialValue >= 2) {
    document.querySelector(".next-btn").style.visibility = "hidden";
    // initialValue=valueLength
  } else {
    document.querySelector(".next-btn").style.visibility = "visible";
  }
}
slider4();
const getUserFirst = JSON.parse(localStorage.getItem("presentUser"))
const userFirst = document.querySelector('.userF');
const userFirstg = document.querySelector('.userG');
let firstLetter = getUserFirst[0].userName[0];
// console.log(firstLetter)

userFirst.innerText=firstLetter
userFirstg.innerText=firstLetter
const showUser = document.querySelector('.showUser');
showUser.innerText=getUserFirst[0].userName;

function logout(){
  console.log('hello')
  
 window.location.href = "../homePage/index.html";
}