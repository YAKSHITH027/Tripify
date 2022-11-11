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

// json check

// let data = async () => {
//   let res = await fetch("../data/JSON/rajastan.json");
//   let data = await res.json();
//   console.log(data);
// };

//  spotlight top-----------
let valueLength;
let spotlightData = async () => {
  let res = await fetch("../data/JSON/spotlight1.json");
  let data = await res.json();
  
  valueLength=data.length
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
fetchData("../data/JSON/indo.json","indo-places-cards",false)

// auto slide section---------
document.addEventListener("DOMContentLoaded", () => {
  const slideContainer = document.querySelector(".slider-auto");
  const slidesHolder = document.querySelector(".slides");

  let slides = document.querySelectorAll(".slide");
  // console.log(slide)
  let slideIndex = 1;

  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);

  firstClone.id = "first-clone";
  lastClone.id = "last-clone";

  slidesHolder.append(firstClone);
  slidesHolder.prepend(lastClone);

  // console.log(slideWidth);
  slidesHolder.style.transform = `translateX(${-100}%)`;
let intervalboy
  const startSlide = () => {
    intervalboy = setInterval(() => {
      let slideWidth = slidesHolder.getBoundingClientRect().width;
      slideIndex++;
      slidesHolder.style.transform = `translateX(${
        -slideWidth * slideIndex
      }px)`;
      slidesHolder.style.transition = "0.4s";
    }, 2000);
    // document.addEventListener("visibilitychange", () => {
    //   clearInterval(intervalboy);
    // });
    // user leaves the tab
    
  }
    slidesHolder.addEventListener("transitionend", () => {
      slides = document.querySelectorAll(".slide");

      // console.log(slides)
      // console.log(slides[slideIndex].id,firstClone.id);
      if (slides[slideIndex].id == firstClone.id) {
        slidesHolder.style.transition = "none";
        slideIndex = 1;
        let slideWidth = slidesHolder.getBoundingClientRect().width;
        slidesHolder.style.transform = `translateX(${
          -slideWidth * slideIndex
        }px)`;
      }
    });
  ;
  startSlide();

  window.addEventListener("blur", (e) => {
    // your custom code here
    clearInterval(intervalboy);
  });
  // user enters the tab (again)
  window.addEventListener("focus", (e) => {
    // your custom code here
    startSlide()
  });
});


// 4div slider
const nextbtns= ()=>{
  initialValue+=1;
  slider4()
  spotlightWidth = spotLight.getBoundingClientRect().width;
  spotLight.style.transform= `translateX(${-spotlightWidth*initialValue}px)`;
}
const prevbtns = ()=>{
  initialValue-=1;
  
  slider4()
  spotlightWidth = spotLight.getBoundingClientRect().width;
  spotLight.style.transform= `translateX(${-spotlightWidth*initialValue}px)`;

}
const spotLight = document.querySelector('.spotlight-cards');
 let spotlightWidth = spotLight.getBoundingClientRect().width;
 
let initialValue=0;
function slider4(){
  
  if(initialValue==0){
    document.querySelector('.prev-btn').style.visibility ='hidden'
  }
  if(initialValue>0){
    console.log(initialValue)

    document.querySelector('.prev-btn').style.visibility ='visible'
  }
  if(initialValue>=2){
    document.querySelector('.next-btn').style.visibility ='hidden'
    // initialValue=valueLength
  }else{
    document.querySelector('.next-btn').style.visibility ='visible'
  }
 
}
slider4()