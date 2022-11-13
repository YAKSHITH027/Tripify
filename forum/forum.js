// search apear --------
let getUserFirst = JSON.parse(localStorage.getItem("presentUser"));
let userFirst = document.querySelector(".userF");
let firstLetter = getUserFirst[0].userName[0];
// console.log(firstLetter);
userFirst.innerText = firstLetter;

// fourm q and a

let copyq = []
let fetchData = async () => {
  try {
    let res = await fetch("../data/forumdata/qanda.json");
    let data = await res.json();
    // console.log(data);
    copyq = JSON.parse(localStorage.getItem("qanda"))|| data;
    checkquestion(copyq)
    displayData(copyq);
  } catch (error) {
    console.log(error);
  }
};

fetchData();

function displayData(data) {
  let appendData = document.querySelector(".all-questionandanswer");
  appendData.innerHTML = "";
  data.forEach((item, index) => {
    let div = document.createElement("div");
    let personName = document.createElement("h4");
    personName.innerText = item.qperson;
    let question = document.createElement("h1");
    question.innerText = item.question;
    let btnContainer = document.createElement("div");
    let ansBtn = document.createElement("button");
    ansBtn.innerText = "answer";
    // ansBtn.id = index
    ansBtn.classList.add("ansbtn");
    ansBtn.setAttribute("onClick", `seeit(${index})`);
    let wishBtn = document.createElement("button");
    wishBtn.innerHTML = "wishlist";
    let postAnswer = document.createElement("textarea");
    postAnswer.placeholder = "post your answer";
    postAnswer.id = `post${index}`;
    let hidebtnContainer = document.createElement("div");
    hidebtnContainer.classList.add("hidePost");
    hidebtnContainer.id = `show${index}`;
    let holdHideBtn = document.createElement("div");
    let cancelBtn = document.createElement("button");
    cancelBtn.innerText = "cancel";
    cancelBtn.addEventListener("click", () => {
      //   document.querySelector(".hidePost").classList.remove("showPost");
      document.querySelector(`#show${index}`).classList.remove("showPost");
    });
    let postBtn = document.createElement("button");
    postBtn.innerText = "post";
    postBtn.id = index;
    postBtn.addEventListener("click", (e) => {
      const value = document.querySelector(`#post${index}`);
      let user = JSON.parse(localStorage.getItem("presentUser"));
      user = user[0].userName;
      const last = JSON.parse(localStorage.getItem("allUser"));
      const newLast = copyq.filter((item, index) => {
        if (index == postBtn.id) {
            if(item.answer){
                item.answer.unshift({"name":user,"personAnswer":value.value})
            }else{
                item.answer.push({"name":user,"personAnswer":value.value})
            }
        }
        localStorage.setItem('qanda',JSON.stringify(copyq))
        checkquestion(copyq)
        displayData(copyq)
      });
    });
    holdHideBtn.append(cancelBtn, postBtn);
    let anserSection = document.createElement("div");
    anserSection.classList.add("appendAnswer");

    hidebtnContainer.append(postAnswer, holdHideBtn);
    btnContainer.append(ansBtn, wishBtn);
    // console.log(it)
    if (!item.answer) {
      div.append(personName, question, btnContainer, hidebtnContainer);
    } else {
      anserSection.innerHTML = answer(item.answer);
      div.append(
        personName,
        question,
        btnContainer,
        hidebtnContainer,
        anserSection
      );
    }
    appendData.append(div);
  });
}

function answer(ans) {
  //   let answerSec = document.querySelector(".appendAnswer");
  //     let div = document.createElement("div");
  //     let personName = document.createElement("h4");
  //     personName = item.Name;
  //     let answer = document.createElement("p");
  //     answer.innerText = item.personanswer;
  //     let btnContainer = document.createElement("div");
  //     let upvoteBtn = document.createElement("button");
  //     let commentBtn = document.createElement("button");
  //     btnContainer.append(upvoteBtn, commentBtn);
  //     div.append(personName, answer, btnContainer);
  //     answerSec.append(div);
  let div = ans
    .map((item, index) => {
      return `<div>
              <h4>${item.name}</h4>
              <p>${item.personAnswer}</p>
              <div>
                  <button>upvote</button>
                  <button>comment</button>
                </div>
              </div>`;
    })
    .join(" ");
  return div;
}

// unanswered
let copysamplequestion =[]
const getData = async () => {
  try {
    let res = await fetch("../data/forumdata/questions.json");
    let data = await res.json();
    // console.log(data)
    // mapData(data);
  } catch (error) {
    console.log(error);
  }
};
getData();
function mapData(data) {
  const place = document.querySelector(".unanswered");
     place.innerHTML='';
  data.forEach((item) => {
    let div = document.createElement("div");
    let h2 = document.createElement("h2");
    h2.innerText = item.qperson;
    let p = document.createElement("p");
    p.innerHTML = item.question;
    div.append(h2, p);
    place.append(div);
  });
}

// dynamic unanswered question

function checkquestion(data){
    let newQuestion = data.filter((item)=>{
         if(item.answer.length==0){
            return item;
         }
    })
    console.log
    mapData(newQuestion)
}
// checkquestion(copyq)


// post questions

const postq = () => {
  let question = document.querySelector("#user-q");
  let user = JSON.parse(localStorage.getItem("presentUser"));
  user = user[0].userName;
  console.log(user);
  let obj = { qperson: user, question: question.value, time: "12-09-2022",answer:[] };
  copyq.unshift(obj);
  localStorage.setItem('qanda',JSON.stringify(copyq))
  displayData(copyq);
  checkquestion(copyq)
  question.value = "";
};

function seeit(a) {
  console.log(`show${a}`);
  document.querySelector(`#show${a}`).classList.add("showPost");
}


// search 

 function search(){
    const value = document.querySelector(".searchf").value;
    // console.log(value)
    let searchData = copyq.filter((item)=>{
        if(item.question.toLowerCase().includes(value.toLowerCase())){
            return item;
        }
    })
    displayData(searchData)
    console.log(searchData);
 }

